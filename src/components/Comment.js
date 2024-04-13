import React, { useState } from 'react';
import './css/Comment.css';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.elements.comment.value;
    setComments([...comments, { text: comment, rating }]);
    event.target.reset();
    setRating(0); // reset rating
  };

  return (
    <div>
      <h2 className="comment-title">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <p className='comment-header'>Write a comment</p>
        <div className="rating">
          <p>Overall Rating:</p>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <i className={ratingValue <= rating ? "fas fa-star" : "far fa-star"}></i>
              </label>
            );
          })}
        </div>
        <p>Comment Body:</p>
        <label>
          <input type="text" name="comment" required />
        </label>
        <button type="submit">Post Comment</button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
            <p>Rating: {comment.rating} stars</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
