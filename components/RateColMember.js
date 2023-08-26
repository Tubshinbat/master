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

const RateColMember = ({ data }) => {
  return (
    <>
      <Link href={`/members/${data._id}`} className="member-col-item">
        <div className="member-col-left">
          <div className="member-col-head">
            <div className="member-col-img-box">
              <Image
                className="member-img"
                width="0"
                height="0"
                sizes="100vw"
                quality="100"
                src={`${base.cdnUrl}/350x350/${data.picture}`}
              />
            </div>
          </div>

          <div className="member-name">
            <div className="member-col-name">{data.name}</div>
            <span> {data.position}</span>
          </div>
        </div>
        <div className="ratingCount">
          <div className="member-rate">
            <span> Зэрэглэл </span>
            <div className="star-rating">
              <input
                id={`star-5-${data._id}`}
                type="radio"
                name={`rating-${data._id}`}
                defaultValue={`star-5-${data._id}`}
                checked={data.rating === 5}
              />
              <label htmlFor={`star-5-${data._id}`} title="5 stars">
                <FontAwesomeIcon
                  className="active"
                  icon={faStar}
                  aria-hidden="true"
                />
              </label>
              <input
                id={`star-4-${data._id}`}
                type="radio"
                name={`rating-${data._id}`}
                defaultValue={`star-4-${data._id}`}
                checked={data.rating === 4}
              />
              <label htmlFor={`star-4-${data._id}`} title="4 stars">
                <FontAwesomeIcon
                  className="active"
                  icon={faStar}
                  aria-hidden="true"
                />
              </label>
              <input
                id={`star-3-${data._id}`}
                type="radio"
                name={`rating-${data._id}`}
                defaultValue={`star-3-${data._id}`}
                checked={data.rating === 3}
              />
              <label htmlFor={`star-3-${data._id}`} title="3 stars">
                <FontAwesomeIcon
                  className="active"
                  icon={faStar}
                  aria-hidden="true"
                />
              </label>
              <input
                id={`star-2-${data._id}`}
                type="radio"
                name={`rating-${data._id}`}
                defaultValue={`star-2-${data._id}`}
                checked={data.rating === 2}
              />
              <label htmlFor={`star-2-${data._id}`} title="2 stars">
                <FontAwesomeIcon
                  className="active"
                  icon={faStar}
                  aria-hidden="true"
                />
              </label>
              <input
                id={`star-1-${data._id}`}
                type="radio"
                name={`rating-${data._id}`}
                defaultValue={`star-1-${data._id}`}
                checked={data.rating === 1}
              />
              <label htmlFor={`star-1-${data._id}`} title="1 star">
                <FontAwesomeIcon
                  className="active"
                  icon={faStar}
                  aria-hidden="true"
                />
              </label>
            </div>
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
