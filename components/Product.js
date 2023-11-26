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

const Product = ({ data }) => {
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
      <Link className="product-link" href={`/products/${data._id}`}>
        <div className="product-item">
          <div className="product-item-img">
            {data.pictures && data.pictures[0] ? (
              <img src={base.cdnUrl + "/350x350/" + data.pictures[0]} />
            ) : (
              <img src="/images/no-data.jpg" />
            )}
          </div>
          <div className="product-item-dtl">
            <h4>{data.name}</h4>

            <div className="product-item-price">
              {data.isDiscount == true && (
                <h4 className="p-discount">
                  {new Intl.NumberFormat().format(data.discount)}₮{" "}
                  <span> {new Intl.NumberFormat().format(data.price)}₮ </span>
                </h4>
              )}
              {data.isDiscount == false && (
                <h4 className="p-price">
                  {new Intl.NumberFormat().format(data.price)}₮
                </h4>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
