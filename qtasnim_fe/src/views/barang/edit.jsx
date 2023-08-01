//import useState
import { useState, useEffect } from 'react';

//import useNavigate
import { useNavigate, useParams } from 'react-router-dom';

//import API
import api from '../../api';

export default function BarangEdit() {

    //define state
    const [barang, setBarang] = useState('');
    const [stok, setStok] = useState('');
    const [jenis, setJenis] = useState('');

    const [jenisList, setJenisList] = useState([{'nama_jenis':'','id':''}])
    // const [content, setContent] = useState('');

    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //destruct ID
    const { id } = useParams();

    const fetchDataBarang = async () => {

        //fetch data from API with Axios
        await api.get('/api/jenis-barang')
            .then(response => {
                
                //assign response data to state "posts"
                setJenisList(response.data.data.data);
            })
    
            
        
    }
    
    //method fetchDetailPost
    const fetchDetailPost = async () => {
        
        //fetch data
        await api.get(`/api/barang/${id}`)
            .then(response => {
                
                //assign to state
                setBarang(response.data.data.nama_barang);
                setStok(response.data.data.stok_barang);
                setJenis(response.data.data.id_jenis_barang);
            })
    }

    const handleChange = (event) =>{
        setJenis(event.target.value);
    }
    //hook useEffect
    useEffect(() => {
        
        //call method "fetchDetailPost"
        fetchDetailPost();
        fetchDataBarang();

    }, []);

    //method update post
    const updatePost = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        formData.append('nama_barang', barang);
        formData.append('stok_barang', stok);
        formData.append('id_jenis_barang', jenis);
        formData.append('_method', 'PUT')

        //send data with API
        await api.post(`/api/barang/${id}`, formData)
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
                            <form onSubmit={updatePost}>
                            
                    

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama Barang</label>
                                    <input type="text" className="form-control" value={barang} onChange={(e) => setBarang(e.target.value)} placeholder="Title Post"/>
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
                                    <input type="text" className="form-control" value={stok} onChange={(e) => setStok(e.target.value)} placeholder="Title Post"/>
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


                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}