import React from 'react';
import Fetchcategories from './categorypages/Fetchcategories'; // Import Fetchcategories component
import logo from './assets/SWIFTmain1.png'
import './Home.css'
const Home = () => {
  return (
    <div className="container mt-4">
      <div className='one-one' style={{ display: 'flex', alignItems: 'center' }}>
  <img src={logo} alt="hi" width="300px" height="90px" style={{ marginRight: '200px' }}></img>
  <div className='brand-caption' style={{ textAlign: 'center' }}>
  <p style={{ fontWeight: 'bold',fontSize: '30px',color:'grey' }}>SHOPPING SIMPLIFIED</p>
  <p style={{ fontWeight: 'bold',fontSize: '30px',color:'grey' }}>UNLEASH SWIFT EXPERIENCE IN SHOPPING </p>
  {/* <img src="https://www.freeiconspng.com/thumbs/celebration-icon-png/celebration-icon-png-9.png" height="100px"></img> */}
    </div>
</div>

      <Fetchcategories /> {/* Render Fetchcategories component */}
    </div>
  );
};

export default Home;
