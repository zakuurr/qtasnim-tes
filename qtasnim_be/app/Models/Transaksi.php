<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksi';
    protected $guarded = '';
    public function barang()
    {
        return $this->belongsTo(Barang::class, 'id_barang', 'id')->select(['id', 'nama_barang','stok_barang']);
    }


}
