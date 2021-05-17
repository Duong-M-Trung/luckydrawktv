<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'status',
        'startday',
        'endday',
        'quantity',
        'timeoutwin',
        'timeoutNwin',
        'winpostion',
        'Nwinpostion',
        'sessionreset',
        'typo_id',
    ];
    protected $primaryKey = 'id';
}
