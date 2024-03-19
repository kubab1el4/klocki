<?php

use App\Http\Controllers\SetController;
use App\Http\Controllers\ThemeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('set/{id}', [SetController::class, 'show']);

Route::get('sets', [SetController::class, 'index']);

Route::get('theme/{id}', [ThemeController::class, 'show']);

Route::get('themes', [ThemeController::class, 'index']);
