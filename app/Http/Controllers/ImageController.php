<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * Get thumbnail string.
     */
    public function getThumbnail($set_num) {
        return Storage::disk('thumbnails')->get($set_num . '.webp');
    }
}
