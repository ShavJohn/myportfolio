<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = [
        'key',
        'value'
    ];
}
