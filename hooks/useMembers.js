"use client";

import {
  getExpertMembers,
  getJob,
  getMemberCategories,
  getMemberCategoriesSort,
} from "lib/getFetchers";
import { getMenus } from "lib/menu";
import { useEffect, useState } from "react";

export default () => {
  const [members, setMembers] = useState(null);
  const [experts, setExperts] = useState(null);
  const [randomExperts, setRandomExperts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { experts } = await getExpertMembers();
      setExperts(experts || []);
      try {
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return { experts };
};
