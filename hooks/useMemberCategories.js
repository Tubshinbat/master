"use client";

import { getMemberCategories, getMemberCategoriesSort } from "lib/getFetchers";
import { useEffect, useState } from "react";

export default () => {
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { categories } = await getMemberCategories();
      setMenus(categories || []);
      try {
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return { menus };
};
