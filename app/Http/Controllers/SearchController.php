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
        $result = LEGOSet::filter()->sort()->findMany($search->all());

        $yearsPluck = $result->pluck('year');
        $yearsRet = [];
        foreach ($yearsPluck as $year) {
            $yearsRet[$year] = ['number_of_appearances' => (!empty($yearsRet[$year]['number_of_appearances']) ? $yearsRet[$year]['number_of_appearances'] + 1 : 1)];
        }
        $yearsRet = json_encode($yearsRet);

        $elementsPluck = $result->pluck('num_parts');
        $elementsCategories = ['0', '1-99','100-249', '250-499', '500-999', '1000+'];
        $elementsRet = ['0' => [], '1-99' => [],'100-249' => [], '250-499' => [], '500-999' => [], '1000+' => []];
        foreach ($elementsPluck as $elements) {
            $elementsCategory = array_filter($elementsCategories, function($category) use ($elements) {
                $range = explode('-', $category);
                $rangeStart = $range[0];
                $rangeEnd = $range[1] ?? 0;
                if (!str_contains($rangeStart, '+')) {
                    return $elements >= $rangeStart && $elements <= $rangeEnd;
                } else {
                    return $elements >= (int)preg_replace("/[^0-9]/", "", $rangeStart);
                }
            });
            if (!empty($elementsCategory)) {
                $elementsCategory = $elementsCategory[array_key_first($elementsCategory)];
            }
            $elementsRet[$elementsCategory] = ['number_of_appearances' => (!empty($elementsRet[$elementsCategory]['number_of_appearances']) ? $elementsRet[$elementsCategory]['number_of_appearances'] + 1 : 1)];
        }
        $elementsRet = json_encode($elementsRet);

        $themesPluck = $result->pluck('theme_id');
        $themesRet = [];
        foreach ($themesPluck as $theme) {
            $themesRet[$theme] = ['number_of_appearances' => (!empty($themesRet[$theme]['number_of_appearances']) ? $themesRet[$theme]['number_of_appearances'] + 1 : 1)];
        }
        $themesRet = json_encode($themesRet);

        $result = $result->paginate(config('app.default_pagination'));

        return SetResource::collection($result)->additional([
            'years' => $yearsRet,
            'elements' => $elementsRet,
            'theme_ids' => $themesRet
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
