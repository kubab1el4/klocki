<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\SetController;
use App\Http\Controllers\ThemeController;
use App\Models\LEGOSet;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Scout\Engines\MeilisearchEngine;
use Meilisearch\Client;
use Meilisearch\Endpoints\Indexes;
use Meilisearch\Meilisearch;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('hero', [ImageController::class, 'getThumbnail']);

Route::get('thumbnail/{set_num}', [ImageController::class, 'getThumbnail']);

Route::get('set/{id}', [SetController::class, 'show']);
Route::get('sets', [SetController::class, 'index']);

Route::get('theme/{id}', [ThemeController::class, 'show']);
Route::get('theme/{id}/parent', [ThemeController::class, 'getParent']);
Route::get('theme/{id}/children', [ThemeController::class, 'getChildren']);
Route::get('themes', [ThemeController::class, 'index']);

Route::get('offers', [OfferController::class, 'index']);

Route::get('/search/offers', function (Request $request) {
    $sortable = !empty($request->sort) ? explode(':', $request->sort) : [];
    $filterable = !empty($request->filter) ? explode('=', $request->filter) : [];
    return Offer::search($request->search)->orderBy($sortable[0] ?? 'id', $sortable[1] ?? 'desc')->where($filterable[0], $filterable[1])->paginate(config('app.default_pagination'));
});
Route::get('/search/sets', function (Request $request) {
    return LEGOSet::search(
        $request->search,
        function (Indexes $meilisearch, string $query, array $options) use ($request) {
            if ($request->has(key: 'filter')) {
                $filterArray = explode(',', $request->get('filter'));
                $options['filter'] = implode(' OR ', $filterArray);
            }

            if ($request->has(key: 'sort')) {
                $sortArray = explode(',', $request->get('sort'));
                $options['sort'] = [...$sortArray];
            }
            return $meilisearch->search(
                query: $query,
                options: $options,
            );
        },
    )->get()->toQuery()->paginate(config('app.default_pagination'));
});
