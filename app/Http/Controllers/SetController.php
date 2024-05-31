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
        $years = [];
        foreach ($yearsPluck as $year) {
            $years[$year] = ['number_of_appearances' => (!empty($years[$year]['number_of_appearances']) ? $years[$year]['number_of_appearances'] + 1 : 1)];
        }
        $yearsRet = [];
        foreach($years as $year => $data) {
            $yearsRet[] = ['year' => $year, 'number_of_appearances' => $data['number_of_appearances']];
        }

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

        $themesPluck = $result->pluck('theme_id');
        $themes = [];
        foreach ($themesPluck as $theme) {
            $themes[$theme] = ['number_of_appearances' => (!empty($themes[$theme]['number_of_appearances']) ? $themes[$theme]['number_of_appearances'] + 1 : 1)];
        }
        foreach ($themes as $theme => $data) {
            $themesRet[] = ['theme_id' => $theme, 'number_of_appearances' => $data['number_of_appearances']];
        }

        $result = $result->paginate(config('app.default_pagination'));

        return SetResource::collection($result)->additional([
            'yearsOfAppearance' => $yearsRet,
            'elements' => $elementsRet,
            'themes' => $themesRet
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
