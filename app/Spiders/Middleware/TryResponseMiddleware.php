<?php

namespace App\Spiders\Middleware;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use RoachPHP\Http\Response;
use RoachPHP\Spider\Middleware\ResponseMiddlewareInterface;
use RoachPHP\Support\Configurable;

class TryResponseMiddleware implements ResponseMiddlewareInterface {

    use Configurable;

    public function handleResponse(Response $response): Response {
        if ($response->getStatus() !== 200) {
            $client = new Client;

            $count = 0;
            $success = false;
            do {
                sleep(5);
                dump('Błąd, ponawiam próbę otworzenia za 5');
                try {
                    $newRequest = $client->send($response->getRequest()->getPsrRequest(), $response->getRequest()->getOptions());
                    $newResponse = new Response($newRequest, $response->getRequest());
                    $success = true;
                } catch (RequestException $e) {
                }
            } while ((!$success) && $count < 5);
            return $newResponse ?? $response;
        }
        return $response;
    }
}
