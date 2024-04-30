<?php

namespace App\Console\Commands;

use App\Scrapers\CatalogPriceScraper;
use Illuminate\Console\Command;

class ScrapeCatalogPrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape-catalog-prices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pobieranie danych ze strony zawierającej ceny';

    /**
     * Execute the console command.
     */
    public function handle() {
        CatalogPriceScraper::execute();
    }
}
