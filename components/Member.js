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
import {
  faEnvelope,
  faLink,
  faPhoneAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";
import Image from "next/image";
import Link from "next/link";

const Member = ({ data }) => {
  const contactRender = (link) => {
    let icon = <FontAwesomeIcon icon={faLink} />;

    switch (link.name.toLowerCase()) {
      case "facebook": {
        icon = <FontAwesomeIcon icon={faFacebookF} />;
        break;
      }
      case "twitter": {
        icon = <FontAwesomeIcon icon={faTwitter} />;
        break;
      }
      case "linkedin":
        icon = <FontAwesomeIcon icon={faLinkedin} />;
        break;
      case "youtube":
        icon = <FontAwesomeIcon icon={faYoutube} />;
        break;
      case "twitch":
        icon = <FontAwesomeIcon icon={faTwitch} />;
        break;
      case "instagram":
        icon = <FontAwesomeIcon icon={faInstagram} />;
        break;
      case "skype":
        <FontAwesomeIcon icon={faSkype} />;
        break;
      case "phone":
        <FontAwesomeIcon icon={faPhoneAlt} />;
        break;
      case "email":
        icon = <FontAwesomeIcon icon={faEnvelope} />;
        break;
      default:
        icon = <FontAwesomeIcon icon={faLink} />;
        break;
    }
    return icon;
  };

  return (
    <>
      <div className="member-item">
        <div className="member-head">
          <Link href={`/members/${data._id}`} className="member-img-box">
            <img
              className="member-img"
              src={`${base.cdnUrl}/350x350/${data.picture}`}
            />
            <img className="verfi-img" src="/images/verify.svg" />
          </Link>
          <div className="member-head-rigth">
            <div className="member-name">
              <Link href={`/members/${data._id}`}>{data.name}</Link>
              <span> {data.position}</span>
            </div>
            <div className="member-rate">
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
        </div>

        <div className="member-contact">
          {data.links &&
            JSON.parse(data.links).map((link) => (
              <>
                <a
                  href={
                    link.name.toLowerCase() === "phone"
                      ? "callto:" + link.link
                      : link.name.toLowerCase() === "email"
                      ? "mailto:" + link.link
                      : link.link
                  }
                  target="_blank"
                  className="member-contact-item"
                >
                  {contactRender(link)}
                </a>
              </>
            ))}
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
    </>
  );
};

export default Member;
