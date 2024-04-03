<?php

namespace App\Console\Commands;

use App\Models\LEGOSet;
use App\Scrapers\OfferScraper;
use Illuminate\Console\Command;

class ScrapeOffers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape-offers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run scrapers from kernel';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        OfferScraper::execute();
    }
}
