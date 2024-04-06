<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'price' => $this->price,
            'set_name' => $this->set->name ?? null,
            'set_num' => $this->set->set_num ?? null,
            'set_id' => $this->set_id,
            'seller' => $this->seller,
            'url' => $this->url,
        ];
    }
}
