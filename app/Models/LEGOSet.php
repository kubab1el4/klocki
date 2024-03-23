<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class LEGOSet extends Model
{
    use HasFactory;

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
