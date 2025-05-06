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
import Image from "next/image";
import Link from "next/link";
import StarRating from "./Members/Star";
import ImageAvatar from "./Generals/ImageAvatar";

const RateColMember = ({ data }) => {
  return (
    <>
      <Link href={`/members/${data._id}`} className="member-col-item">
        <div className="member-col-left">
          <div className="member-col-head">
            <div className="member-col-img-box">
              <ImageAvatar
                className="member-col-img"
                image={`${data.picture}`}
              />
            </div>
          </div>{" "}
          <div className="member-col-info">
            <h4>{data.name}</h4>
            <span> {data.position}</span>
          </div>
        </div>
        <div className="member-col-right">
          <div className="member-rating-star-box">
            <span> Зэрэглэл </span>
            <StarRating value={data.rating * 20} />
          </div>
          <div className="rating-count">
            <h6>{data.ratingCount}</h6>
            <span>Хүн үнэлгээ өгсөн</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RateColMember;
