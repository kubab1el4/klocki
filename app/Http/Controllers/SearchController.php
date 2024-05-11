<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfferResource;
use App\Http\Resources\SetResource;
use App\Models\LEGOSet;
use App\Models\Offer;
use Illuminate\Http\Request;

class SearchController extends Controller {
    public function searchSets(Request $request) {
        $search = LEGOSet::search($request->search)->take(200)->get();
        if (count($search) !== 0) {
            $search = $search->toQuery()->pluck('id');
        } else {
            return SetResource::collection($search);
        }
        return SetResource::collection(LEGOSet::sort()->filter()->findMany($search->all())->toQuery()->paginate(config('app.default_pagination')));
    }

    public function searchOffers(Request $request) {
        $search = Offer::search($request->search)->take(200)->get();
        if (count($search) !== 0) {
            $search = $search->toQuery()->pluck('id');
        } else {
            return OfferResource::collection($search);
        }
        return OfferResource::collection(LEGOSet::sort()->filter()->findMany($search->all())->toQuery()->paginate(config('app.default_pagination')));
    }
}
