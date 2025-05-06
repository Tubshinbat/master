import { Rate } from "antd";
import React from "react";

const StarRating = ({ value = 0 }) => {
  return (
    <div className="star-wrapper">
      <Rate
        disabled
        allowHalf
        value={value / 20}
        className="custom-star"
      />
      <small style={{ marginLeft: 8 }}>{value}%</small>
    </div>
  );
};

export default StarRating;
