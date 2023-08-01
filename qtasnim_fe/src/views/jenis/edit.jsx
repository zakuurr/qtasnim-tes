//import useState
import { useState, useEffect } from 'react';

//import useNavigate
import { useNavigate, useParams } from 'react-router-dom';

//import API
import api from '../../api';

export default function JenisEdit() {

    //define state
    const [jenis, setJenis] = useState('');


    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //destruct ID
    const { id } = useParams();

   
    
    //method fetchDetailPost
    const fetchDetailPost = async () => {
        
        //fetch data
        await api.get(`/api/jenis-barang/${id}`)
            .then(response => {
                
                //assign to state
                setJenis(response.data.data.nama_jenis);
               
            })
    }
    //hook useEffect
    useEffect(() => {
        
        //call method "fetchDetailPost"
        fetchDetailPost();
      
    }, []);

    //method update post
    const updatePost = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        formData.append('nama_jenis', jenis);
 
        formData.append('_method', 'PUT')

        //send data with API
        await api.post(`/api/jenis-barang/${id}`, formData)
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
                            <form onSubmit={updatePost}>
                            
                    

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama Jenis Barang</label>
                                    <input type="text" className="form-control" value={jenis} onChange={(e) => setJenis(e.target.value)} placeholder="Title Post"/>
                                    {
                                        errors.jenis && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.jenis[0]}
                                            </div>
                                        )
                                    }
                                </div>

                    


                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}