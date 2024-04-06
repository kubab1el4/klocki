<?php

namespace App\Models;

use Abbasudo\Purity\Traits\Filterable;
use Abbasudo\Purity\Traits\Sortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Offer extends Model
{
    use HasFactory, Filterable, Sortable;

    protected $table = 'offers';

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
