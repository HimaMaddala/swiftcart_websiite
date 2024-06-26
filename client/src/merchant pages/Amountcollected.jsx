import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Amountcollected = () => {
  const [shirtOrders, setShirtOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchShirtOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/orders-merchant');
        const merchantitems = response.data;
        const harrysShirtOrders = merchantitems.filter(order => order.merchant === 'merchant_harry');
        setShirtOrders(harrysShirtOrders);
        // Calculate total amount
        const sum = harrysShirtOrders.reduce((acc, order) => acc + order.total_price, 0);
        setTotalAmount(sum);
      } catch (error) {
        console.error("Error fetching merchant items:", error);
      }
    };
    fetchShirtOrders();
}, []);

return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Size</th>
          </tr>
        </thead>
        <tbody>
          {shirtOrders.map((order, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{order.name}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.total_price}</td>
              <td>{order.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Amount Collected {totalAmount}</p>
    </div>
  );
}

export default Amountcollected;