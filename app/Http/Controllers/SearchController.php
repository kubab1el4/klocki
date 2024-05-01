<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfferResource;
use App\Http\Resources\SetResource;
use App\Models\LEGOSet;
use App\Models\Offer;
use Illuminate\Http\Request;

class SearchController extends Controller {
    public function searchSets(Request $request) {
        $search = LEGOSet::search($request->search)->take(100)->get()->toQuery()->pluck('id');
        return SetResource::collection(LEGOSet::sort()->filter()->findMany($search->all()));
    }

    public function searchOffers(Request $request) {
        $search = Offer::search($request->search)->take(100)->get()->toQuery()->pluck('id');
        return OfferResource::collection(LEGOSet::sort()->filter()->findMany($search->all()));
    }
}
