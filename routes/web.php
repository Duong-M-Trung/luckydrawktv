<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RenderView;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TypographyController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('home');
// });
Route::get('/',[RenderView::class,'__invoke']);
Route::get('/showtask',[TaskController::class,'showtask']);
Route::post('sendrequest',[TaskController::class,'addtask']);
Route::post('deletetask/{item}',[TaskController::class,'deletetask']);
Route::get('gettask/{item}',[TaskController::class,'gettask']);
Route::post('updatetask/{task}',[TaskController::class,'updatetask']);

Route::get('/gettypo',[TypographyController::class,'gettypo']);