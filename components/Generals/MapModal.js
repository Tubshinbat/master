import { Modal } from "antd";
import GoogleMapReact from "google-map-react";

const MapModal = ({ open, onClose, onSelect }) => {
  const defaultProps = {
    center: {
      lat: 47.918873,
      lng: 106.917119,
    },
    zoom: 11,
  };

  const handleMapClick = ({ lat, lng }) => {
    onSelect({ lat, lng });
    onClose();
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={800}>
      <div style={{ height: "500px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDXBfW8YSBnVy03efS9xXW3gEM_BI5qPWs" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onClick={handleMapClick}
        />
      </div>
    </Modal>
  );
};

export default MapModal;
