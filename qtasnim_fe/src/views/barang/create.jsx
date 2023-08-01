//import useState
import { useState,useEffect } from 'react';

//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api';

export default function BarangCreate() {

    const [barang, setBarang] = useState('');
    const [stok, setStok] = useState([]);
    const [jenis, setJenis] = useState('');

    const [jenisList, setJenisList] = useState([{'nama_jenis':'','id':''}])
//state validation
        const [errors, setErrors] = useState([]);

//useNavigate
const navigate = useNavigate();

//method store post
 //define method
 const fetchDataBarang = async () => {

    //fetch data from API with Axios
    await api.get('/api/jenis-barang')
        .then(response => {
            
            //assign response data to state "posts"
            setJenisList(response.data.data.data);
        })

        
    
}
        useEffect(() =>{
       fetchDataBarang();
    }, [])

    const handleChange = (event) =>{
        setJenis(event.target.value);
    }

    const storeBarang = async (e) => {
    e.preventDefault();
    
    //init FormData
    const formData = new FormData();

    //append data
    formData.append('nama_barang', barang);
    formData.append('stok_barang', stok);
    formData.append('id_jenis_barang', jenis);

    console.log(jenis);
    //send data with API
    await api.post('/api/barang', formData)
        .then(() => {
            
            //redirect to posts index
            navigate('/barang');

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
                                    <label className="form-label fw-bold">Nama Barang</label>
                                    <input type="text" className="form-control" onChange={(e) => setBarang(e.target.value)} placeholder="Nama Barang"/>
                                    {
                                        errors.barang && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.barang[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Stok Barang</label>
                                    <input type="text" className="form-control" onChange={(e) => setStok(e.target.value)} placeholder="Stok Barang"/>
                                    {
                                        errors.stok && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.stok[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Jenis Barang</label>
                                     <select className="form-control" value={jenis} onChange={handleChange}>
              <option value="">Pilih Jenis Barang</option>

        {jenisList.map(company => (
              <option value={company.id} key={company.id} >{company.nama_jenis}</option>
    
              ))
              }

          </select>
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