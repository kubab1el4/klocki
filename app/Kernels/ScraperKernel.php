<?php

namespace App\Kernels;
use App\Scrapers\SiteScrapers\AmazonPLScraper;

class ScraperKernel {

    private function __construct() {
    }

    public static function getClasses() {
        return [
            AmazonPLScraper::class,
        ];
    }
}
