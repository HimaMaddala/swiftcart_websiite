import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js/auto';

Chart.register(ArcElement, Tooltip); // Register Tooltip
import '../reviewpages/Fetchrreviews.css';
import './Categoryanalysis.css';

const CategoryAnalysis = () => {
  const [categoryData, setCategoryData] = useState({});
  const [ordersData, setOrdersData] = useState([]);
  const [topDates, setTopDates] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/orders');
      const data = response.data;
      setOrdersData(data);
      const counts = countCategories(data);
      setCategoryData(counts);

      // Process data to calculate the count of products ordered on each date
      const ordersCountByDate = {};
      data.forEach(order => {
        const order_date = order.order_date;
        ordersCountByDate[order_date] = ordersCountByDate[order_date] ? ordersCountByDate[order_date] + 1 : 1;
      });

      // Extracting and sorting dates
      const dates = Object.keys(ordersCountByDate).sort();

      // Calculate top 3 dates with most products
      const topDates = dates
        .sort((a, b) => ordersCountByDate[b] - ordersCountByDate[a])
        .slice(0, 3);
      setTopDates(topDates);

      // Calculate top 3 categories
      const topCategories = Object.keys(counts)
        .sort((a, b) => counts[b] - counts[a])
        .slice(0, 3);
      setTopCategories(topCategories);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const countCategories = (data) => {
    const counts = {};
    data.forEach((item) => {
      const category = item.category;
      counts[category] = counts[category] ? counts[category] + 1 : 1;
    });
    return counts;
  };

  // Extracting category labels and counts for chart data
  const categoryLabels = Object.keys(categoryData);
  const categoryCounts = Object.values(categoryData);

  // Line chart data
  const lineChartData = {
    labels: Object.keys(ordersData.reduce((acc, curr) => {
      acc[curr.order_date] = true;
      return acc;
    }, {})),
    datasets: [
      {
        label: 'Number of Products Ordered',
        data: Object.keys(ordersData.reduce((acc, curr) => {
          acc[curr.order_date] = (acc[curr.order_date] || 0) + 1;
          return acc;
        }, {})).map(order_date => ordersData.reduce((acc, curr) => {
          if (curr.order_date === order_date) acc++;
          return acc;
        }, 0)),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 0.8)',
        tension: 0.1
      }
    ]
  };

  // Define y-axis options
  const yAxesOptions = [{
    ticks: {
      stepSize: 1, // Display integers only
      precision: 0 // Ensure no decimals are displayed
    }
  }];

  // Line chart options
  const lineChartOptions = {
    scales: {
      x: {
        maxScrollLimit: 4, // Set the maximum number of data points displayed
      },
      y: yAxesOptions,
    }
  };

  return (
    <div>
      <div className='inner-div-own'>
        <div className='top-own-div'>
          <div className='linechart'>
            <h2>Products Ordered Over Time</h2>
            {/* Line Chart */}
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
          <div className='linechart-analysis'>
            <div className='main-box'>
              <h2>Top selling days</h2>
              <ul>
                {topDates.map((order_date, index) => (
                  <li key={index}>{order_date}: {ordersData.filter(item => item.order_date === order_date).length} products</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='bottom-own-div'>
          <div className='barchart-own'>
          <div className='barchart'>
            <h2>Most Selling Categories</h2>
            <Bar
              data={{
                labels: categoryLabels,
                datasets: [{
                  label:'',
                  data: categoryCounts,
                  backgroundColor: [
                    'rgba(0, 204, 204, 0.8)',   // Blue
                    'rgba(204, 255, 153, 0.8)',  // Yellow
                    'rgba(242, 30, 30, 0.8)',  // Red
                    'rgba(121, 28, 28, 0.8)',
                    // Add more colors if needed
                  ],
                  borderColor: [
                    'rgba(0, 204, 204, 1)',   // Blue
                    'rgba(204, 255, 153, 1)',  // Yellow
                    'rgba(255, 102, 102, 1)',  // Red
                    // Add more colors if needed
                  ],
                  borderWidth: 1
                }]
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Category chart',
                    font: {
                      size: 16
                    }
                  }
                }
              }}
            />
          </div>
          </div>
          <div className='barchart-analysis'>
            <div className='main-box'>
              <h2>Top selling categories</h2>
              <ul>
                {topCategories.map((category, index) => (
                  <li key={index}>{category}: {categoryData[category]} products</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysis;
