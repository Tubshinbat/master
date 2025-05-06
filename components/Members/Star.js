import { Rate } from "antd";
import React from "react";

const StarRating = ({ value = 0, ratingCount = null }) => {
  return (
    <div className="star-wrapper">
      <Rate disabled allowHalf value={value / 20} className="custom-star" />
      {ratingCount && <span> ( {ratingCount} Үнэлгээ өгсөн )</span>}
    </div>
  );
};

export default StarRating;
