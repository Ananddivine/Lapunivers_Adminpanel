import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/SideBar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/addProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import ClintOrders from '../../Components/Orders/ClintOrders'

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='Listproduct' element={<ListProduct />} />
          <Route path='Clintorders' element={<ClintOrders />} />
        </Routes>
    </div>
  )
}

export default Admin;