<?php

namespace App\Http\Controllers;

use App\Http\Resources\ThemeResource;
use App\Models\LEGOTheme;

class ThemeController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return ThemeResource::collection(LEGOTheme::paginate(20));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return new ThemeResource(LEGOTheme::find($id));
    }
}
