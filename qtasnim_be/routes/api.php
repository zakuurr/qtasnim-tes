<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TransaksiController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//barang
Route::apiResource('/barang', App\Http\Controllers\API\BarangController::class);
Route::apiResource('/jenis-barang', App\Http\Controllers\API\JenisBarangController::class);
Route::get('/transaksi/filtering',[TransaksiController::class, 'filtering']);
Route::apiResource('/transaksi',App\Http\Controllers\API\TransaksiController::class);


