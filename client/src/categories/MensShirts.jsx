import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../productpages/product_items.css';
import './Mensshirts.css';


const Shirts = () => {
  const [shirts, setShirts] = useState([]);
  const [filteredShirts, setFilteredShirts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [fits, setFits] = useState([]);
  const [sleeves, setSleeves] = useState([]);
  const [collars, setCollars] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedFits, setSelectedFits] = useState([]);
  const [selectedSleeves, setSelectedSleeves] = useState([]);
  const [selectedCollars, setSelectedCollars] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const priceGap = 100;
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    paginateShirts();
  }, [shirts, currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/mensshirts");
      setShirts(response.data);
      setFilteredShirts(response.data);
      extractFilters(response.data);
      setTotalPages(Math.ceil(response.data.length / 5));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const paginateShirts = () => {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    setFilteredShirts(shirts.slice(startIndex, endIndex));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const extractFilters = (data) => {
    const uniqueBrands = Array.from(new Set(data.map(shirt => shirt.brand)));
    setBrands(uniqueBrands);

    const uniqueColors = Array.from(new Set(data.map(shirt => shirt.color)));
    setColors(uniqueColors);

    const uniqueFabrics = Array.from(new Set(data.map(shirt => shirt.fabric)));
    setFabrics(uniqueFabrics);

    const uniqueFits = Array.from(new Set(data.map(shirt => shirt.fit)));
    setFits(uniqueFits);

    const uniqueSleeves = Array.from(new Set(data.map(shirt => shirt.sleeve)));
    setSleeves(uniqueSleeves);

    const uniqueCollars = Array.from(new Set(data.map(shirt => shirt.collar)));
    setCollars(uniqueCollars);
  };

  const filterShirts = () => {
    let filtered = shirts.filter(shirt => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(shirt.brand)) {
        return false;
      }
      if (selectedColors.length > 0 && !selectedColors.includes(shirt.color)) {
        return false;
      }
      if (selectedFabrics.length > 0 && !selectedFabrics.includes(shirt.fabric)) {
        return false;
      }
      if (selectedFits.length > 0 && !selectedFits.includes(shirt.fit)) {
        return false;
      }
      if (selectedSleeves.length > 0 && !selectedSleeves.includes(shirt.sleeve)) {
        return false;
      }
      if (selectedCollars.length > 0 && !selectedCollars.includes(shirt.collar)) {
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
  const handleFabricChange = (event) => {
    const fabric = event.target.value;
    if (event.target.checked) {
      setSelectedFabrics([...selectedFabrics, fabric]);
    } else {
      setSelectedFabrics(selectedFabrics.filter(f => f !== fabric));
    }
  };

  const handleFitChange = (event) => {
    const fit = event.target.value;
    if (event.target.checked) {
      setSelectedFits([...selectedFits, fit]);
    } else {
      setSelectedFits(selectedFits.filter(f => f !== fit));
    }
  };

  const handleSleeveChange = (event) => {
    const sleeve = event.target.value;
    if (event.target.checked) {
      setSelectedSleeves([...selectedSleeves, sleeve]);
    } else {
      setSelectedSleeves(selectedSleeves.filter(s => s !== sleeve));
    }
  };

  const handleCollarChange = (event) => {
    const collar = event.target.value;
    if (event.target.checked) {
      setSelectedCollars([...selectedCollars, collar]);
    } else {
      setSelectedCollars(selectedCollars.filter(c => c !== collar));
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
  }, [selectedBrands, selectedColors, selectedFabrics, selectedFits, selectedSleeves, selectedCollars, minPrice, maxPrice, sortOrder]);

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
          <div>
            <h3 className='h3'>FABRIC</h3>{fabrics.map((fabric, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  id={`fabric_${index}`}
                  value={fabric}
                  onChange={handleFabricChange}
                  style={{ borderRadius: '0', width: '16px', height: '16px', border: '1px solid #ccc' }}
                />
                <label htmlFor={`fabric_${index}`} style={{ marginLeft: '5px' }}>{fabric}</label>
              </div>
            ))}
          </div>
          <div style={{ height: '1px', backgroundColor: 'grey' }}></div>

          <div>
            <h3 className='h3'>FIT</h3>
            {fits.map((fit, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  id={`fit_${index}`}
                  value={fit}
                  onChange={handleFitChange}
                  style={{ borderRadius: '0', width: '16px', height: '16px', border: '1px solid #ccc' }}
                />
                <label htmlFor={`fit_${index}`} style={{ marginLeft: '5px' }}>{fit}</label>
              </div>
            ))}
          </div>
          <div style={{ height: '1px', backgroundColor: 'grey' }}></div>
          <div>
            <h3 className='h3'>SLEEVES</h3>{sleeves.map((sleeve, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  id={`sleeve_${index}`}
                  value={sleeve}
                  onChange={handleSleeveChange}
                  style={{ borderRadius: '0', width: '16px', height: '16px', border: '1px solid #ccc' }}
                />
                <label htmlFor={`sleeve_${index}`} style={{ marginLeft: '5px' }}>{sleeve}</label>
              </div>
            ))}
          </div>
          <div style={{ height: '1px', backgroundColor: 'grey' }}></div>
          <div>
            <h3 style={{ fontSize: '15px', fontFamily: 'Assistant, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>COLLAR</h3>
            {collars.map((collar, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  id={`collar_${index}`}
                  value={collar}
                  onChange={handleCollarChange}
                  style={{ borderRadius: '0', width: '16px', height: '16px', border: '1px solid #ccc' }}
                />
                <label htmlFor={`collar_${index}`} style={{ marginLeft: '5px' }}>{collar}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="displaybody">
        <h2>Shirts</h2>
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
        <br/>
        <div className="containerpagination">
          <ul className="pagination">
            <li>
              <a href="#" onClick={handlePrevPage} disabled={currentPage === 1}>Prev</a>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                <a href="#" onClick={() => setCurrentPage(index + 1)}>{index + 1}</a>
              </li>
            ))}
            <li>
              <a href="#" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Shirts;