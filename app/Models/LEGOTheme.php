<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LEGOTheme extends Model
{
    use HasFactory;

    protected $table = 'lego_themes';

    public function importData($dataArray) {
        foreach($dataArray as $row => $value) {
            $this->$row = $value;
        }
    }
}
