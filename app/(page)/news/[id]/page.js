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

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
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
            <div className="container">
              <div className="translate-google">
                <div id="google_translate_element"></div>
              </div>
              <div className="row flex-column-reverse flex-lg-row">
                <div className="col-lg-2 col-md-12">
                  <Side slug="/news" />
                </div>

                <div className="col-lg-10 col-md-12">
                  {!data && <NotFound />}
                  <NewsDetails data={data} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}
