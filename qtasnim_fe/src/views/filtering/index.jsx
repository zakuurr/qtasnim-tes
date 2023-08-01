//import useState dan useEffect
import { useState, useEffect } from 'react';

//import api
import api from '../../api';

//import Link
import { Link } from 'react-router-dom';

export default function Filtering() {

    //ini state
    const [transaksi, setTransaksi] = useState([]);
    
    
     //define method
     const fetchDataJenis = async () => {

        //fetch data from API with Axios
        await api.get('/api/transaksi/filtering')
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

     

    return (
        <div className="container mt-5 mb-5">
        <div className="row">
            <div className="col-md-12">
            
                <div className="card border-0 rounded shadow">
                    <div className="card-body">
                    <table border="0" cellspacing="5" cellpadding="5">
        <tbody><tr>
            <td>Minimum date:</td>
            <td><input type="date" id="min" name="min"></input></td>
        </tr>
        <tr>
            <td>Maximum date:</td>
            <td><input type="date" id="max" name="max"></input></td>
        </tr>
    </tbody></table>
                        <table className="table table-bordered table-responsive" id='myTable'>
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Jenis Barang</th>
                                    <th scope="col">Jumlah Terjual</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transaksi.length > 0
                                        ?   transaksi.map((barang, index) => (
                                                <tr key={ index }>
                                                    <td>{index + 1}</td>
                                                    <td>{ barang.nama_jenis }</td>
                                                    <td>{ barang.qty }</td>
                                                  
                                                  
                                                </tr>
                                            ))

                                        :   <tr>
                                                <td colSpan="3" className="text-center">
                                                    <div className="alert alert-danger mb-0">
                                                        Data Belum Tersedia!
                                                    </div>
                                                </td>
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