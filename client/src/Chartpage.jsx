import React, { useEffect, useState } from 'react';
import ProductCountChart from './productpages/ProductCountChart';

const Chartpage = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Fetch CSV data
    fetch('C:\Users\madda\Downloads\own-review.csv')
      .then(response => response.text())
      .then(csvData => {
        // Parse CSV data
        const parsedData = Papa.parse(csvData, { header: true }).data;
        setProductData(parsedData);
      });
  }, []);

  return (
    <div className="App">
      <h1>Product Count Chart</h1>
      <ProductCountChart data={productData} />
    </div>
  );
};

export default Chartpage;