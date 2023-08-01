//import useState dan useEffect
import { useState, useEffect } from 'react';

//import api
import api from '../../api';

//import Link
import { Link } from 'react-router-dom';
// import 'datatables.net-responsive-dt';

export default function BarangIndex() {
   
    //ini state
    const [barang, setBarang] = useState([]);
    
     //define method
     const fetchDataBarang = async () => {

        //fetch data from API with Axios
        await api.get('/api/barang')
            .then(response => {
                
                //assign response data to state "posts"
                setBarang(response.data.data.data);
            })

            
        
    }
    //run hook useEffect
    useEffect(() => {
        
        //call method "fetchDataBarang"
        fetchDataBarang();

    }, []);

     //method deletePost
     const deletePost = async (id) => {
        
        //delete with api
        await api.delete(`/api/barang/${id}`)
            .then(() => {
                
                //call method "fetchDataPosts"
                fetchDataBarang();

            })
    }

    return (
        <div className="container mt-5 mb-5">
        <div className="row">
            <div className="col-md-12">
                <Link to="/barang/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW BARANG</Link>
                <div className="card border-0 rounded shadow">
                    <div className="card-body">
                        <table className="table table-bordered table-responsive" id='myTable'>
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th scope="col">Nama Barang</th>
                                    <th scope="col">Stok Barang</th>
                                    <th scope="col">Jenis Barang</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    barang.length > 0
                                        ?   barang.map((barang, index) => (
                                                <tr key={ index }>
                                               
                                                    <td>{ barang.nama_barang }</td>
                                                    <td>{ barang.stok_barang }</td>
                                                    <td>{ barang.jenis_barang.nama_jenis }</td>
                                                    <td className="text-center">
                                                        
                                                        <Link to={`/barang/edit/${barang.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                        <button onClick={() => deletePost(barang.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                    </td>
                                                </tr>
                                            ))

                                        :   
                                        <tr>
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