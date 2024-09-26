import React, { useEffect, useState } from 'react';

const ClintOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch all orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await fetch('https://lapuniversbackend-production.up.railway.app/getallorders');
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Update the order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch('https://lapuniversbackend-production.up.railway.app/updateorderstatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status }),
      });

      const data = await response.json();
      if (data.success) {
        fetchOrders(); // Refresh orders after status update
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Client Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className='border p-4 mb-4'>
            <h2 className='text-lg font-semibold'>Order ID: {order._id}</h2>
            <p>User ID: {typeof order.userId === 'object' ? order.userId._id : order.userId}</p> {/* Check if userId is an object */}
            <p>Order Status: {order.status}</p>

            <div className='my-4'>
            <h3 className='font-bold'>Products:</h3>
            {order.products.map((prod, index) => (
              <div key={`${order._id}-${prod.productId || index}`} className='flex justify-between'>
                <p>Product ID: {prod.productId ? prod.productId.toString() : 'N/A'}</p> {/* Check for null */}
                <p>Quantity: {prod.quantity}</p>
              </div>
            ))}
          </div>


            {/* Dropdown for changing order status */}
            <select
              className='border p-2'
              value={order.status}
              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
            >
              <option value='Pending'>Pending</option>
              <option value='Ready to Ship'>Ready to Ship</option>
              <option value='On the Way'>On the Way</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default ClintOrders;
