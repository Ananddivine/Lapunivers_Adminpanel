import React from 'react'
import './Sidebar.css'
import {NavLink} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='Sidebar'>
    <NavLink to="/addproduct">
     <div className="sidebar-item">
        <img src={ add_product_icon} alt="" />
         <p>Add Product</p>
     </div>
   </NavLink>
   <NavLink to="/listproduct">
     <div className="sidebar-item">
        <img src={ list_product_icon} alt="" />
         <p>Product List</p>
     </div>
   </NavLink>
    </div>
  )
}

export default Sidebar;