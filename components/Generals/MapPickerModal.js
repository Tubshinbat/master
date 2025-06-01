import { Modal } from "antd";
import GoogleMapReact from "google-map-react";
import { MapPin } from "lucide-react";

const Marker = () => (
  <div
    style={{
      color: "red",
      fontSize: "24px",
      pointerEvents: "none",
    }}
  >
    <MapPin />
  </div>
);

export default function MapPickerModal({ open, onClose, latLng, setLatLng }) {
  const defaultCenter = { lat: 47.918873, lng: 106.917119 };

  const handleMapClick = ({ lat, lng }) => {
    setLatLng({ lat, lng });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onClose}
      title="Газрын байршил сонгох"
      width={600}
    >
      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDXBfW8YSBnVy03efS9xXW3gEM_BI5qPWs" }}
          center={latLng?.lat ? latLng : defaultCenter} // үргэлж сүүлийн байрлал руу center хийх
          defaultZoom={15}
          onClick={handleMapClick}
          options={{ draggableCursor: "pointer" }} // курсор асуудалгүй болгох
        >
          <Marker
            lat={latLng?.lat || defaultCenter.lat}
            lng={latLng?.lng || defaultCenter.lng}
          />
        </GoogleMapReact>
      </div>
    </Modal>
  );
}
