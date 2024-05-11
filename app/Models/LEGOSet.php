<?php

namespace App\Models;

use Abbasudo\Purity\Traits\Filterable;
use Abbasudo\Purity\Traits\Sortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Scout\Searchable;

class LEGOSet extends Model
{
    use HasFactory, Filterable, Sortable, Searchable;

    protected $table = 'lego_sets';

    /**
     * Get the name of the index associated with the model.
     */
    public function searchableAs(): string
    {
        return 'sets_index';
    }

    public function toSearchableArray() {
        return [
            'id' => (int) $this->id,
            'year' => (int) $this->year,
            'set_num' => $this->set_num,
            'name' => $this->name,
            'theme_id' => (int) $this->theme_id,
            'theme_name' => $this->theme?->name,
            'parent_theme_name' => $this->theme->parent?->name,
            'num_parts' => (int) $this->num_parts,
        ];
    }

    public function importData($dataArray) {
        foreach($dataArray as $row => $value) {
            $this->$row = $value;
        }
    }

    public function theme(): HasOne
    {
        return $this->hasOne(LEGOTheme::class, 'id', 'theme_id');
    }

    public function catalogPrice(): HasOne
    {
        return $this->hasOne(CatalogPrice::class, 'set_num', 'set_num');
    }
}
