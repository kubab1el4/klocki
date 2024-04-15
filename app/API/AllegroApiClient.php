<?php

namespace App\API;
use App\Results\JSONResult;
use Config;
use Http;

class AllegroApiClient {

    private string $mainUrl = 'https://allegro.pl';

    private string $apiUrl = 'https://api.allegro.pl';

    private string $authUrl = '/auth/oauth/token?grant_type=client_credentials';

    public function getAccessToken(): string {
        $clientId = config('app.allegro_api_client_id');
        $clientSecret = config('app.allegro_api_client_secret');

        $result = Http::withBasicAuth($clientId, $clientSecret)->get($this->mainUrl . $this->authUrl);
        if ($result === false || $result->status() !== 200) {
            exit ("Something went wrong");
        }

        return $result->collect('access_token')->first();
    }

    public function getLEGOOffers($accessToken): array {

        $result = Http::withHeaders([
            'authorization' => "Bearer $accessToken",
        ])->get($this->apiUrl . '/sale/offers');
        dd($result);
        if ($result === false || $result->status() !== 200) {
            exit ("Something went wrong");
        }

        return $result->collect('access_token')->first();
    }

}
