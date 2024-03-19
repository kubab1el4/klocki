<?php

use App\Http\Controllers\SetController;
use App\Http\Controllers\ThemeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Main');
});

