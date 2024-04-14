<?php

namespace App\Spiders;

use App\Models\LEGOSet;
use App\Spiders\Middleware\TryResponseMiddleware;
use Exception;
use Generator;
use RoachPHP\Downloader\Middleware\ExecuteJavascriptMiddleware;
use RoachPHP\Downloader\Middleware\RequestDeduplicationMiddleware;
use RoachPHP\Downloader\Middleware\UserAgentMiddleware;
use RoachPHP\Extensions\LoggerExtension;
use RoachPHP\Extensions\StatsCollectorExtension;
use RoachPHP\Http\Request;
use RoachPHP\Http\Response;
use RoachPHP\Spider\BasicSpider;
use RoachPHP\Spider\ParseResult;
use Symfony\Component\DomCrawler\Crawler;

class AllegroSpider extends BasicSpider {

    public array $downloaderMiddleware = [
        RequestDeduplicationMiddleware::class,
        [
            UserAgentMiddleware::class,['userAgent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'],
        ],
        ExecuteJavascriptMiddleware::class,
    ];

    public array $spiderMiddleware = [
        TryResponseMiddleware::class,
    ];

    public array $itemProcessors = [
        //
    ];

    public array $extensions = [
        LoggerExtension::class,
        StatsCollectorExtension::class,
    ];

    public int $concurrency = 1;

    public int $requestDelay = 3;

    /** @return Request[] */
    protected function initialRequests(): array {
        return [
            new Request (
                'GET',
                'https://allegro.pl/kategoria/klocki-lego-17865?string=lego&stan=nowe&offerTypeBuyNow=1',
                [$this, 'parse']
            ),
        ];
    }

    /**
     * @return Generator<ParseResult>
     */
    public function parseOffer(Response $response): Generator {
        $title = ' ' . $response->filter('#productTitle')->text('default', true) . ' ';

        $matches = [];
        preg_match('/[(][0-9]{4,6}[)]/', $title, $matches);

        $matches_sub = [];
        preg_match('/\D[0-9]{4,6}\D/', $title, $matches_sub);

        if (isset($matches[0])) {
            $set_num = preg_replace('/\D/', '', $matches[0]);
        } else if (isset($matches_sub[0])) {
            $set_num = preg_replace('/\D/', '', $matches_sub[0]);
        }

        $price = preg_replace('/\n/', ',', $response->filter('.a-offscreen')->first()->text('default', true));
        $seller = $response->filter('#merchantInfoFeature_feature_div > div:nth-child(2)')->text('default', true);

        if (isset($set_num)) {
            $set_id = LEGOSet::where('set_num', 'LIKE', $set_num . "%")->first()?->id;
        }

        if(isset($set_id) && $price !== 'default' && $seller != "default" && $set_id != null) {
            yield $this->item([
                'set_id' => $set_id,
                'price' => $price,
                'seller' => $seller,
                'url' => $response->getUri()
            ]);
        }
    }

    public function parse(Response $response): Generator {
        $pages = [];
        dd('xd');
        $response->filter('article')->each(function (Crawler $x) use (&$pages) {
            $pages[] = $x->filter('h2 > a[rel*="nofollow"]')->link();
        });
        foreach ($pages as $page) {
            yield $this->request('GET', $page->getUri(), 'parseOffer');
        }

        try {
            $link = $response->filter('a[class*="s-pagination-next"]')->link();
            dump($link->getUri());
            yield $this->request('GET', $link->getUri());
        } catch (Exception $e) {
        }
    }
}
