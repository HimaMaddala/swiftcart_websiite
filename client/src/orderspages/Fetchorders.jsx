import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for dynamic routing
import './Fetchorders.css';

const Fetchproducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/fetchorders");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="container mt-4 mainmaindiv">
            <h2>Orders</h2>
            <div className="row">
                {products.map(product => (
                    <div key={product._id} className="col-md-4 mb-3">
                        <div className="card" style={{ width: '181px', height: "310px" }}>
                            <img src={product.img_url} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: 'grey', fontSize: '15px' }}>{product.name}</h5>
                                {/* <p className="card-text">Category: {product.category}</p>
                <p className="card-text">Price: ${product.price}</p> */}
                                {/* Wrap the 'Drop a review' link with Link component */}
                                <Link to={`/createreview/${product.product_id}`} className='createreview button-17' style={{ display: 'flex', alignItems: 'center', border: '1px solid black', padding: '3px', width: '155px' }}>
                                    <p className="card-text" style={{ marginLeft: '10px', marginTop: '15px', textDecoration: 'none' }}>Drop a review</p>
                                    <img src="https://cdn2.iconfinder.com/data/icons/pinpoint-action/48/redirect-512.png" style={{ width: '25px', marginLeft: '10px' }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Fetchproducts;
