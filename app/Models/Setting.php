<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{

    /**
     * @var string[]
     */
    protected $fillable = [
        'key',
        'value',
        'json_value',
    ];

    protected $casts = [
        'json_value' => 'array'
    ];
}
