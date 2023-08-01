//import useState
import { useState } from 'react';

//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api';

export default function JenisCreate() {

    const [jenis, setJenis] = useState('');
  

   
//state validation
        const [errors, setErrors] = useState([]);

//useNavigate
const navigate = useNavigate();


    const storeBarang = async (e) => {
    e.preventDefault();
    
    //init FormData
    const formData = new FormData();

    //append data
    formData.append('nama_jenis', jenis);
    
    console.log(jenis);
    //send data with API
    await api.post('/api/jenis-barang', formData)
        .then(() => {
            
            //redirect to posts index
            navigate('/jenis');

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
                                    <label className="form-label fw-bold">Nama Jenis Barang</label>
                                    <input type="text" className="form-control" onChange={(e) => setJenis(e.target.value)} placeholder="Nama Jenis Barang"/>
                                    {
                                        errors.jenis && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.jenis[0]}
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