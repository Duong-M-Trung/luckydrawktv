<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('tasks')->name('task.')->group(function () {
    Route::get('', 'TaskController@index')->name('index'); //Danh sách;
    Route::post('', 'TaskController@store')->name('store'); //Lưu;
    Route::get('{task}', 'TaskController@show')->name('show'); //Chi tiết;
    Route::post('{task}', 'TaskController@update')->name('update'); //Cập nhập;
    Route::post('delete/{task}', 'TaskController@delete')->name('delete'); //Xóa;
});
