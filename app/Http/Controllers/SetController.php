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

        $yearsPluck = $result->pluck('year');
        $yearsRet = [];
        foreach ($yearsPluck as $year) {
            $yearsRet[$year] = ['number_of_appearances' => (!empty($yearsRet[$year]['number_of_appearances']) ? $yearsRet[$year]['number_of_appearances'] + 1 : 1)];
        }
        $yearsRet = json_encode($yearsRet);

        $elementsPluck = $result->pluck('num_parts');
        $elementsCategories = ['0', '1-99','100-249', '250-499', '500-999', '1000+'];
        $elementsRet = [
            '0' => ['number_of_appearances' => 0],
            '1-99' => ['number_of_appearances' => 0],
            '100-249' => ['number_of_appearances' => 0],
            '250-499' => ['number_of_appearances' => 0],
            '500-999' => ['number_of_appearances' => 0],
            '1000+' => ['number_of_appearances' => 0]
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
