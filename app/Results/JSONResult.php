<?php

namespace App\Results;

class JSONResult {

    private array $data;

    private string $json;

    public function __construct(string $json) {
        $this->json = $json;
    }

    public function getDataArray() {
        $this->data = json_decode($this->json, true);
        return $this->data;
    }
}
