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
        Schema::create('lego_themes', function (Blueprint $table) {
            $table->id();
            $table->integer('parent_id')->constrained('lego_themes', 'id')->nullable();
            $table->string('name');
            $table->integer('core_theme_id')->constrained('lego_themes', 'id')->nullable();
            $table->boolean('displayed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lego_themes');
    }
};
