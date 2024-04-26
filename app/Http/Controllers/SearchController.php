<?php

namespace App\Http\Controllers;

use App\Models\LEGOSet;
use Illuminate\Http\Request;
use Meilisearch\Endpoints\Indexes;

class SearchController extends Controller {
    public function searchSets(Request $request) {
        $sets = LEGOSet::search($request->search)->take(200)->get()->toQuery();

        if ($request->has('filter')) {
            $filterArray = explode(',', $request->get('filter'));
            $count = 1;
            foreach($filterArray as $filter) {
                if ($filter !== "") {
                    $matches = [];
                    preg_match('/[^a-zA-Z\d\s_\-:]{1,2}/', $filter, $matches);
                    $operator = $matches[0];
                    $filterStrings = explode($operator, $filter);
                    if ($count === 1) {
                        $sets = $sets->where($filterStrings[0], $operator, $filterStrings[1]);
                    } else {
                        $sets = $sets->orWhere($filterStrings[0], $operator, $filterStrings[1]);
                    }
                }
                $count++;
            }
        }
        if (!empty($sets->get()->toArray())) {
            if ($request->has('sort') && $request->get('sort') !== "") {
                $sortArray = explode(':', $request->get('sort'));
                $sets = $sets->orderBy($sortArray[0], $sortArray[1])->paginate(config('app.default_pagination'));
            } else {
                $sets = $sets->paginate(config('app.default_pagination'));
            }
        }

        return $sets;
    }

    public function searchOffers(Request $request) {
        $offers = LEGOSet::search($request->search)->take(200)->get()->toQuery();

        if ($request->has('filter')) {
            $filterArray = explode(',', $request->get('filter'));
            $count = 1;
            foreach($filterArray as $filter) {
                if ($filter !== "") {
                    $matches = [];
                    preg_match('/[^a-zA-Z\d\s_\-:]{1,2}/', $filter, $matches);
                    $operator = $matches[0];
                    $filterStrings = explode($operator, $filter);
                    if ($count === 1) {
                        $offers = $offers->where($filterStrings[0], $operator, $filterStrings[1]);
                    } else {
                        $offers = $offers->orWhere($filterStrings[0], $operator, $filterStrings[1]);
                    }
                }
                $count++;
            }
        }
        if (!empty($offers->get()->toArray())) {
            if ($request->has('sort') && $request->get('sort') !== "") {
                $sortArray = explode(':', $request->get('sort'));
                $offers = $offers->orderBy($sortArray[0], $sortArray[1])->paginate(config('app.default_pagination'));
            } else {
                $offers = $offers->paginate(config('app.default_pagination'));
            }
        }

        return $offers;
    }
}
