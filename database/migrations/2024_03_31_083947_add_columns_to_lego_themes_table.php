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
        Schema::table('lego_themes', function (Blueprint $table) {
            $table->integer('core_theme_id')->constrained('lego_themes', 'id')->nullable();
            $table->boolean('on_display')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lego_themes', function (Blueprint $table) {
            $table->dropColumn('core_theme_id');
           $table->dropColumn('on_display');
        });
    }
};
