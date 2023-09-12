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
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import base from "lib/base";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import RateColMember from "./RateColMember";
import { Wrapper } from "@googlemaps/react-wrapper";

const PartnerDetails = ({ data, members }) => {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
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
      <div className="row">
        <div className="col-lg-3">
          <div className="member-profile-side">
            <div className="profile-logo-box">
              {data.logo && (
                <Image
                  className="profile-logo-img"
                  width="0"
                  height="0"
                  sizes="100vw"
                  quality="100"
                  src={`${base.cdnUrl}/450/${data.logo}`}
                />
              )}
            </div>
            <div className="profile-info">
              <h6> {data.name} </h6>
            </div>
          </div>

          <div className="member-profile-side">
            <div className="member-side-head">
              <h6> Холбоо барих </h6>
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
          </div>
        </div>
        <div className="col-lg-9">
          <div className="profile-details">
            <div className="profile-head">
              <h6> Байгууллагын тухай</h6>
            </div>
            <div
              className="profile-detail"
              dangerouslySetInnerHTML={{
                __html: data.about,
              }}
            ></div>
            <div className="profile-categories">
              {data.category &&
                data.category.map((cat) => (
                  <div className="category-item"> {cat.name} </div>
                ))}
            </div>
            <div className="profile-details">
              <div className="profile-head">
                <h6> Хаяг </h6>
              </div>
              <div
                style={{
                  height: "400px",
                  width: "100%",
                  padding: "10px",
                  boxShadow: "0px 0px 15px rgb(0 0 0 / 8%)",
                }}
              >
                <Wrapper apiKey={"AIzaSyBVbaukknpuyvHnYSK_MmpI-5pcBwz83kw"}>
                  <Map latitude={data.lat} longitude={data.long}></Map>
                </Wrapper>
              </div>
            </div>
          </div>
        </div>
        <div className="member-col-list">
          {members &&
            members.length > 0 &&
            members.map((el, index) => <RateColMember data={el} />)}
        </div>
      </div>
    </>
  );
};

const Map = ({ latitude, longitude, children }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(google.maps.Maps || null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new google.maps.Map(ref.current, {
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: true,
          center: {
            lat: latitude ?? 0,
            lng: longitude ?? 0,
          },
          zoom: 13,
        })
      );
    }
  }, [ref, map, latitude, longitude]);

  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
  });

export default PartnerDetails;
