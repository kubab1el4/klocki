<?php

namespace App\Crawlers;

use Symfony\Component\Panther\Client;

class CatalogPriceCrawler {

    public static function execute() {
        $client = Client::createChromeClient();
        $client->request('GET', 'https://brickset.com/sets');
        dd($client);
    }
}
