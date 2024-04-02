<?php

namespace App\Scrapers\SiteScrapers;

use App\Models\CatalogPrice;
use Exception;
use Facebook\WebDriver\WebDriverKeys;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Panther\Client;

abstract class Scraper {

    protected static function getClient() {
        return Client::createChromeClient(null, [
            '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            '--window-size=1200,1100',
            '--headless',
            '--disable-gpu',
        ]);
    }

    abstract public static function execute();
}
