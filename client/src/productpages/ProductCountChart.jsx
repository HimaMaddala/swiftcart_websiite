import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';

const ProductCountChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const labels = data.map(row => row.order_date);
    const counts = data.map(row => row.product_name.length); // Assuming 'product_name' contains the product count

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Product Count',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return 'Count: ' + context.parsed.y;
              }
            }
          }
        }
      }
    });
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ProductCountChart;
