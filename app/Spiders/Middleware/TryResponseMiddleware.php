<?php

namespace App\Spiders\Middleware;

use GuzzleHttp\Client;
use RoachPHP\Http\Response;
use RoachPHP\Spider\Middleware\ResponseMiddlewareInterface;
use RoachPHP\Support\Configurable;

class TryResponseMiddleware implements ResponseMiddlewareInterface {
    use Configurable;

    public function handleResponse(Response $response): Response {
        if ($response->getStatus() === 503) {
            $client = new Client;
            do {
                sleep(5);
                dump('Błąd, ponawiam próbę otworzenia za 5');
                $newRequest = $client->send($response->getRequest()->getPsrRequest(), $response->getRequest()->getOptions());
                $newResponse = new Response($newRequest, $response->getRequest());
            } while ($newResponse->filter('title')->text('default', true) != 'Amazon.pl : lego');
            return $newResponse;
        }
        return $response;
    }
}
