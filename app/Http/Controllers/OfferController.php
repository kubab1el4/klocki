<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfferResource;
use App\Models\Offer;

class OfferController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return OfferResource::collection(Offer::sort()->filter()->paginate(10));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return new OfferResource(Offer::findOrFail($id));
    }
}
