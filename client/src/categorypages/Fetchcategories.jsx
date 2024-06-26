import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'; // Import Carousel from react-bootstrap
import './Fetchcategories.css';
import leftarrow from '../assets/new.png'
import rightarrow from '../assets/right.png'

const Fetchcategories = () => {
  const [categories, setCategories] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetchData();
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetchdeals");
      setDeals(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetchcategories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mt-4 text-center">
      <div className='something'>
  <p className="d-inline-block" style={{ color: 'black', fontWeight: 400, fontSize: '30px' }}>HOT DEALS</p>

  <Carousel interval={1500} indicators={false} controls={true} pauseOnHover={true} prevIcon={<img src={leftarrow} alt="" height="35px" />} nextIcon={<img src={rightarrow} alt="" height="35px" />}>
    {chunkArray(deals, 6).map((chunk, index) => (
      <Carousel.Item key={index}>
        <div className="myrow">
          {chunk.map((deal) => (
            <div key={deal._id} className="col-md-2 mb-3">
              <Link to={`/productdisplay/${deal.shirt_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ width: '181px', height: "280px" }}>
                  <img src={deal.img_url} className="card-img-top" alt={deal.name} style={{ width: '180px', height: '200px' }} />
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: 'black', fontSize: '15px' }}>{deal.name}</h5>
                    <div style={{ display: 'inline' }}>
                      <p className="card-text" style={{ marginRight: '8px', display: 'inline', fontWeight: '700' }}>₹{deal.discount_price}</p>
                      <p className="card-text" style={{ display: 'inline', fontSize: '15px' }}>M.R.P: <span style={{ textDecoration: 'line-through' }}>{deal.mrp_price}</span></p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Carousel.Item>
    ))}
  </Carousel>
</div>

      <br></br>
      <div className='nothing'>
        <p className="d-inline-block" style={{ color: 'black', fontWeight: 400, fontSize: '30px' }}>SHOP BY CATEGORY</p>
        <div className="myrow">
          {categories.map((category, index) => (
            <div key={category._id} className="col-md-4 mb-3">
              <Link to={`/${category.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ width: index === 17 ? '230px' : '200px', height: "280px" }}>
                  <img src={category.img_url} className="card-img-top" alt={category.name} style={{ width: '199px', height: '200px' }} />
                  <div className="card-body">
                    <h5 className="card-title" style={{fontWeight:'550',color:'gray'}}>{category.name.toUpperCase()}</h5>
                    <p className="card-text" style={{color:'gray'}}>{category.description.toUpperCase()}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export default Fetchcategories;
