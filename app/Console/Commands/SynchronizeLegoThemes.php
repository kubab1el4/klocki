<?php

namespace App\Console\Commands;

use App\API\LEGOApiClient;
use App\Models\LEGOSet;
use App\Models\LEGOTheme;
use Illuminate\Console\Command;

class SynchronizeLegoThemes extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'synchronize-themes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pobranie z API informacji o themes do bazy danych';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $data = [];
        $pageCount = 1;
        do {
            $result = LEGOApiClient::getThemes($pageCount)->getDataArray();
            if (isset($result['results'])) {
                $data = array_merge($data, $result['results']);
            }
            $pageCount++;
        } while (!isset($result['detail']) || $result['detail'] != 'Invalid page.');

        foreach($data as $record) {
            if(!LegoTheme::find($record['id'])) {
                $theme = new LEGOTheme;
                $theme->importData($record);
                $theme->save();
            }
        }
    }
}
