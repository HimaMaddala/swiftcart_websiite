import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './Createproduct.css'

const Createproduct = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [collar, setCollar] = useState('');
  const [price, setPrice] = useState('');
  const [sleeves, setSleeves] = useState('');
  const [quantity, setQuantity] = useState('');
  const [merchant, setMerchant] = useState('');
  const [fabric, setFabric] = useState('');
  const [fit, setFit] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const imgUrls = [image1, image2, image3, image4];
    if (category === 'shirts') {
      axios.post("http://localhost:3001/createshirts", {name, img_url: imgUrls, brand, price, color, quantity, merchant, fabric, fit, sleeves, collar })
        .then(result => {
          console.log(result);
          // navigate('/');
        })
        .catch(err => {
          console.error("Error creating shirt:", err);
        });
    }
  };

  const handleCategoryChange = (eventKey) => {
    setCategory(eventKey);
  };

  return (
    <div className='d-flex justify-content-center align-items-center page-bckg'>
      <Dropdown onSelect={handleCategoryChange}>
        <Dropdown.Toggle variant="dark" id="categoryDropdown">
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Select Category'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="shirts">Shirts</Dropdown.Item>
          <Dropdown.Item eventKey="pants">Pants</Dropdown.Item>
          <Dropdown.Item eventKey="shoes">Shoes</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Create Product</h2>
          {category === 'shirts' && (
            <>
              <div className='mb-2'>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder='Enter Name' 
                  className='form-control'
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div>
                <h2>Enter Shirt Images</h2>
                <div className='mb-2'>
                  <label htmlFor="image1">Image 1 URL</label>
                  <input type="text" id="image1" placeholder='Enter Image URL' className='form-control'
                    value={image1} onChange={(e) => setImage1(e.target.value)} />
                </div>
                <div className='mb-2'>
                  <label htmlFor="image2">Image 2 URL</label>
                  <input type="text" id="image2" placeholder='Enter Image URL' className='form-control'
                    value={image2} onChange={(e) => setImage2(e.target.value)} />
                </div>
                <div className='mb-2'>
                  <label htmlFor="image3">Image 3 URL</label>
                  <input type="text" id="image3" placeholder='Enter Image URL' className='form-control'
                    value={image3} onChange={(e) => setImage3(e.target.value)} />
                </div>
                <div className='mb-2'>
                  <label htmlFor="image4">Image 4 URL</label>
                  <input type="text" id="image4" placeholder='Enter Image URL' className='form-control'
                    value={image4} onChange={(e) => setImage4(e.target.value)} />
                </div>
              </div>
              <div className='mb-2'>
                <label htmlFor="brand">Brand</label>
                <select id="brand" className='form-control' value={brand} onChange={(e) => setBrand(e.target.value)}>
                  <option value="">Select Brand</option>
                  <option value="roadster">Roadster</option>
                  <option value="twills">Twills</option>
                  <option value="indian garage">Indian Garage</option>
                  <option value="peter england">Peter England</option>
                </select>
              </div>

              <div className='mb-2'>
                <label htmlFor="collar">Collar</label>
                <select id="collar" className='form-control' value={collar} onChange={(e) => setCollar(e.target.value)}>
                  <option value="">Select Collar</option>
                  <option value="spread">Spread</option>
                  <option value="straight">Straight</option>
                  <option value="banded">Banded</option>
                  <option value="curved">Curved</option>
                  <option value="round">Round</option>
                </select>
              </div>
              <div className='mb-2'>
                <label htmlFor="color">Color</label>
                <select id="color" className='form-control' value={color} onChange={(e) => setColor(e.target.value)}>
                  <option value="">Select Color</option>
                  <option value="Black">Black</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="White">White</option>
                  <option value="Red">Red</option>
                </select>
              </div>


              <div className='mb-2'>
                <label htmlFor="sleeves">Sleeves</label>
                <select id="sleeves" className='form-control' value={sleeves} onChange={(e) => setSleeves(e.target.value)}>
                  <option value="">Select Sleeves</option>
                  <option value="full sleeves">Full Sleeves</option>
                  <option value="half">Half sleeves</option>
                  <option value="three fourth">Three Fourth sleeves</option>
                </select>
              </div>

              <div className='mb-2'>
                <label htmlFor="price">Price</label>
                <input type="text" id="price" placeholder='Enter Price' className='form-control'
                  value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className='mb-2'>
                <label htmlFor="quantity">Quantity</label>
                <input type="text" id="quantity" placeholder='Enter Quantity' className='form-control'
                  value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <div className='mb-2'>
                <label htmlFor="merchant">Merchant</label>
                <input type="text" id="merchant" placeholder='Enter Merchant' className='form-control'
                  value={merchant} onChange={(e) => setMerchant(e.target.value)} />
              </div>
              <div className='mb-2'>
                <label htmlFor="fabric">Fabric</label>
                <select id="fabric" className='form-control' value={fabric} onChange={(e) => setFabric(e.target.value)}>
                  <option value="">Select Fabric</option>
                  <option value="cotton">Cotton</option>
                  <option value="polyester">Polyester</option>
                  <option value="cotton blend">Cotton Blend</option>
                  <option value="denim">Denim</option>
                  <option value="velvet">Velvet</option>
                </select>
              </div>

              <div className='mb-2'>
                <label htmlFor="fit">Fit Type</label>
                <select id="fit" className='form-control' value={fit} onChange={(e) => setFit(e.target.value)}>
                  <option value="">Select Fit Type</option>
                  <option value="slim fit">Slim Fit</option>
                  <option value="regular fit">Regular Fit</option>
                  <option value="round fit">Round Fit</option>
                </select>
              </div>
            </>
          )}
          <button type="submit" className='btn btn-success'>Create</button>
        </form>
      </div>
    </div>
  );
};

export default Createproduct;
