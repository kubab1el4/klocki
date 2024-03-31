<?php

namespace App\Console\Commands;

use App\Models\LEGOTheme;
use Illuminate\Console\Command;

class AssignCoreTheme extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'assign-core-theme';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assigns core theme to themes with same name';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $themes = LEGOTheme::all();

        foreach($themes as $theme) {
            if ($theme->parent_id != null && LEGOTheme::where('name', $theme->name)->where('parent_id', null)->first()) {
                $theme->core_theme_id = LEGOTheme::where('name', $theme->name)->where('parent_id', null)->first()->id;
                $theme->save();
            }
        }
    }
}
