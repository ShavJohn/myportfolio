<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'api'], function() {
    Route::post('/login', 'App\Http\Controllers\AuthController@login');

    //statistics
    Route::post('/count-visitor', 'App\Http\Controllers\StatisticsController@countVisitors');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/check-auth', 'App\Http\Controllers\AuthController@checkAuth');
        Route::post('/create-user', 'App\Http\Controllers\AuthController@register');
        Route::put('/change-current-user-data/{user}', 'App\Http\Controllers\AuthController@changeUserData');
        Route::post('/logout', 'App\Http\Controllers\AuthController@logOut');

        //statistics
        Route::get('/get-statistics-data', 'App\Http\Controllers\StatisticsController@getStatisticsData');

    });
});