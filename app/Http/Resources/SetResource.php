<?php

namespace App\Http\Resources;

use App\Models\CatalogPrice;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SetResource extends JsonResource
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
            'set_num' => $this->set_num,
            'name' => $this->name,
            'year' => $this->year,
            'theme_id' => $this->theme_id,
            'theme_name' => $this->theme?->name,
            'num_parts' => $this->num_parts,
            'set_img_url' => $this->set_img_url,
            'set_url' => $this->set_url,
            'last_modified_at' => $this->last_modified_at,
            'catalog_price' => $this->catalogPrice?->price,
        ];
    }
}
