"use client";

import { getPartners } from "lib/getFetchers";
import { getMenus } from "lib/menu";
import { useEffect, useState } from "react";

export default () => {
  const [companies, setCompany] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { partners } = await getPartners();
      setCompany(partners || []);
      try {
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return { companies };
};
