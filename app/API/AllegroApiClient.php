<?php

namespace App\API;
use App\Results\JSONResult;
use Config;
use Http;

class AllegroApiClient {

    private string $mainUrl = 'https://allegro.pl';

    private string $apiUrl = 'https://api.allegro.pl';

    private string $authUrl = '/auth/oauth/device?client_id=938908df89ab4d4cafa30b1b0487dca3';

    public function getAccessToken(): string {
        $clientId = config('app.allegro_api_client_id');
        $clientSecret = config('app.allegro_api_client_secret');
        $clientbase64 = base64_encode($clientId . ':' . $clientSecret);

        $result = Http::withHeaders([
            'Authorization' => 'Basic ' . $clientbase64,
            'Content-Type' => 'application/x-www-form-urlencoded'
        ])->withQueryParameters([
            'client_id' => $clientId
        ])->post($this->mainUrl . $this->authUrl);
        dd($result->collect());
        if ($result === false || $result->status() !== 200) {
            exit ("Something went wrong");
        }

        return $result->collect('access_token')->first();
    }

    public function getLEGOOffers($accessToken): array {
dump($accessToken);
        $result = Http::withHeaders([
            'authorization' => "Bearer $accessToken",
            'Accept: application/vnd.allegro.public.v1+json'
        ])->get($this->apiUrl . '/sale/offers');
        dd($result);
        if ($result === false || $result->status() !== 200) {
            exit ("Something went wrong");
        }

        return $result->collect('access_token')->first();
    }

}
