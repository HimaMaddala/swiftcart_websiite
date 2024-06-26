import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Createproduct from './productpages/Createproduct';
import Userpage from './Userpage';
import Adminpage from './Adminpage';
import Fetchproducts from './productpages/Fetchproducts';
import Fetchcategories from './categorypages/Fetchcategories';
import MensShirts from './categories/MensShirts';
import Pants from './categories/Pants';
import Tshirts from './categories/Tshirts';
import Watches from './categories/Watches';
import Backpacks from './categories/Backpacks';
import Shoes from './categories/Shoes';
import Productdisplay from './productpages/Productdisplay';
import Cartpage from './Cartpage';
import Header from './Header';
import Footer from './Footer';
import Merchantpage from './merchant pages/Merchantpage';
import Amountcollected from './merchant pages/Amountcollected';
import Chartpage from './Chartpage';
import Fetchreviews from './reviewpages/Fetchrreviews';
import Fetchorders from './orderspages/Fetchorders';
import CategoryAnalysis from './categorypages/Categoryanalysis';
import Createreview from './reviewpages/Createreview';
// Header component
const AppHeader = () => {
  return <Header />;
};

// Footer component
const AppFooter = () => {
  return <Footer />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AppHeader />
              <Home />
              <AppFooter />
            </>
          }
        />
        
        <Route
          path="/login"
          element={
            <>
              <AppHeader />
              <Login />
              <AppFooter />
            </>
          }
        />
        <Route path="/userpage" element={ <><AppHeader /><Userpage /><AppFooter /></>}/>
        <Route path="/adminpage" element={<Adminpage />} />
        <Route path="/createproduct" element={<><Createproduct /></>} />
        <Route path="/fetchproducts" element={<><AppHeader /><Fetchproducts /><AppFooter /></>} />
        <Route path="/fetchcategories" element={<><AppHeader /><Fetchcategories /><AppFooter /></>} />
        {/* <Route path="/fetchdeals" element={<Fetchdeals />} /> */}
        <Route path="/mensshirts" element={ <><AppHeader /><MensShirts /><AppFooter /></>}/>
        <Route path="/pants" element={<><AppHeader /> <Pants/><AppFooter /></>} />
        <Route path="/tshirts" element={<><AppHeader /><Tshirts /><AppFooter /></>} />
        <Route path="/shoes" element={<><AppHeader /><Shoes /><AppFooter /></>} />
        <Route path="/watches" element={<><AppHeader /><Watches /><AppFooter /></>} />
        <Route path="/backpacks" element={<><AppHeader /><Backpacks /><AppFooter /></>} />
        <Route path="/productdisplay/:id" element={<><AppHeader /><Productdisplay /><AppFooter /></>} />
        <Route path="/fetchcart" element={<><AppHeader /><Cartpage /><AppFooter /></>} />
        <Route path="/merchantpage" element={<Merchantpage />}/>
        <Route path="/amountcollected" element={<Amountcollected />}/>
        <Route path="/chart" element={<Chartpage />}/>
        <Route path="/analysis" element={<CategoryAnalysis/>}/>
        <Route path="/api/:id" element={<Fetchreviews  />}/>
        <Route path="/yourorders" element={<Fetchorders  />}/>
        <Route path="/createreview/:id" element={<Createreview  />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
