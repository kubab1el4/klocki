<?php

namespace App\Scrapers;

use App\Kernels\ScraperKernel;

class OfferScraper {

    public static function execute() {
        foreach (ScraperKernel::getClasses() as $class) {
            $class::execute();
        }
    }
}
