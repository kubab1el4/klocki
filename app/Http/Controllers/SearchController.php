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
        $result = SetResource::collection(LEGOSet::filter()->sort()->findMany($search->all())->paginate(config('app.default_pagination')));
        $maxYear = $result->max('year');
        $minYear = $result->min('year');
        $maxElements = $result->max('num_parts');
        $minElements = $result->min('num_parts');
        $themeIds = array_values($result->pluck('theme_id')->unique()->toArray());
        
        return $result->additional([
            'max_year' => $maxYear,
            'min_year' => $minYear,
            'max_elements' => $maxElements,
            'min_elements' => $minElements,
            'theme_ids' => $themeIds
        ]);
    }

    public function searchOffers(Request $request) {
        $search = Offer::search($request->search)->take(200)->get();
        if (count($search) !== 0) {
            $search = $search->toQuery()->pluck('id');
        } else {
            return OfferResource::collection($search);
        }
        return OfferResource::collection(LEGOSet::filter()->sort()->findMany($search->all())->paginate(config('app.default_pagination')));
    }
}
