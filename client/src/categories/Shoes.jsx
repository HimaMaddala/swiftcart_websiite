import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../productpages/product_items.css';
import './Mensshirts.css';


const Shoes = () => {
  const [shirts, setShirts] = useState([]);
  const [filteredShirts, setFilteredShirts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const priceGap = 100;
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/shoes");
      setShirts(response.data);
      setFilteredShirts(response.data);
      extractFilters(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const extractFilters = (data) => {
    const uniqueBrands = Array.from(new Set(data.map(shirt => shirt.brand)));
    setBrands(uniqueBrands);

    const uniqueColors = Array.from(new Set(data.map(shirt => shirt.color)));
    setColors(uniqueColors);
  };

  const filterShirts = () => {
    let filtered = shirts.filter(shirt => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(shirt.brand)) {
        return false;
      }
      if (selectedColors.length > 0 && !selectedColors.includes(shirt.color)) {
        return false;
      }
      
      if (shirt.price < minPrice || shirt.price > maxPrice) { // Corrected price filtering
        return false;
      }
      return true;
    });

    // Apply sorting if sortOrder is set
    if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredShirts(filtered);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    if (event.target.checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleColorChange = (event) => {
    const color = event.target.value;
    if (event.target.checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter(c => c !== color));
    }
  };
 
  const handlePriceInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'min') {
      setMinPrice(parseInt(value));
    } else {
      setMaxPrice(parseInt(value));
    }
  };

  const handleRangeInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'min') {
      if (maxPrice - parseInt(value) < priceGap) {
        setMinPrice(maxPrice - priceGap);
      } else {
        setMinPrice(parseInt(value));
      }
    } else {
      if (parseInt(value) - minPrice < priceGap) {
        setMaxPrice(minPrice + priceGap);
      } else {
        setMaxPrice(parseInt(value));
      }
    }
  };

  useEffect(() => {
    filterShirts();
  }, [selectedBrands, selectedColors, minPrice, maxPrice, sortOrder]);

  return (
    <div className="maindivkey">
      <div className="filters">
        <h2 className='h2'>FILTERS</h2>
        <div className='filters-innerdiv'>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            style={{
              border: '1px solid #ccc', // Border color
              borderRadius: '5px', // Border radius
              padding: '5px', // Padding
              width: '200px', // Width
              boxSizing: 'border-box' // Make sure padding and border are included in the width
            }}
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>

          <div style={{ height: '1px', backgroundColor: 'grey' }}></div>
          <h3 className='h3'>PRICE</h3>
          <div className='price-filters-combined'>
            <div className="price-input">
              <div className="field">
                <span>Min</span>
                <input
                  type="number"
                  className="input-min"
                  name="min"
                  value={minPrice}
                  onChange={handlePriceInputChange}
                  style={{ height: '30px' }} // Adjust the height value as needed
                />

              </div>
              <div className="separator">-</div>
              <div className="field">
                <span>Max</span>
                <input
                  type="number"
                  className="input-max"
                  name="max"
                  value={maxPrice}
                  onChange={handlePriceInputChange}
                  style={{ height: '30px' }}
                />
              </div>
            </div>
          </div>
          <div style={{ height: '1px', backgroundColor: 'grey' }}></div>
          <div>
            <h3 className='h3'>BRAND</h3>
            {brands.map((brand, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  id={`brand_${index}`}
                  value={brand}
                  onChange={handleBrandChange}
                  style={{ borderRadius: '0', width: '16px', height: '16px', border: '1px solid #ccc' }}
                />

                <label htmlFor={`brand_${index}`} style={{ marginLeft: '5px' }}>{brand}</label>
              </div>
            ))}
          </div>

          <div style={{ height: '1px', backgroundColor: 'grey' }}></div>
          <div>
            <h3 className='h3'>COLOR</h3>{colors.map((color, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  id={`color_${index}`}
                  value={color}
                  onChange={handleColorChange}
                  style={{ borderRadius: '0', width: '16px', height: '16px', border: '1px solid #ccc' }}
                />
                <label htmlFor={`color_${index}`} style={{ marginLeft: '5px' }}>{color}</label>
              </div>
            ))}
          </div>
          <div style={{ height: '1px', backgroundColor: 'grey' }}></div>
          
        </div>
      </div>
      <div className="displaybody">
        <h2>Shoes</h2>
        <div className="row">
          {filteredShirts.map(shirt => (
            <div key={shirt._id} className="col-md-4-mb-3">
              <Link to={`/productdisplay/${shirt._id}`} className="card-link">
                <div className="card" style={{ width: '210px', height: "300px", borderRadius: '0px' }}>
                  <img src={shirt.img_url[0]} className="card-img-top" alt={shirt.name} style={{ width: '209px', height: '200px', borderRadius: '0px' }} />
                  <div className="card-body" style={{ textAlign: 'left' }}>
                    <h5 className="card-title" style={{ fontSize: '14px', color: 'gray' }}>{shirt.name}</h5>
                    <p className="card-text">{shirt.brand}</p>
                    <p className="card-text" style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'Assistant, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>Rs.{shirt.price}</p>
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

export default Shoes;
