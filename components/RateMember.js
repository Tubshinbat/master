import {
  faSkype,
  faTwitch,
  faYoutube,
  faFacebook,
  faInstagram,
  faLinkedin,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faLink, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";

import Link from "next/link";
import Image from "./Generals/Image";
import ImageAvatar from "./Generals/ImageAvatar";
import StarRating from "./Members/Star";

const RateMember = ({ data, number }) => {
  return (
    <>
      <Link
        href={`/members/${data._id}`}
        className={`member-ranking-item win-${number}`}
      >
        {number <= 3 && (
          <>
            <div className="number-win"> </div>
          </>
        )}
        <div className="member-ranking-head">
          <Link
            href={`/members/${data._id}`}
            className="member-ranking-img-box"
          >
            <ImageAvatar
              alt={data.name}
              className="member-ranking-img"
              image={`${data.picture}`}
            />
          </Link>

          <div className="member-ranking-info">
            <Link href={`/members/${data._id}`} className="member-ranking-name">
              {data.name}
            </Link>
            <span>{data.position}</span>
          </div>
          <div className="member-star">
            <StarRating value={data.rating * 20} />
          </div>
        </div>

        <div className="member-rating-count">
          <h6>{data.ratingCount}</h6>
          <span>Үнэлгээтэй</span>
        </div>
      </Link>
    </>
  );
};

export default RateMember;
