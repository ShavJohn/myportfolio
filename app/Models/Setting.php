<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'key',
        'value',
        'json_value',
        'page_setting'
    ];

    protected $casts = [
        'json_value' => 'array'
    ];
}
