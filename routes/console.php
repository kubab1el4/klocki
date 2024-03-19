<?php

use App\Console\Commands\CrawlCatalogPrices;
use App\Console\Commands\SynchronizeLegoSets;
use App\Console\Commands\SynchronizeLegoThemes;

Schedule::command(SynchronizeLegoSets::class, [])->daily();

Schedule::command(SynchronizeLegoThemes::class, [])->daily();

Schedule::command(CrawlCatalogPrices::class, [])->daily();
