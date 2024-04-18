<?php

namespace App\Models;

use Abbasudo\Purity\Traits\Filterable;
use Abbasudo\Purity\Traits\Sortable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Scout\Searchable;

class LEGOTheme extends Model
{
    use HasFactory, Filterable, Sortable, Searchable;

    protected $recursiveSets;

    protected $table = 'lego_themes';

    public function __construct() {
        $this->recursiveSets = $this->sets;
    }

    public function importData($dataArray) {
        foreach($dataArray as $row => $value) {
            $this->$row = $value;
        }
    }

    public function sets(): HasMany
    {
        return $this->hasMany(LEGOSet::class, 'theme_id', 'id');
    }

    public function getRecursiveSets()
    {
        $sets = $this->sets()->get();
        $children = $this->children;

        foreach ($children as $child) {
            $child->getRecursiveSets()->each(fn($x) => $sets->push($x));
        }
        return $sets;
    }

    public function parent(): HasOne
    {
        return $this->hasOne(LEGOTheme::class, 'id', 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(LEGOTheme::class, 'parent_id', 'id');
    }
}
