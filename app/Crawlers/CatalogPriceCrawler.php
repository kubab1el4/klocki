<?php

namespace App\Crawlers;

use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Panther\Client;

class CatalogPriceCrawler {

    public static function execute() {
        $client = Client::createChromeClient();
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

            do {
                $crawler->filter('article')->each(function (Crawler $x) use (&$client, &$readSets) {
                    $header = $x->filter('.meta > h1 > a > span')->text();
                    $readSets[rtrim($header, ':')] = 0;
                    $priceButton = $x->filter('div.meta > div:nth-child(5) > dl > dd:nth-child(6) > a');
                    if ($priceButton->text('default', true) !== 'default') {
                        $client->waitFor('div.meta > div:nth-child(5) > dl > dd:nth-child(6) > a');
                        $x->filter('div.meta > div:nth-child(5) > dl > dd:nth-child(6) > a')->click();

                        $crawler = $client->waitFor('#ajaxContainer > table > tbody > tr:nth-child(15) > td:nth-child(1) > img');
                        $row = $crawler->filter('#ajaxContainer > table > tbody > tr:nth-child(15) > td:nth-child(2)');

                        $readSets[rtrim($header, ':')] = $row->text();
dump($readSets);
                        $x->filter('#body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable > div.ui-dialog-titlebar.ui-widget-header.ui-corner-all.ui-helper-clearfix > a')->click();
                    }
                });
                if ($crawler->filter('#body > div.outerwrap > div > div > div:nth-child(4) > ul > li.next > a')->text('default', true) !== 'default') {
                    $crawler->filter('#body > div.outerwrap > div > div > div:nth-child(4) > ul > li.next > a')->click();
                }
            } while ($crawler->filter('#body > div.outerwrap > div > div > div:nth-child(4) > ul > li.next > a')->text('default', true) !== 'default');
        }
    }
}
