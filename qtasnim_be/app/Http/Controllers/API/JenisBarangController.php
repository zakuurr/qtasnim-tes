<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\JenisBarang;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

class JenisBarangController extends Controller
{
    public function index(Request $request)
    {


        $id = $request->input('id');
        $limit = $request->input('limit', 6);
        $nama_jenis = $request->input('nama_jenis');


        if($id)
        {
            $jenis_barang = JenisBarang::find($id);

            if($jenis_barang)
                return ResponseFormatter::success($jenis_barang,'Data jenis barang berhasil diambil');
            else
                return ResponseFormatter::error(null,'Data jenis barang tidak ada', 404);
        }



        $jenisbarang = JenisBarang::latest();

        if($nama_jenis)
            $jenisbarang->where('nama_jenis', 'like', '%' . $nama_jenis .'%');


        return ResponseFormatter::success(
            $jenisbarang->paginate($limit),
            'Data list barang berhasil diambil'
        );



    }
    public function store(Request $request)
        {
            //define validation rules
            $validator = Validator::make($request->all(), [
                'nama_jenis'     => 'required',
            ]);

            //check if validation fails
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }


            //create barang
            $jenisbarang = JenisBarang::create([
                'nama_jenis'     => $request->nama_jenis,

            ]);

            //return response
            return ResponseFormatter::success($jenisbarang,'Data jenis barang berhasil ditambahkan');
        }

        public function show($id)
        {
            //find post by ID
            $jenisbarang = JenisBarang::find($id);

            //return single post as a resource

            return ResponseFormatter::success($jenisbarang,'Detail data barang');
        }

        public function update(Request $request, $id)
        {
            //define validation rules
            $validator = Validator::make($request->all(), [
                'nama_jenis'     => 'required'
            ]);

            //check if validation fails
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }


            //find barang by ID
            $jenisbarang = JenisBarang::find($id);



                $jenisbarang->update([
                    'nama_jenis'     => $request->nama_jenis,
                ]);

            //return response
            return ResponseFormatter::success($jenisbarang,'Jenis Barang Berhasil Di Ubah');
        }

        public function destroy($id)
        {

            //find post by ID
            $jenisbarang = JenisBarang::find($id);

            //delete post
            $jenisbarang->delete();

            //return response
            return ResponseFormatter::success($jenisbarang,'Jenis Barang Berhasil Di Hapus');
        }
}
