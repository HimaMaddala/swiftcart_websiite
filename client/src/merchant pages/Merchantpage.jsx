import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Merchantpage.css';

const Merchantpage = () => {
  return (
    <div className="container-merchant">
      <nav className='nav-merchant'>
        <ul className='ul-merchant'>
          <li className='li-merchant'>
            <div className="logo-merchant">
              <img src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" alt="" />
              <span className="nav-item">DashBoard</span>
            </div>
          </li>
          <li className='li-merchant'>
            <Link to="/" className="logo-merchant">
              <img src="https://w7.pngwing.com/pngs/848/762/png-transparent-computer-icons-home-house-home-angle-building-rectangle-thumbnail.png"></img>
              <span className="nav-item">Home</span>
            </Link>
          </li>
          <li className='li-merchant'>
            <Link to="/createproduct" className="logo-merchant">
              <img src="https://cdn-icons-png.freepik.com/512/7466/7466065.png"></img>
              <span className="nav-item">Add Products</span>
            </Link>
          </li>
          <li className='li-merchant'>
          <Link to="/analysis" className="logo-merchant">
              <img src="https://scholarlykitchen.sspnet.org/wp-content/uploads/2015/07/options-analysis1.jpg" alt="" />
              <span className="nav-item">Analysis</span>
            </Link>
          </li>
          <li className='li-merchant'>
            <Link to="/amountcollected" className="logo-merchant">
              <img src="https://p7.hiclipart.com/preview/460/638/436/cost-reduction-computer-icons-finance-money-others.jpg"></img>
              <span className="nav-item">Amount Collected</span>
            </Link>
          </li>
          <li className='li-merchant'>
            <Link to="/createproduct" className="logo-merchant">
              <img src="https://w7.pngwing.com/pngs/703/681/png-transparent-deal-discount-percent-promo-promotion-ribbon-airline-flight-booking-mobile-app-icon.png"></img>
              <span className="nav-item">Add Deals</span>
            </Link>
          </li>
        </ul>
      </nav>

      <section className="main-merchant">
        <div className="main-top-merchant">
          <h1>Merchant Dashboard</h1>
        </div>
      </section>
    </div>
  );
};

export default Merchantpage;
