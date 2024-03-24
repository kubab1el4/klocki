<?php

use App\Http\Controllers\SetController;
use App\Http\Controllers\ThemeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('{reactRoutes}', function () {
    return Inertia::render('Main');
})->where('reactRoutes', '^((?!api).)*$');;

