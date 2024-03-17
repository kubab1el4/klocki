<?php

namespace App\Console\Commands;

use App\API\LEGOApiClient;
use App\Models\LEGOSet;
use Illuminate\Console\Command;

class SynchronizeLegoSets extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'synchronize-sets {--from=} {--to=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pobranie z API informacji o zestawach do bazy danych';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $data = [];
        $pageCount = 1;
        do {
            $result = LEGOApiClient::getSets($pageCount, $this->option('from'), $this->option('to'))->getDataArray();
            if (isset($result['results'])) {
                $data = array_merge($data, $result['results']);
            }
            $pageCount++;
        } while (!isset($result['detail']) || $result['detail'] != 'Invalid page.');

        foreach($data as $record) {
            if(!LegoSet::where('set_num', '=', $record['set_num'])->first()) {
                $set = new LEGOSet;
                $set->importData($record);
                $set->save();
            }
        }
    }
}
