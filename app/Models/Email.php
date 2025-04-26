<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{

    /**
     * @var string
     */

    /**
     * @var array
     */
    protected $guarded = [];

    /**
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'message',
        'reply'
    ];

    protected $casts = [
        'reply' => 'array'
    ];
}
