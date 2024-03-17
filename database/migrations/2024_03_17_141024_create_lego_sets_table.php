<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lego_sets', function (Blueprint $table) {
            $table->id();
            $table->string('set_num');
            $table->string('name');
            $table->integer('year');
            $table->integer('theme_id')->constrained('lego_themes', 'id');
            $table->integer('num_parts');
            $table->string('set_img_url')->nullable();
            $table->string('set_url')->nullable();
            $table->timestamp('last_modified_dt');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lego_sets');
    }
};
