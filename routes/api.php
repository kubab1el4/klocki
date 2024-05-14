<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\SearchController;
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

Route::get('/search/sets', [SearchController::class, 'searchSets']);
Route::get('/search/offers', [SearchController::class, 'searchOffers']);
