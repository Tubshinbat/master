"use client";

import {
  getExpertMembers,
  getJob,
  getMemberCategories,
  getMemberCategoriesSort,
  getMembers,
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
      setLoading(true);
      const { experts } = await getExpertMembers();
      const { members } = await getMembers(`status=true&limit=12`);
      setExperts(experts || []);
      setMembers(members || []);
      try {
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { experts, members };
};
