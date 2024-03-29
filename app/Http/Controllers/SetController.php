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
        return SetResource::collection(LEGOSet::paginate(18));
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
