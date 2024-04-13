import React, { useState } from "react";
import "./css/Comment.css";

const Comment = () => {
  const [comments, setComments] = useState([
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      rating: 4,
    },
    {
      text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      rating: 5,
    },
    {
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 3,
    },
  ]);
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
      <div className="comment-header">
        <h2 className="comment-title">Comments</h2>
        <span>•</span>
        <a href="#comment-form">Write a Comment</a>
      </div>
      {comments.map((comment, index) => (
        <div key={index} className="posted-comment">
          <p className="posted-comment-user">Trusted User</p>
          <p>{comment.text}</p>
          <div className="posted-comment-rating">
            <p>Rating: </p>
            {[...Array(comment.rating)].map((star, i) => (
              <i key={i} className="fas fa-star"></i>
            ))}
            {[...Array(5 - comment.rating)].map((star, i) => (
              <i key={i} className="far fa-star"></i>
            ))}
          </div>
        </div>
      ))}
      <form
        onSubmit={handleCommentSubmit}
        className="comment-form"
        id="comment-form"
      >
        <p className="comment-form-title">Write a Comment</p>
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
                <i
                  className={
                    ratingValue <= rating ? "fas fa-star" : "far fa-star"
                  }
                ></i>
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
    </div>
  );
};

export default Comment;
