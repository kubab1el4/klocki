<?php

namespace App\API;
use App\Results\JSONResult;
use Config;
use Http;


class AllegroApiClient {

    private static string $url;

    public static function getSets(): JSONResult {
        self::$url = 'https://api.allegro.pl/sale/offers';

        $response =  new JSONResult(Http::withHeaders([
            'Authorization' => 'Bearer ' . Config::get('app.allegro_api_key'),
        ])->get(self::$url)->body());
        dd($response);
    }
}
