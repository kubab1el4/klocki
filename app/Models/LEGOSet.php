<?php

namespace App\Models;

use Abbasudo\Purity\Traits\Filterable;
use Abbasudo\Purity\Traits\Sortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class LEGOSet extends Model
{
    use HasFactory, Filterable, Sortable;

    protected $table = 'lego_sets';

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
