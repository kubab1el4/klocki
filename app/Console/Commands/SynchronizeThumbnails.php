<?php

namespace App\Console\Commands;

use App\Models\LEGOSet;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class SynchronizeThumbnails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'synchronize-thumbnails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Downloads applicable thumbnails to storage';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $images = LEGOSet::get()->map->only(['set_img_url', 'set_num']);

        foreach ($images as $image) {
                if (!empty($image['set_img_url'])) {
                $explodedExtFileName = explode('.', $image['set_img_url']);
                $explodedExtFileNameLast = array_key_last($explodedExtFileName);
                $internalFileName = $image['set_num'] . '.' . $explodedExtFileName[$explodedExtFileNameLast];

                $options = array(
                    "ssl" => array(
                        "verify_peer" => false,
                        "verify_peer_name" => false,
                    ),
                );

                if (!Storage::disk('thumbnails')->get($internalFileName)) {
                    $image = file_get_contents($image['set_img_url'], false, stream_context_create($options));
                    Storage::disk('thumbnails')->put($internalFileName, $image);
                }
            }
        }
    }
}
