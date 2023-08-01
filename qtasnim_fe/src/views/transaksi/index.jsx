//import useState dan useEffect
import { useState, useEffect } from 'react';

//import api
import api from '../../api';

//import Link
import { Link } from 'react-router-dom';

export default function TransaksiIndex() {

    //ini state
    const [transaksi, setTransaksi] = useState([]);
    
    
     //define method
     const fetchDataJenis = async () => {

        //fetch data from API with Axios
        await api.get('/api/transaksi')
            .then(response => {
                
                //assign response data to state "posts"
                setTransaksi(response.data.data);
            })

            
        
    }
    //run hook useEffect
    useEffect(() => {
        
        //call method "fetchDataBarang"
        fetchDataJenis();

    }, []);

     //method deletePost
     const deletePost = async (id) => {
        
        //delete with api
        await api.delete(`/api/transaksi/${id}`)
            .then(() => {
                
                //call method "fetchDataPosts"
                fetchDataJenis();

            })
    }

    return (
        <div className="container mt-5 mb-5">
        <div className="row">
            <div className="col-md-12">
                <Link to="/transaksi/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW TRANSAKSI</Link>
                <div className="card border-0 rounded shadow">
                    <div className="card-body">
                        <table className="table table-bordered table-responsive" id='myTable'>
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Barang</th>
                                    <th scope="col">Stok</th>
                                    <th scope="col">Jumlah Terjual</th>
                                    <th scope="col">Tanggal Transaksi</th>
                                    <th scope="col">Jenis Barang</th>
                                   
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transaksi.length > 0
                                        ?   transaksi.map((barang, index) => (
                                                <tr key={ index }>
                                                    <td>{index + 1}</td>
                                                    <td>{ barang.nama_barang }</td>
                                                    <td>{ barang.stok_barang }</td>
                                                    <td>{ barang.qty }</td>
                                                    <td>{ barang.tgl_transaksi }</td>
                                                    <td>{ barang.nama_jenis }</td>
                                                   
                                                    <td className="text-center">
                                                        
                                                        <Link to={`/transaksi/edit/${barang.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                        <button onClick={() => deletePost(barang.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                    </td>
                                                </tr>
                                            ))

                                        :   <tr>
                                                <td colSpan="20" className="text-center">
                                                    <div className="alert alert-danger mb-0">
                                                        Data Belum Tersedia!
                                                    </div>
                                                </td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                            </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}