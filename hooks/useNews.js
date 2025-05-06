"use client";

import { getNews } from "lib/getFetchers";
import { useEffect, useState } from "react";

export default () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { news } = await getNews(`limit=3`);
      setNews(news || []);
      try {
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { news, loading };
};
