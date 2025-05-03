<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'api'], function() {
    Route::post('/login', 'App\Http\Controllers\AuthController@login');

    //statistics
    Route::post('/count-visitor', 'App\Http\Controllers\StatisticsController@countVisitors');

    //message route
    Route::post('/send-message', 'App\Http\Controllers\EmailController@store');

    //Skills
    Route::get('/get-skills', 'App\Http\Controllers\SkillController@getSkills');

    //Project
    Route::get('/get-projects', 'App\Http\Controllers\ProjectController@getProjects');

    //Experinece
    Route::get('/get-experineces', 'App\Http\Controllers\ExperienceController@getAll');

    //Settings
    Route::get('/get-settings', 'App\Http\Controllers\SettingController@getSettings');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/check-auth', 'App\Http\Controllers\AuthController@checkAuth');
        Route::post('/create-user', 'App\Http\Controllers\AuthController@register');
        Route::put('/change-current-user-data/{user}', 'App\Http\Controllers\AuthController@changeUserData');
        Route::post('/logout', 'App\Http\Controllers\AuthController@logOut');

        //message routs
        Route::get('/get-messages', 'App\Http\Controllers\EmailController@index');
        Route::post('/reply-to-message', 'App\Http\Controllers\EmailController@reply');
        Route::put('/update-message-status/{messageId}', 'App\Http\Controllers\EmailController@updateStatus');

        //skills
        Route::post('/store-skill', 'App\Http\Controllers\SkillController@storeSkill');
        Route::delete('/remove-skill/{skillId}', 'App\Http\Controllers\SkillController@removeSkill');

        //Project
        Route::post('/create-project', 'App\Http\Controllers\ProjectController@storeProject');
        Route::put('/update-project/{projectId}', 'App\Http\Controllers\ProjectController@updateProject');
        Route::delete('/remove-project/{projectId}', 'App\Http\Controllers\ProjectController@deleteProject');
        Route::post('/upload-project-image', 'App\Http\Controllers\ProjectController@uploadProjectImage');
        Route::delete('/delete-prokect-image/{image}', 'App\Http\Controllers\ProjectController@deleteProjectImage');

        //Positions
        Route::post('/experience-store', 'App\Http\Controllers\ExperienceController@store');
        Route::put('/update-experience/{id}', 'App\Http\Controllers\ExperienceController@update');
        Route::delete('/remove-experience/{id}', 'App\Http\Controllers\ExperienceController@delete');

        //home
        Route::post('/title-text-update-or-create', 'App\Http\Controllers\SettingController@storeOrUpdate');

        //Settings
        Route::post('/upload-logo', 'App\Http\Controllers\SettingController@uploadLogo');
        Route::delete('/delete-logo/{logo}', 'App\Http\Controllers\SettingController@deleteLogo');
        Route::put('/update-or-create', 'App\Http\Controllers\SettingController@storeOrUpdate');

        //statistics
        Route::get('/get-statistics-data', 'App\Http\Controllers\StatisticsController@getStatisticsData');

    });
});