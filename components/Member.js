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

const Member = ({ data }) => {
  console.log(data);
  return (
    <>
      <div className="member-item">
        <div className="member-head">
          <Link href={`/members/${data._id}`} className="member-img-box">
            <Image
              className="member-img"
              width="0"
              height="0"
              sizes="100vw"
              quality="100"
              src={`${base.cdnUrl}/350x350/${data.picture}`}
            />
          </Link>
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
        </div>
        <div className="member-name">
          <Link href={`/members/${data._id}`}>{data.name}</Link>
          <span> {data.position}</span>
        </div>
        <div className="member-contact">
          {data.links &&
            JSON.parse(data.links).map((link) => (
              <>
                <a
                  href={link.link}
                  target="_blank"
                  className="member-contact-item"
                >
                  {link.name.toLowerCase() == "facebook" && (
                    <FontAwesomeIcon icon={faFacebookF} />
                  )}
                  {link.name.toLowerCase() == "twitter" && (
                    <FontAwesomeIcon icon={faTwitter} />
                  )}
                  {link.name.toLowerCase() == "instagram" && (
                    <FontAwesomeIcon icon={faInstagram} />
                  )}
                  {link.name.toLowerCase() == "youtube" && (
                    <FontAwesomeIcon icon={faYoutube} />
                  )}
                  {link.name.toLowerCase() == "twitch" && (
                    <FontAwesomeIcon icon={faTwitch} />
                  )}
                  {link.name.toLowerCase() == "linkedin" && (
                    <FontAwesomeIcon icon={faLinkedin} />
                  )}
                  {link.name.toLowerCase() == "skype" && (
                    <FontAwesomeIcon icon={faSkype} />
                  )}
                  {link.name.toLowerCase() == "web" && (
                    <FontAwesomeIcon icon={faLink} />
                  )}
                </a>
              </>
            ))}
        </div>
        <div className="member-categories">
          <span> Салбар </span>
          <div className="cat-list">
            {data.category &&
              data.category.map((cat) => (
                <div className="info-cat-item">{cat.name}</div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Member;
