<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\User;
use App\Models\Typography;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function showtask(){
        //$tasks = Item::orderBy('id', 'desc')->get();
        $items = DB::table('items')
            ->join('typographies', 'items.typo_id', '=', 'typographies.id')
            ->select('items.*', 'typographies.typography as typo_id')
            ->get();
        return response()->json($items);
    }

    public function gettask($item){
        $items = DB::table('items')
                ->select('*')
                ->where('id','=',$item)
                ->get();
        return response()->json($items, 200);
    }

    public function addtask(Request $request){
        $item = DB::table('items')
        ->insert(['name' => $request->name,
        'status' => $request->status,
        'startday' => $request->startday,
        'endday' => $request->endday,
        'quantity' => $request->quantity,
        'timeoutwin' => $request->timeoutwin,
        'timeoutNwin' => $request->timeoutNwin,
        'winpostion' => $request->winpostion,
        'Nwinpostion' => $request->Nwinpostion,
        'sessionreset' => $request->sessionreset,
        'typo_id' => $request->typo_id]);
        return response()->json($item, 200);
    }

    public function deletetask(Item $item)
    {
        $item->delete();
        $items = Item::orderBy('id', 'desc')->get();

        return response()->json($items, 200);
    }

    public function updatetask(Request $request, $id)
    {
        //$data = $request->all();
        $item = DB::table('items')
              ->where('id', $id)
              ->update(['name' => $request->name,
              'status' => $request->status,
              'startday' => $request->startday,
              'endday' => $request->endday,
              'quantity' => $request->quantity,
              'timeoutwin' => $request->timeoutwin,
              'timeoutNwin' => $request->timeoutNwin,
              'winpostion' => $request->winpostion,
              'Nwinpostion' => $request->Nwinpostion,
              'sessionreset' => $request->sessionreset,
              'typo_id' => $request->typo_id]);
        // $item = Item::find($id);
        // $item->name = $request->name;
        // $item->status = $request->status;
        // $item->startday = $request->startday;
        // $item->endday = $request->endday;
        // $item->quantity = $request->quantity;
        // $item->timeoutwin = $request->timeoutwin;
        // $item->timeoutNwin = $request->timeoutNwin;
        // $item->winpostion = $request->winpostion;
        // $item->Nwinpostiton = $request->Nwinpostiton;
        // $item->sessionreset = $request->sessionreset;
        // $item->typo_id = $request->typo_id;
        // $item->save();
        // $item->update($data);

        return response()->json($item, 200);
    }
}
