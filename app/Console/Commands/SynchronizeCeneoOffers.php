<?php

namespace App\Console\Commands;

use App\API\AllegroApiClient;
use App\Models\Offer;
use App\Spiders\AllegroSpider;
use App\Spiders\CeneoSpider;
use Illuminate\Console\Command;
use RoachPHP\Roach;

class SynchronizeAllegroOffers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'synchronize-ceneo-offers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Synchronize ceneo offers';

    /**
     * Execute the console command.
     */
    public function handle() {
        dump('Data rozpoczęcia: ' . date('Y-m-d H:i:s'));
        $items = Roach::collectSpider(CeneoSpider::class);
        foreach ($items as $item) {
            $existingOffer = Offer::where('set_id', $item['set_id'])->where('seller', $item['seller'])->first();
            if (!$existingOffer) {
                $offer = new Offer;
                $offer->set_id = $item['set_id'];
                $offer->price = $item['price'];
                $offer->seller = $item['seller'];
                $offer->url = $item['url'];
                $offer->save();
            }
        }
        dump('Data zakończenia: ' . date('Y-m-d H:i:s'));
    }
}
