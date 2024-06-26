import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fetchproducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetchproducts");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Products</h2>
      <div className="row">
        {products.map(product => (
          <div key={product._id} className="col-md-4 mb-3">
            <div className="card">
              <img src={product.img_url} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Category: {product.category}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Merchant: {product.merchant}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fetchproducts;
