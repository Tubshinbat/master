import GoogleMapReact from "google-map-react";
import { EnvironmentOutlined } from "@ant-design/icons";
import { MapPin, MapPinIcon } from "lucide-react";

const Marker = () => (
  <div style={{ color: "red", fontSize: "24px" }}>
    <MapPin />
  </div>
);

const MapBox = ({ location }) => {
  const defaultCenter = {
    lat: 47.918873,
    lng: 106.917119,
  };

  const coords =
    location && location.coordinates?.length === 2
      ? {
          lat: location.coordinates[1],
          lng: location.coordinates[0],
        }
      : defaultCenter;

  return (
    <div style={{ height: "200px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDXBfW8YSBnVy03efS9xXW3gEM_BI5qPWs" }}
        defaultCenter={defaultCenter}
        center={coords}
        defaultZoom={15}
      >
        <Marker lat={coords.lat} lng={coords.lng} />
      </GoogleMapReact>
    </div>
  );
};
export default MapBox;
