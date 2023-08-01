<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Resources\BarangResource;
use App\Models\Barang;

//import Facade "Validator"
use Illuminate\Support\Facades\Validator;

class BarangController extends Controller
{

    public function index(Request $request)
{


    $id = $request->input('id');
    $limit = $request->input('limit', 6);
    $nama_barang = $request->input('nama_barang');


    if($id)
    {
        $barang = Barang::with('jenisBarang')->find($id);

        if($barang)
            return ResponseFormatter::success($barang,'Data barang berhasil diambil');
        else
            return ResponseFormatter::error(null,'Data barang tidak ada', 404);
    }



    $barang = Barang::with('jenisBarang');

    if($nama_barang)
        $barang->where('nama_barang', 'like', '%' . $nama_barang .'%');


    return ResponseFormatter::success(
        $barang->paginate($limit),
        'Data list barang berhasil diambil'
    );



}
public function store(Request $request)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'nama_barang'     => 'required',
            'stok_barang'   => 'required',
            'id_jenis_barang'   => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        //create barang
        $post = Barang::create([
            'nama_barang'     => $request->nama_barang,
            'stok_barang'     => $request->stok_barang,
            'id_jenis_barang'   => $request->id_jenis_barang,
        ]);

        //return response
        return ResponseFormatter::success($post,'Data barang berhasil ditambahkan');
    }

    public function show($id)
    {
        //find post by ID
        $barang = Barang::find($id);

        //return single post as a resource

        return ResponseFormatter::success($barang,'Detail data barang');
    }

    public function update(Request $request, $id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'nama_barang'     => 'required',
            'stok_barang'   => 'required',
            'id_jenis_barang'   => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        //find barang by ID
        $barang = Barang::find($id);



            $barang->update([
                'nama_barang'     => $request->nama_barang,
                'stok_barang'     => $request->stok_barang,
                'id_jenis_barang'   => $request->id_jenis_barang,
            ]);

        //return response
        return ResponseFormatter::success($barang,'Barang Berhasil Di Ubah');
    }

    public function destroy($id)
    {

        //find post by ID
        $barang = Barang::find($id);

        //delete post
        $barang->delete();

        //return response
        return ResponseFormatter::success($barang,'Barang Berhasil Di Hapus');
    }
}
