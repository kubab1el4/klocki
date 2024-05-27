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
        $years = [];
        foreach ($yearsPluck as $year) {
            $years[$year] = ['number_of_appearances' => (!empty($years[$year]['number_of_appearances']) ? $years[$year]['number_of_appearances'] + 1 : 1)];
        }
        $yearsRet = [];
        foreach($years as $year => $data) {
            $yearsRet[] = ['year' => $year, 'number_of_appearances' => $data['number_of_appearances']];
        }
        $yearsRet = json_encode($yearsRet);

        $elementsPluck = $result->pluck('num_parts');
        $elementsCategories = ['0', '1-99','100-249', '250-499', '500-999', '1000+'];
        $elementsRet = [
            ['category' => '0', 'number_of_appearances' => 0],
            ['category' => '1-99', 'number_of_appearances' => 0],
            ['category' => '100-249', 'number_of_appearances' => 0],
            ['category' => '250-499', 'number_of_appearances' => 0],
            ['category' => '500-999', 'number_of_appearances' => 0],
            ['category' => '1000+', 'number_of_appearances' => 0]
        ];
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
            $categoryIndex = array_search($elementsCategory, $elementsCategories);
            $elementsRet[$categoryIndex] = ['category' => $elementsCategory, 'number_of_appearances' => (!empty($elementsRet[$categoryIndex]['number_of_appearances']) ? $elementsRet[$categoryIndex]['number_of_appearances'] + 1 : 1)];
        }
        $elementsRet = json_encode($elementsRet);

        $themesPluck = $result->pluck('theme_id');
        $themes = [];
        foreach ($themesPluck as $theme) {
            $themes[$theme] = ['number_of_appearances' => (!empty($themes[$theme]['number_of_appearances']) ? $themes[$theme]['number_of_appearances'] + 1 : 1)];
        }
        foreach ($themes as $theme => $data) {
            $themesRet[] = ['theme_id' => $theme, 'number_of_appearances' => $data['number_of_appearances']];
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
