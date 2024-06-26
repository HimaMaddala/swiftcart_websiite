import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Pants = () => {
  const [pants, setPants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pants");
      setPants(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Pants</h2>
      <div className="row">
        {pants.map(pant => (
          <div key={pant._id} className="col-md-4 mb-3">
              <div className="card" style={{ width: '250px', height: "300px" }}>
                <img src={pant.img_url} className="card-img-top" alt={pant.name} style={{ width: '250px', height: '200px' }} />
                <div className="card-body">
                  <h5 className="card-title">{pant.name}</h5>
                  <p className="card-text">Brand: {pant.brand}</p>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pants;
