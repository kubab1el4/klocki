<?php

namespace App\Console\Commands;

use App\Crawlers\CatalogPriceCrawler;
use Illuminate\Console\Command;

class CrawlCatalogPrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'crawl-catalog-prices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pobieranie danych ze strony zawierającej ceny';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        CatalogPriceCrawler::execute();
    }
}
