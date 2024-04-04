<?php

namespace App\Http\Controllers;

use App\Http\Resources\SetResource;
use App\Http\Resources\ThemeResource;
use App\Models\LEGOTheme;

class ThemeController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return ThemeResource::collection(LEGOTheme::sort()->filter()->paginate(10));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return new ThemeResource(LEGOTheme::findOrFail($id));
    }

    /**
     * Display sets from theme of given id.
     */
    public function showSets(string $id) {
        return SetResource::collection(LEGOTheme::findOrFail($id)->getRecursiveSets()->toQuery()->sortFields('year')->filter()->sort()->paginate(16));
    }

     /**
     * Display parent of theme.
     */
    public function getParent(string $id) {
        return new ThemeResource(LEGOTheme::findOrFail($id)->parent);
    }

     /**
     * Display children of theme.
     */
    public function getChildren(string $id) {
        return ThemeResource::collection(LEGOTheme::findOrFail($id)->children()->paginate(16));
    }
}
