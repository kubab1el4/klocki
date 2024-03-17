<?php

namespace App\API;
use App\Results\JSONResult;
use Config;
use Http;


class LEGOApiClient {

    private static string $url;

    public static function getSets(int $page, int $yearFrom = null, int $yearTo = null): JSONResult {
        self::$url = 'https://rebrickable.com/api/v3/lego/sets/';
        if (!empty($yearFrom) || !empty($yearTo)) {
            self::$url .= '?';
        }

        if (!empty($yearFrom)) {
            self::$url .= 'min_year=2024' . (!empty($yearTo) ? '&' : '');
        }

        if (!empty($yearTo)) {
            self::$url .= 'max_year=2024';
        }

        $keyString = (!empty($yearFrom) || !empty($yearTo) ? '&' : '?') . 'key=' . Config::get('app.lego_api_key');

        $pageString = '&page=' . $page . '&page_size=1000';
        return new JSONResult(Http::get(self::$url . $keyString . $pageString)->body());
    }

    public static function getMinifigs(int $page, int $yearFrom = null, int $yearTo = null): JSONResult {
        self::$url = 'https://rebrickable.com/api/v3/lego/minifigs/';
        if (!empty($yearFrom) || !empty($yearTo)) {
            self::$url .= '?';
        }

        if (!empty($yearFrom)) {
            self::$url .= 'min_year=2024' . (!empty($yearTo) ? '&' : '');
        }

        if (!empty($yearTo)) {
            self::$url .= 'max_year=2024';
        }

        $pageString = '&page=' . $page . '&page_size=1000';

        $keyString = (!empty($yearFrom) || !empty($yearTo) ? '&' : '') . 'key=' . Config::get('app.lego_api_key');

        return new JSONResult(Http::get(self::$url . $keyString . $pageString)->body());
    }

    public static function getThemes(int $page): JSONResult {
        self::$url = 'https://rebrickable.com/api/v3/lego/themes/';

        $keyString = '?key=' . Config::get('app.lego_api_key');

        $pageString = '&page=' . $page . '&page_size=1000';

        return new JSONResult(Http::get(self::$url . $keyString . $pageString)->body());
    }
}
