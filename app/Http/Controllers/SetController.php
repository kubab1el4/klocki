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
        return SetResource::collection(LEGOSet::all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return new SetResource(LEGOSet::find($id));
    }
}
