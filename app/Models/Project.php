<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = [
        'name',
        'image',
        'url'
    ];
}
