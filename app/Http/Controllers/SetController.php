<?php

namespace App\Http\Controllers;

use App\Http\Resources\SetResource;
use App\Models\LEGOSet;
use Illuminate\Http\Request;

class SetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $result = LEGOSet::sort()->filter()->sortFields('year')->get();
        $maxYear = $result->max('year');
        $minYear = $result->min('year');
        $maxElements = $result->max('num_parts');
        $minElements = $result->min('num_parts');
        $result = $result->paginate(config('app.default_pagination'));

        return SetResource::collection($result)->additional([
            'max_year' => $maxYear,
            'min_year' => $minYear,
            'max_elements' => $maxElements,
            'min_elements' => $minElements,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return new SetResource(LEGOSet::findOrFail($id));
    }

    /**
     * Count existing database entries.
     */
    public function count() {
        return LEGOSet::all()->count();
    }
}
