"use client";

import { getMenus } from "lib/menu";
import { useEffect, useState } from "react";

export default () => {
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { menus } = await getMenus();
      setMenus(menus || []);
      try {
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return { menus };
};
