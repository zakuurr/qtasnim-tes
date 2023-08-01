//import useState
import { useState, useEffect } from 'react';

//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api';

export default function TransaksiCreate() {

    const [tgl, setTgl] = useState('');
    const [qty, setQty] = useState([]);
    const [barang, setBarang] = useState('');

    const [barangList, setBarangList] = useState([{'nama_barang':'','id':''}])
  

   
//state validation
        const [errors, setErrors] = useState([]);

//useNavigate
const navigate = useNavigate();

//define method
const fetchDataBarang = async () => {

    //fetch data from API with Axios
    await api.get('/api/barang')
        .then(response => {
            
            //assign response data to state "posts"
            setBarangList(response.data.data.data);
        })

        
    
}
        useEffect(() =>{
       fetchDataBarang();
    }, [])

    const handleChange = (event) =>{
        setBarang(event.target.value);
    }


    const storeBarang = async (e) => {
    e.preventDefault();
    
    //init FormData
    const formData = new FormData();

    //append data
    formData.append('tgl_transaksi', tgl);
    formData.append('id_barang', barang);
    formData.append('qty', qty);
    
    //send data with API
    await api.post('/api/transaksi', formData)
        .then(() => {
            
            //redirect to posts index
            navigate('/transaksi');

        })
        .catch(error => {
            
            //set errors response to state "errors"
            setErrors(error.response.data);
        })
}


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storeBarang}>
                            
                            

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Tanggal Transaksi</label>
                                    <input type="date" className="form-control" onChange={(e) => setTgl(e.target.value)} placeholder=""/>
                                    {
                                        errors.tgl && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.tgl[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Barang</label>
                                     <select className="form-control" value={barang} onChange={handleChange}>
              <option value="">Pilih Barang</option>

        {barangList.map(company => (
              <option value={company.id} key={company.id} >{company.nama_barang}</option>
    
              ))
              }

          </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Qty</label>
                                    <input type="text" className="form-control" onChange={(e) => setQty(e.target.value)} placeholder=""/>
                                    {
                                        errors.qty && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.qty[0]}
                                            </div>
                                        )
                                    }
                                </div>

                               
                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}