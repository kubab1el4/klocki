<?php

namespace App\Models;

use Abbasudo\Purity\Traits\Filterable;
use Abbasudo\Purity\Traits\Sortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Scout\Searchable;

class Offer extends Model
{
    use HasFactory, Filterable, Sortable, Searchable;

    protected $table = 'offers';

    /**
     * Get the name of the index associated with the model.
     */
    public function searchableAs(): string {
        return 'offers_index';
    }

    public function toSearchableArray() {
        return [
            'id' => (int) $this->id,
            'set_id' => (int) $this->set_id,
            'seller' => $this->seller,
            'price' => $this->price,
            'set_year' => $this->set->year,
            'set_name' => $this->set->name,
            'set_num' => $this->set->set_num,
            'theme_name' => $this->set->theme->name,
        ];
    }

    public function importData($dataArray) {
        foreach($dataArray as $row => $value) {
            $this->$row = $value;
        }
    }

    public function set(): HasOne
    {
        return $this->hasOne(LEGOSet::class, 'id', 'set_id');
    }
}
