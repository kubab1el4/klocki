<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatalogPrice extends Model
{
    use HasFactory;

    public function importData($dataArray) {
        foreach($dataArray as $row => $value) {
            $this->$row = $value;
        }
    }
}
