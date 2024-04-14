<?php

namespace App\Console\Commands;

use App\API\AllegroApiClient;
use App\Models\Offer;
use Illuminate\Console\Command;

class SynchronizeAllegroOffers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'synchronize-allegro-offers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Synchronize allegro offers';

    /**
     * Execute the console command.
     */
    public function handle() {
        dd(AllegroApiClient::getSets());
        $data = [];
        $pageCount = 1;
        do {
            $result = AllegroApiClient::getSets()->getDataArray();
            if (isset($result['results'])) {
                $data = array_merge($data, $result['results']);
            }
            $pageCount++;
        } while (!isset($result['detail']) || $result['detail'] != 'Invalid page.');

        foreach($data as $record) {
            if(!Offer::where('set_num', '=', $record['set_num'])->first()) {
                $set = new Offer;
                $set->importData($record);
                $set->save();
            }
        }
    }
}
