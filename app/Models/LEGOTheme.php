<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class LEGOTheme extends Model
{
    use HasFactory;

    protected $table = 'lego_themes';

    public function importData($dataArray) {
        foreach($dataArray as $row => $value) {
            $this->$row = $value;
        }
    }

    public function sets(): HasMany
    {
        return $this->hasMany(LEGOSet::class, 'theme_id', 'id');
    }

    public function Parent(): HasOne
    {
        return $this->hasOne(LEGOTheme::class, 'id', 'parent_id');
    }
}
