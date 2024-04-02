<?php

namespace App\Scrapers;

use App\Models\CatalogPrice;
use Exception;
use Facebook\WebDriver\WebDriverKeys;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Panther\Client;

class CatalogPriceScraper {

    public static function execute() {
        $client = Client::createChromeClient(null, [
            '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            '--window-size=1200,1100',
            '--headless',
            '--disable-gpu',
]);
        $link = 'https://brickset.com';
        $client->request('GET', $link . '/sets');

        $readSets = [];

        $crawler = $client->getCrawler();
        $dropdown = $crawler->filter('#body > div.outerwrap > div > div > section > aside > div > div > form:nth-child(2) > span')->click();

        $client->waitFor('.selectboxit-options');

        $optionArray = [];
        $options = $crawler->filter('.selectboxit-options[aria-hidden="false"] > .selectboxit-option')->each(function(Crawler $x) use (&$optionArray) {
            $optionArray[] = $x->attr('data-val');
        });

        foreach($optionArray as $option) {
            $client->request('GET', $link . $option);
            $crawler = $client->getCrawler();
            $client->waitFor('.pagelength')->filter('#body > div.outerwrap > div > div > aside:nth-child(2) > div.resultsfilter > ul.pagelength > li:nth-child(4)')->click();

            do {
                $client->waitFor('article')->filter('article')->each(function (Crawler $x) use (&$client, &$readSets) {
                    $header = $x->filter('.meta > h1 > a > span')->text();

                    if ($x->filter('a[href^="prices"]')->text('default', true) !== 'default') {
                        $x->filter('a[href^="prices"]')->click();

                        $client->waitFor('#ajaxContainer > table');
                        $hasPolishPrice = $client->getCrawler()->filter('img[src*="/flags/PL"]')->text('default', true);
                        if ($hasPolishPrice !== 'default') {
                            $crawler = $client->waitFor('img[src*="/flags/PL"]');
                            $row = $crawler->filter('img[src*="/flags/PL"]')->ancestors()->eq(1)->children()->eq(2);

                            $catPrice = new CatalogPrice;
                            $catPrice->importData([
                                'set_num' => rtrim($header, ':'),
                                'price' => $row->text()
                            ]);
                            $catPrice->save();
                            dump($catPrice->set_num . ' - ' . $catPrice->price);
                        }
                        $client->getKeyboard()->pressKey(WebDriverKeys::ESCAPE);
                        $client->waitForInvisibility('#ajaxContainer');
                    }
                });

                try {
                    sleep(rand(5,15));
                    $crawler = $client->reload();
                    if ($crawler->filter('li[class="next"] > a')->eq(1)->text('default', true) !== 'default') {
                        $crawler->filter('li[class="next"] > a')->eq(1)->click();
                    }
                } catch (Exception $e) {
                    dd($client->getCrawler()->html());
                }

            } while ($client->waitFor('article')->filter('li[class="next"] > a')->eq(1)->text('default', true) !== 'default');
        }
    }
}
