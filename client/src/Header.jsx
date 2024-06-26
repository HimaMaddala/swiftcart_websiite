import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import logo from './assets/SWIFT.png'

import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to include Bootstrap CSS

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {/* <a className="navbar-brand" href="#">Amazon</a> */}
      {/* <img src="https://www.pngall.com/wp-content/uploads/15/Amazon-Logo-White-Transparent.png" width="128px"
              height="30px"></img> */}

<img src={logo} alt="Swift Logo" width="128px" height="30px"/>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search for products..." aria-label="Search" />
            {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
          </form>
          <li className="nav-item dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="navbarDropdownMenuLink">
                Men
              </Dropdown.Toggle>
              <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/mensshirts">Shirts</Dropdown.Item>
        <Dropdown.Item as={Link} to="/pants">Pants</Dropdown.Item>
        <Dropdown.Item as={Link} to="/watches">Watches</Dropdown.Item>
        <Dropdown.Item as={Link} to="/hoodies">Hoodies</Dropdown.Item>
        <Dropdown.Item as={Link} to="/sweaters">Sweaters</Dropdown.Item>
        <Dropdown.Item as={Link} to="/accessories">Accessories</Dropdown.Item>
      </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="navbarDropdownMenuLink">
                Womens
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Tshirts</Dropdown.Item>
                <Dropdown.Item>Saree</Dropdown.Item>
                <Dropdown.Item>Jewellery</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          
          <li className="nav-item dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="navbarDropdownMenuLink">
                Kids
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Toys</Dropdown.Item>
                <Dropdown.Item>Shirts</Dropdown.Item>
                <Dropdown.Item>Shorts</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item">
  <Link className="nav-link" to="/sports">Sports</Link>
</li>
          <li className="nav-item">
            <Link className="nav-link" to="/backpacks">Luggages</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Accessories</a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shoes">Shoes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shoes">Grooming</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shoes">Furniture</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shoes">Electronics</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shoes">Premium</Link>
          </li>
          <li className="nav-item dropdown">
  <Dropdown>
    <Dropdown.Toggle variant="dark" id="navbarDropdownMenuLink">
      Account <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item>
        <Link to="/yourorders" className="nav-link" style={{ color: 'black' }}>Orders</Link>
        <Link to="/merchantpage" className="nav-link" style={{ color: 'black' }}>Merchant</Link>
      
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</li>

          <li className="nav-item" style={{ marginRight: '10px' }}>
            <Link className="nav-link" to="/fetchcart">
              Cart <FontAwesomeIcon icon={faShoppingCart} style={{ color: "#ffffff" }} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
