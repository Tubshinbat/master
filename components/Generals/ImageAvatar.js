"use client";
import React, { useState } from "react";
import base from "lib/base";

const ImageAvatar = ({ image, alt = "image", className = "", style = {} }) => {
  const [loaded, setLoaded] = useState(false);

  if (!image || typeof image !== "string") {
    return (
      <img
        src="/assets/img/no-photo.png"
        alt="no-photo"
        className={className}
      />
    );
  }

  const previewSrc = `${base.cdnUrl}/450/${image}`; // эсвэл previewSrc өөр зам бол солино
  const fullSrc = `${base.cdnUrl}/${image}`;

  return (
    <img
      src={loaded ? fullSrc : previewSrc}
      onLoad={() => setLoaded(true)}
      alt={alt}
      className={className}
      loading="lazy"
      style={{
        ...style,
        width: "100%",
        height: "100%",
        objectFit: "contain",
        filter: loaded ? "none" : "blur(4px)",
        transition: "filter 0.3s ease-in-out",
      }}
    />
  );
};

export default ImageAvatar;
