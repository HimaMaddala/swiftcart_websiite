import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Productdisplay.css';
import { Dropdown } from 'react-bootstrap';
import { GeoAltFill } from 'react-bootstrap-icons';
import CustomerReviewsSection from '../reviewpages/Fetchrreviews';
import Footer from '../Footer';
import deliveryicon from '../assets/deliveryicon.png';

const Productdisplay = () => {
  const { id } = useParams();
  const [shirtDetails, setShirtDetails] = useState(null);
  const [matchingPants, setMatchingPants] = useState(null);
  const [matchingShoes, setMatchingShoes] = useState(null);
  const [matchingWatches, setMatchingWatches] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchShirtDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/shirts/${id}`);
        setShirtDetails(response.data);
        if (response.data.matching_pants_id) {
          const pantsResponse = await axios.get(`http://localhost:3001/pants/${response.data.matching_pants_id}`);
          setMatchingPants(pantsResponse.data);
        }
        if (response.data.matching_shoes_id) {
          const shoesResponse = await axios.get(`http://localhost:3001/shoes/${response.data.matching_shoes_id}`);
          setMatchingShoes(shoesResponse.data);
        }
        if (response.data.matching_watches_id) {
          const watchesResponse = await axios.get(`http://localhost:3001/watches/${response.data.matching_watches_id}`);
          setMatchingWatches(watchesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching shirt details:", error);
      }
    };

    fetchShirtDetails();
  }, [id]);

  if (!shirtDetails) {
    return <div>Loading...</div>;
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  const handleQuantitySelect = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleAddToCart = async () => {
    try {
      const cartItem = {
        product_id: shirtDetails._id,
        name: shirtDetails.name,
        img_url: shirtDetails.img_url[0],
        brand: shirtDetails.brand,
        price: shirtDetails.price,
        color: shirtDetails.color,
        quantity: selectedQuantity,
        merchant: shirtDetails.merchant,
        size: selectedSize,
        amount: selectedQuantity * shirtDetails.price
      };

      await axios.post('http://localhost:3001/cart', cartItem);
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert('Failed to add item to cart. Please try again.');
    }
  };
  return (
    <div className='body-main'>
      <div className='productdisplay'>
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            {shirtDetails.img_url.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => handleImageClick(index)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
          <div className="productdisplay-img">
            <img
              className='productdisplay-main-img'
              src={shirtDetails.img_url[selectedImageIndex]}
              alt={shirtDetails.name}
              width=""
              height=""
            />
          </div>
        </div>
        <div className="productdisplay-right">
          <div className='productdisplay-right-text'>
            <h2>{shirtDetails.brand}</h2>
            <h3>{shirtDetails.name}</h3>
            <div className="line"></div>
            <h4><span style={{ fontSize: 20 }}>₹</span> {shirtDetails.price}</h4>
            <p>Inclusive of all taxes</p>
            <div className="line"></div>
            <div className='flex-icons'>
              <div style={{ marginLeft: '2px', marginRight: '20px' }}>

                <img src='https://static.thenounproject.com/png/853919-200.png' width='40px' height='40px' alt='returns-icon' style={{ marginLeft: '25px' }} />
                <p>14 days Return</p>
              </div>
              <div style={{ marginRight: '20px' }}>
                <img src='https://icon-library.com/images/pay-icon-png/pay-icon-png-10.jpg' width='40px' height='40px' alt='cod-icon' style={{ marginLeft: '25px' }} />
                <p>Pay on Delivery</p>
              </div>
              <div>
                <img src="https://www.freeiconspng.com/thumbs/shipping-icon/shipping-icon-1.png" width='40px' height='40px' alt='free-shipping-icon' style={{ marginLeft: '25px' }} />
                <p>Free Delivery</p>
              </div>
            </div>
            <div className="line"></div>
            <div className='productdisplay-right-description'>
              <p style={{ color: 'Brown', fontWeight: 600 }}>Description</p>
              High Definition Print - Using the highest quality solvents and colors combines with fully automated machines, we ensure our t-shirts have razor-sharp prints that highlight every single detail
            </div>
            <div className='productdisplay-right-size'>
              <h5>Select size</h5>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedSize ? selectedSize : 'Size'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSizeSelect('M')}>M</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSizeSelect('L')}>L</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSizeSelect('XL')}>XL</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className='productdisplay-right-quantity'>
              {shirtDetails.quantity === 0 && <p>out of <span style={{ color: 'black', fontWeight: 500 }}>STOCK</span>,available in few days</p>}

              <h5>Select Quantity</h5>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedQuantity ? selectedQuantity : 'Quantity'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleQuantitySelect(1)}>1</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleQuantitySelect(2)}>2</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleQuantitySelect(3)}>3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <p>Color: {shirtDetails.color}</p>
            <div className='productdisplay-right-product-details'>
              <table>
                <tr>
                  <td><strong>Product Details</strong></td>
                </tr>
                <tr>
                  <td>Fabric</td>
                  <td>{shirtDetails.fabric}</td>
                </tr>
                <tr>
                  <td>Fit</td>
                  <td>{shirtDetails.fit}</td>
                </tr>
                <tr>
                  <td>Collar</td>
                  <td>{shirtDetails.collar}</td>
                </tr>
              </table>

            </div>
          </div>
        </div>
        <div className="vertical-rect">
          <div className='vertical-rect-inner'>
            <h4><span style={{ fontSize: 20 }}>₹</span> {shirtDetails.price}</h4>
            <p style={{ color: 'grey', fontWeight: 600 }}>FREE delivery available</p>

            <h5>5th March Saturday</h5>
            <p style={{ color: 'black', fontWeight: 600 }}>
              <GeoAltFill />Delivering to KITS College,Boys Hostel 506001</p>
            <p style={{ color: 'green', fontWeight: 600 }}>In stock</p>

            <div className='mikmik'>
            <p>Ships from <span style={{ color: 'Brown', fontWeight: 600 }}>Swift Cart</span></p>
            <p>Sold by <span style={{ color: 'Brown', fontWeight: 600 }}>{shirtDetails.merchant}</span></p>
            </div>
            <div class="button-container-owndiv">
              <button className="button-82-pushable" role="button" onClick={handleAddToCart}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                  Add to Cart
                </span>
              </button>
              <button className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                  Buy Now
                </span>
              </button>
            </div>

            <br></br>
            <p style={{ color: 'black', fontWeight: 600 }}>Fastest Delivery by Friday Available</p>
          </div>
        </div>
      </div>
      <div className='matching-products-container'>
  {matchingPants && (
    <div className='matching-products-div'>
      <div className='content-work'>
        <div className='matching-items'>
          <img src={matchingPants.img_url} alt={matchingPants.name} width="200px" height="200px" />
          <div className='matching-items-details' style={{ lineHeight: '0.5' }}>
            <br></br>
            <p>{matchingPants.name}</p>
            <p>{matchingPants.brand}</p>
            <p style={{ color: 'Brown', fontWeight: 600 }}><span style={{ fontSize: 15 }}>₹</span>{matchingPants.price}</p>
          </div>
        </div>
      </div>
    </div>
  )}

  {matchingShoes && (
    <div className='matching-products-div'>
      <div className='content-work'>
        <div className='matching-items'>
          <img src={matchingShoes.img_url} alt={matchingShoes.name} width="200px" height="200px" />
          <div className='matching-items-details' style={{ lineHeight: '0.5' }}>
            <br></br>
            <p>{matchingShoes.name}</p>
            <p>{matchingShoes.brand}</p>
            <p style={{ color: 'Brown', fontWeight: 600 }}><span style={{ fontSize: 15 }}>₹</span>{matchingShoes.price}</p>
          </div>
        </div>
      </div>
    </div>
  )}

  {matchingWatches && (
    <div className='matching-products-div'>
      <div className='content-work'>
        <div className='matching-items'>
          <img src={matchingWatches.img_url} alt={matchingWatches.name} width="200px" height="200px" />
          <div className='matching-items-details' style={{ lineHeight: '0.5' }}>
            <br></br>
            <p>{matchingWatches.name}</p>
            <p>{matchingWatches.brand}</p>
            <p style={{ color: 'Brown', fontWeight: 600 }}><span style={{ fontSize: 15 }}>₹</span>{matchingWatches.price}</p>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

<div className='customer-reviews'>
        <h2>Customer Reviews</h2>
          <CustomerReviewsSection/>
      </div>

    </div>
  );
};

export default Productdisplay;
