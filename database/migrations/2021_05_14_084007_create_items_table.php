<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->string('name');
            $table->string('status');
            $table->datetime('startday');
            $table->datetime('endday');
            $table->smallInteger('quantity');
            $table->time('timeoutwin');
            $table->time('timeoutNwin');
            $table->string('winpostion');
            $table->string('Nwinpostion');
            $table->string('sessionreset');
            $table->integer('typo_id');
            $table->foreign('typo_id')->references('id')->on('typographies');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
