import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Pie, Bar } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from 'chart.js/auto';

Chart.register(ArcElement, Tooltip); // Register Tooltip
import './Fetchrreviews.css';

import img1 from '../assets/one.png';
import img2 from '../assets/two.png';
import img3 from '../assets/three.png';
import img4 from '../assets/four.png';
import img5 from '../assets/five.png';

const FetchReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [sentimentCounts, setSentimentCounts] = useState(null);
  const [ratingCounts, setRatingCounts] = useState({});
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/${id}`);
        setReviews(response.data.review_text);
        setRatings(response.data.ratings);
        const sentimentResponse = await axios.get(`http://localhost:8082/api/sentiment/${id}`);
        setSentimentCounts(sentimentResponse.data);
        calculateRatingCounts(response.data.ratings);
        calculateAverageRating(response.data.ratings);
      } catch (error) {
        console.error('Error fetching data:', error);
        setReviews([]);
        setRatings([]);
        setSentimentCounts(null);
        setRatingCounts({});
        setAverageRating(null);
      }
    };

    fetchData();
  }, [id]);

  // Function to calculate rating counts
  const calculateRatingCounts = (ratings) => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings.forEach(rating => {
      counts[rating]++;
    });
    setRatingCounts(counts);
  };

  // Function to calculate average rating
  const calculateAverageRating = (ratings) => {
    const average = ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;
    setAverageRating(average.toFixed(1));
  };
  // Function to get image source based on rating
  const getImageSrc = (rating) => {
    if (rating === 1) {
      return img1;
    } else if (rating === 2) {
      return img2;
    } else if (rating === 3) {
      return img3;
    } else if (rating === 4) {
      return img4;
    } else if (rating === 5) {
      return img5;
    }
  };

  // Render "add review" if no reviews are found
  if (reviews.length === 0) {
    return (
      <div className='full-div'>
        <div className='customer-reviews'>
          <div className='inner-div'>
            <p className='centered-text'>Customer Reviews</p>
            <p>Total reviews: 0</p>
            <div>
              <div className='review-div' style={{ marginBottom: '10px' }}>
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Customer Review Icon" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                <span style={{ verticalAlign: 'middle' }}>Add Review</span>
                <br />
                <img src={getImageSrc(0)} alt="Rating 0" style={{ width: '55px', height: '20px' }} />
                <p>Rating: 0</p>
                Add your review here...
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className='charts-js'>
          {/* Chart components */}
          {sentimentCounts && (
            <div>
              <Pie
                data={{
                  labels: ['Positive', 'Negative', 'Neutral'],
                  datasets: [{
                    data: [sentimentCounts.positive, sentimentCounts.negative, sentimentCounts.neutral],
                    backgroundColor: ['#E47200', '#FF6384', '#FFCE56']
                  }]
                }}
              />
            </div>
          )}
          {ratingCounts && (
            <div>
              <Bar
                data={{
                  labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
                  datasets: [{
                    label: 'Rating Counts',
                    data: [ratingCounts[1], ratingCounts[2], ratingCounts[3], ratingCounts[4], ratingCounts[5]],
                    backgroundColor: ['#e47200', '#FF0000', '#E5DE00', '#36A2EB', '#e47200']
                  }]
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render reviews if found
  return (
    <div className='full-div'>
      <div className='customer-reviews'>
        <div className='inner-div'>
          <p className='centered-text'>Customer Reviews</p>
          <p>Total reviews:{reviews.length}</p>
          <div>
            {reviews.map((review, index) => (
              <div className='review-div' key={index} style={{ marginBottom: '10px' }}>
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Customer Review Icon" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                <span style={{ verticalAlign: 'middle' }}>User</span>
                <br />
                <img src={getImageSrc(ratings[index])} alt={`Rating ${ratings[index]}`} style={{ width: '55px', height: '20px' }} />
                <p>Rating: {ratings[index]}</p>
                {review}
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='charts-js'>
        {/* Chart components */}
        {sentimentCounts && (
          <div className='data-card-pie'>
            <p style={{fontSize:'35px',marginLeft:'75px'}}>Review counts</p> 
            <Pie
              data={{
                labels: ['Positive', 'Negative', 'Neutral'],
                datasets: [{
                  data: [sentimentCounts.positive, sentimentCounts.negative, sentimentCounts.neutral],
                  backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
                }]
              }}
            />
          </div>
        )}
        {ratingCounts && (
          <div className='data-card-bar'>
            <p style={{fontSize:'35px'}}>Total Ratings</p>
            <Bar
              data={{
                labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
                datasets: [{
                  label: 'Rating Counts',
                  data: [ratingCounts[1], ratingCounts[2], ratingCounts[3], ratingCounts[4], ratingCounts[5]],
                  backgroundColor: ['#FF6384', '#e6cc00', '#e6b400', '#e69b00', '#e47200']
                }]
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchReviews;
