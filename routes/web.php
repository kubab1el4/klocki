<?php

use App\Http\Controllers\SetController;
use App\Http\Controllers\ThemeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Main');
});

Route::get('set/{id}', [SetController::class, 'show']);

Route::get('sets', [SetController::class, 'index']);

Route::get('theme/{id}', [ThemeController::class, 'show']);

Route::get('themes', [ThemeController::class, 'index']);
