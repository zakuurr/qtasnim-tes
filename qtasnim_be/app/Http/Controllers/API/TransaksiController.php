<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TransaksiController extends Controller
{
    public function index(Request $request)
    {

        $id = $request->input('id');
        $limit = $request->input('limit', 6);
        $tgl_transaksi = $request->input('tgl_transaksi');


        if($id)
        {
            $transaksi = Transaksi::with('barang')->find($id);

            if($transaksi)
                return ResponseFormatter::success($transaksi,'transaksi barang berhasil diambil');
            else
                return ResponseFormatter::error(null,'Data transaksi tidak ada', 404);
        }



        // $transaksi = Transaksi::with('barang')->get();

          $transaksi = Transaksi::join('barang', 'barang.id', '=', 'transaksi.id_barang')
        ->join('jenis_barang', 'jenis_barang.id', '=', 'barang.id_jenis_barang')
        ->get(['transaksi.*','barang.id AS id_barang','barang.nama_barang','barang.stok_barang','jenis_barang.nama_jenis']);

        if($tgl_transaksi)
            $transaksi->where('tgl_transaksi', 'like', '%' . $tgl_transaksi .'%');


        return ResponseFormatter::success(
            $transaksi,
            'Data list transaksi berhasil diambil'
        );

    }
    public function store(Request $request)
        {
            //define validation rules
            $validator = Validator::make($request->all(), [
                'tgl_transaksi'     => 'required',
                'id_barang'     => 'required',
                'qty'     => 'required',
            ]);

            //check if validation fails
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }


            //create barang
            $transaksi = Transaksi::create([
                'tgl_transaksi'     => $request->tgl_transaksi,
                'id_barang'     => $request->id_barang,
                'qty'     => $request->qty,

            ]);

            $product = Barang::findOrfail($request->id_barang);
            $product->stok_barang -= $request->qty;


            return $product->save();
            //return response
            return ResponseFormatter::success($transaksi,'Data Transaksi berhasil ditambahkan');
        }

        public function destroy($id)
    {

        //find post by ID
        $transaksi = Transaksi::findOrfail($id);

        //delete post
        $transaksi->delete();

        //return response
        return ResponseFormatter::success($transaksi,'Transaksi Berhasil Di Hapus');
    }

    public function filtering(Request $request)
    {

        $id = $request->input('id');
        $limit = $request->input('limit', 6);
        $tgl_transaksi = $request->input('tgl_transaksi');


        // $transaksi = Transaksi::with('barang')->get();

        //   $transaksi = DB::select('SELECT barang.id, barang.nama_barang,sum(transaksi.qty) FROM `transaksi` INNER JOIN barang ON barang.id = transaksi.id_barang INNER JOIN jenis_barang ON jenis_barang.id = barang.id_jenis_barang GROUP BY transaksi.id_barang ORDER BY SUM(transaksi.qty) DESC, barang.nama_barang ASC');

          $transaksi = DB::table('transaksi')
            ->join('barang', 'barang.id', '=', 'transaksi.id_barang')
            ->join('jenis_barang', 'jenis_barang.id', '=', 'barang.id_jenis_barang')
            ->select(DB::raw('sum(transaksi.qty) as qty,jenis_barang.nama_jenis'))
            ->groupBy('jenis_barang.nama_jenis')
            ->orderByRaw('sum(transaksi.qty) DESC, jenis_barang.nama_jenis ASC')

            ->get();


        return ResponseFormatter::success(
            $transaksi,
            'Data list transaksi berhasil diambil'
        );

    }
}
