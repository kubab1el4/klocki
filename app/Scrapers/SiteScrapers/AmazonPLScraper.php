<?php

namespace App\Scrapers\SiteScrapers;

use App\Models\CatalogPrice;
use Exception;
use Facebook\WebDriver\Exception\WebDriverException;
use Facebook\WebDriver\WebDriverKeys;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Panther\Client;

class AmazonPLScraper extends Scraper {

    public static function execute() {
        $client = self::getClient();
        $link = 'https://www.amazon.pl/s?k=lego&i=toys&rh=n%3A26163101031%2Cp_n_condition-type%3A21329610031&dc&ds=v1%3AG0UVoZSiQucQjxINq%2BSFFt3okCts9tUfzFoDV0A2LH4&__mk_pl_PL=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=6YWY3Y16VDLR&qid=1712084052&rnid=21329608031&sprefix=lego%2Caps%2C139&ref=sr_nr_p_n_condition-type_1';
        $client->request('GET', $link);

        $readOffers = [];

        $client->waitFor('#navbar-main');

        $client->getCrawler()->filter('div[data-cel-widget*="search_result"]')->each(function(Crawler $x) use (&$client, &$readOffers) {
            dump($x->text());
        });
        dd('xd');
    }
}
