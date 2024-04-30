<?php

use App\Console\Commands\AssignCoreTheme;
use App\Console\Commands\CrawlCatalogPrices;
use App\Console\Commands\ScrapeCatalogPrices;
use App\Console\Commands\ScrapeOffers;
use App\Console\Commands\SynchronizeLegoSets;
use App\Console\Commands\SynchronizeLegoThemes;
use App\Console\Commands\SynchronizeThumbnails;

// Schedule::command(SynchronizeLegoSets::class, [])->daily();

// Schedule::command(SynchronizeLegoThemes::class, [])->daily();

Schedule::command(ScrapeCatalogPrices::class, [])->daily();

Schedule::command(SynchronizeThumbnails::class, [])->daily();

Schedule::command(ScrapeOffers::class, [])->daily();

Schedule::command(AssignCoreTheme::class, [])->daily();
