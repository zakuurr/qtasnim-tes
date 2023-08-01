//import react router dom
import { Routes, Route } from "react-router-dom";

//import view homepage
import Home from '../views/home.jsx';

//import view barang index
import BarangIndex from '../views/barang/index.jsx';
import JenisIndex from '../views/jenis/index.jsx';
import JenisCreate from '../views/jenis/create.jsx';
import JenisEdit from '../views/jenis/edit.jsx';

import TransaksiIndex from '../views/transaksi/index.jsx';
import TransaksiCreate from '../views/transaksi/create.jsx';
import TransaksiEdit from '../views/transaksi/edit.jsx';

//import view barang create
import BarangCreate from '../views/barang/create.jsx';

//import view barang edit
import BarangEdit from '../views/barang/edit.jsx';
import Filtering from '../views/filtering/index.jsx';

function RoutesIndex() {
    return (
        <Routes>

            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/posts" */}
            <Route path="/barang" element={<BarangIndex />} />

            {/* route "/posts/create" */}
            <Route path="/barang/create" element={<BarangCreate />} />

            {/* route "/posts/edit/:id" */}
            <Route path="/barang/edit/:id" element={<BarangEdit />} />

             {/* route "/posts" */}
            <Route path="/jenis" element={<JenisIndex />} />

            {/* route "/posts/create" */}
            <Route path="/jenis/create" element={<JenisCreate />} />

            {/* route "/posts/edit/:id" */}
            <Route path="/jenis/edit/:id" element={<JenisEdit />} />

  {/* route "/posts" */}
            <Route path="/transaksi" element={<TransaksiIndex />} />

            {/* route "/posts/create" */}
            <Route path="/transaksi/create" element={<TransaksiCreate />} />

            {/* route "/posts/edit/:id" */}
            <Route path="/transaksi/edit/:id" element={<TransaksiEdit />} />

            <Route path="/filtering" element={<Filtering />} />

        </Routes>
    )
}

export default RoutesIndex