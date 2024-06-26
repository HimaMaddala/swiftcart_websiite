import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cartpage.css';
import { Dropdown } from 'react-bootstrap';
import { GeoAltFill } from 'react-bootstrap-icons';

const Cartpage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/fetchcart');
        setCartItems(response.data);
        // Initialize selectedItems to select all items by default
        const initialSelectedItems = {};
        response.data.forEach((_, index) => {
          initialSelectedItems[index] = true;
        });
        setSelectedItems(initialSelectedItems);
        // Initialize selectedQuantities with quantities fetched from the database
        const initialQuantities = {};
        response.data.forEach((item, index) => {
          initialQuantities[index] = item.quantity; // Assuming the quantity field is present in the database response
        });
        setSelectedQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);


  const handleRemoveFromCart = async (itemId) => {
    try {
      // Remove the item from the database
      await axios.delete(`http://localhost:3001/removefromcart/${itemId}`);
      alert('Item removed from cart!');

      // Update the cartItems state by filtering out the removed item
      setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item from cart. Please try again.');
    }
  };

  const handleProceedToBuy = async () => {
    // const currentDate = new Date();
    // const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;

    const currentDate = new Date();
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear();
const category_name = "shirts"

const formattedDate = `${day}-${month}-${year}`;
 

    const selectedOrders = cartItems.reduce((orders, item, index) => {
      if (selectedItems[index]) {
        orders.push({
          product_id: item.product_id,
          img_url: item.img_url,
          name: item.name,
          size: item.size,
          merchant:item.merchant,
          quantity: selectedQuantities[index],
          price: item.price,
          total_price: item.price * selectedQuantities[index],
          order_date: formattedDate,
          category:category_name
        });
      }
      return orders;
    }, []);

    try {
      await axios.post('http://localhost:3001/placeorder', selectedOrders);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleCheckboxChange = (index) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleSelectAll = () => {
    const selectAllState = !Object.values(selectedItems).every(item => item);
    const newSelectedItems = {};
    cartItems.forEach((_, index) => {
      newSelectedItems[index] = selectAllState;
    });
    setSelectedItems(newSelectedItems);
  };

  const handleQuantitySelect = (index, quantity) => {
    setSelectedQuantities(prevState => ({
      ...prevState,
      [index]: quantity
    }));
  };

  const totalPrice = cartItems.reduce((total, item, index) => {
    if (selectedItems[index]) {
      const totalItemPrice = item.price * selectedQuantities[index];
      return total + totalItemPrice;
    }
    return total;
  }, 0);

  return (
    <div className="container">
      <div className='entire-page'>
        <div className="left-div-container">
          <h1>Cart</h1>
          <button onClick={handleSelectAll} style={{border: '3px solid white'}}>
  {Object.values(selectedItems).every(item => item) ? 'Deselect All' : 'Select All'}
</button>

<br></br>
          <br></br>
          {cartItems.map((item, index) => (
            <div key={index} className='left-div'>
              <div className='checkbox-wrapper'>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(index)}
                  checked={selectedItems[index] || false}
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
              <div className='left-div-img'>
                <img src={item.img_url} className="card-img-top" alt={item.name} width="180px" height="180px" />
              </div>
              <div className='left-div-body-text' style={{ lineHeight: '0.5' }}>
                <p style={{ color: 'Black', fontWeight: 600 }}>{item.name}</p>
                <p style={{ color: 'green', fontWeight: 600 }}>In stock</p>
                <p>Eligible for FREE shipping</p>
                <p><span style={{ color: 'Black', fontWeight: 600 }}>Size:  </span>{item.size}</p>
                <p><span style={{ color: 'Black', fontWeight: 600 }}>Color:  </span>{item.color}</p>
                <div className='productdisplay-right-quantity'>
                  <Dropdown className="custom-dropdown">
                    <Dropdown.Toggle variant="success" id={`dropdown-basic-${index}`} className="quantity-dropdown-toggle">
                      {selectedQuantities[index] ? selectedQuantities[index] : 'Quantity'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleQuantitySelect(index, 1)}>1</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleQuantitySelect(index, 2)}>2</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleQuantitySelect(index, 3)}>3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <br></br>
                  <button type="button" className="button-82-pushable custom-btn2" style={{}} onClick={() => handleRemoveFromCart(item._id)}>
                    <span className="button-82-shadow"></span>
                    <span className="button-82-edge"></span>
                    <span className="button-82-front text">
                      Remove
                    </span>
                  </button>
                </div>
              </div>
              <div className='left-div-price'>
                <p style={{ color: 'Black', fontWeight: 600 }}>Price: ₹{item.price}</p>
                <p style={{ color: 'Black', fontWeight: 600 }}>Total price: ₹{item.price * selectedQuantities[index]}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="right-div">
          <div  className="right-div-inner" style={{marginTop:20}}>
            <p style={{ color: 'black', fontWeight: 600 }}>Cart orders summary</p>
            <p>Total Price: ₹{totalPrice}</p>
            <button type="button" className="button-82-pushable custom-btn2" style={{ width: '80%' }} onClick={handleProceedToBuy}>
              <span className="button-82-shadow"></span>
              <span className="button-82-edge"></span>
              <span className="button-82-front text">
                Proceed to Buy
              </span>
            </button>
            <p style={{ color: 'rgb(0, 113, 133)', fontWeight: 600 }}>FREE delivery available</p>

            <p>5th March Saturday</p>
            <p style={{ color: 'rgb(0, 113, 133)', fontWeight: 600 }}>
              <GeoAltFill />Delivering to KITS College,Boys Hostel 506001</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;
