<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Typography;

class TypographyController extends Controller
{
    public function getTypo(){
        $typo = Typography::all();
        return response()->json($typo,200);
    }
}
