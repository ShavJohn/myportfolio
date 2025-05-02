<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = [
        'title',
        'description',
        'company',
        'startDate',
        'endDate',
        'tillNow',
        'type'
    ];
}
