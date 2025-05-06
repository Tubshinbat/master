import ImageAvatar from "components/Generals/ImageAvatar";
import { Rate } from "antd";
import base from "lib/base";
import React from "react";
import StarRating from "./Star";

const MemberItem = ({ data }) => {
  return (
    <div className="member-item">
      <div className="member-item__header">
        <div className="member-item__avatar">
          <ImageAvatar
            className="member-img"
            image={`${data.picture}`}
            alt={data.name}
          />
          {data.memberShip === true && (
            <img className="badge-img" src="/images/verify.svg" />
          )}
        </div>
      </div>

      <div className="member-item__body">
        <h4 className="member-name">{data.name}</h4>
        <span>{data.position}</span>

        <div className="member-item-rate">
        <StarRating value={data.rating5Percent || 0} />
        </div>

        <div className="member-categories">
          <div className="cat-list">
            {data.category &&
              data.category.map((cat) => (
                <div className="info-cat-item">{cat.name}</div>
              ))}
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default MemberItem;
