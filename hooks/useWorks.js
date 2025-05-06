"use client";

import {
  getJob,
  getMemberCategories,
  getMemberCategoriesSort,
} from "lib/getFetchers";
import { getMenus } from "lib/menu";
import { useEffect, useState } from "react";

export default () => {
  const [works, setWorks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { categories } = await getMemberCategoriesSort();
      setWorks(categories || []);
      try {
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return { works };
};
