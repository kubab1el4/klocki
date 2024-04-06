<?php

namespace App\Spiders;

use App\Models\LEGOSet;
use Exception;
use Generator;
use RoachPHP\Downloader\Middleware\ProxyMiddleware;
use RoachPHP\Downloader\Middleware\RequestDeduplicationMiddleware;
use RoachPHP\Downloader\Middleware\UserAgentMiddleware;
use RoachPHP\Extensions\LoggerExtension;
use RoachPHP\Extensions\StatsCollectorExtension;
use RoachPHP\Http\Request;
use RoachPHP\Http\Response;
use RoachPHP\Spider\BasicSpider;
use RoachPHP\Spider\ParseResult;
use Symfony\Component\DomCrawler\Crawler;

class AmazonUSSpider extends BasicSpider {

    public array $downloaderMiddleware = [
        RequestDeduplicationMiddleware::class,
        [
            UserAgentMiddleware::class,['userAgent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'],
        ],
    ];

    public array $spiderMiddleware = [
        //
    ];

    public array $itemProcessors = [
        //
    ];

    public array $extensions = [
        LoggerExtension::class,
        StatsCollectorExtension::class,
    ];

    public int $concurrency = 1;

    public int $requestDelay = 5;

    /** @return Request[] */
    protected function initialRequests(): array {
        return [
            new Request (
                'GET',
                'https://www.amazon.com/s?k=lego&i=toys-and-games&rh=n%3A165793011%2Cp_89%3ALEGO%2Cp_n_feature_forty-one_browse-bin%3A119653281011&dc&ds=v1%3A75aXZ9YbiuojF0LHLxRrn8NjfFWFHOXvi5Jku4f%2Ff7k&crid=1YW7RTWAXPLU2&qid=1712433313&rnid=119653280011&sprefix=lego%2Caps%2C306&ref=sr_nr_p_n_feature_forty-one_browse-bin_1',
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
        $response->filter('div[cel_widget_id*="MAIN-SEARCH_RESULTS"]')->each(function (Crawler $x) use (&$pages) {
            $pages[] = $x->filter('h2 > a[class*="a-link-normal"]')->link();
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
