"use client";
import { getSocialLinks, getWebInfo } from "lib/getFetchers";
import { useEffect, useState } from "react";

export default () => {
  const [info, setInfo] = useState(null);
  const [contact, setContact] = useState(null);
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [webInfoRes, socialsRes] = await Promise.all([
          getWebInfo(),
          getSocialLinks(),
        ]);
        setSocials(socialsRes?.socials || []);
        setInfo(webInfoRes?.info || {});
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return { info, contact, socials };
};
