import React from "react";

const StarRating = () => {
  return (
    <div className="rating">
      <input type="radio" id="star3" name="rating" value="3" />
      <label
        className="star"
        htmlFor="star3"
        title="Excellent"
        aria-hidden="true"
      ></label>
      <input type="radio" id="star2" name="rating" value="2" />
      <label
        className="star"
        htmlFor="star2"
        title="Average"
        aria-hidden="true"
      ></label>
      <input type="radio" id="star1" name="rating" value="1" />
      <label
        className="star"
        htmlFor="star1"
        title="Poor"
        aria-hidden="true"
      ></label>
    </div>
  );
};

export default StarRating;
