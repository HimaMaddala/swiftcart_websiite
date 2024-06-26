import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import axios from 'axios';
// import './CreateReview.css';

const CreateReview = () => {
  const { id } = useParams(); // Extract _id from URL params
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0); // Assuming default rating is 0
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator or error handling

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state while making API request
    // Here you would make an API call to send the reviewText, rating, and product _id to your backend
    axios.post(`http://localhost:3001/createreview/${id}`, { review_text: reviewText, rating })
      .then(result => {
        console.log(result);
        // Handle successful creation, such as showing a success message or redirecting
      })
      .catch(err => {
        console.error("Error creating review:", err);
        // Handle error, such as showing an error message to the user
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state after API call completes
      });
  };

  return (
    <div className="create-review-container">
      <h2>Create Review</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label htmlFor="reviewText">Review Text</label>
          <textarea
            id="reviewText"
            placeholder='Enter your review'
            className='form-control'
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            placeholder='Enter rating'
            className='form-control'
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            min="0"
            max="5" // Assuming rating is between 0 and 5
            required
          />
        </div>
        <button type="submit" className='btn btn-primary' disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
