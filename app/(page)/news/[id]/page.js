"use client";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import PageSide from "components/Generals/PageSide";
import NewsDetails from "components/News/Details";
import Side from "components/News/Side";
import { getIdNews } from "lib/getFetchers";
import { Suspense, useEffect, useState } from "react";

export default function Page({ params }) {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const { news } = await getIdNews(params.id);
      setData(news);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  if (!data && loading) {
    return (
      <section>
        <div className="container">
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="main">
          <section>
            <div className="container custom-container">
              <div className="row flex-column-reverse flex-lg-row">
                {!data && <NotFound />}
                <NewsDetails data={data} />
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}
