"use client";
import Loader from "components/Generals/Loader";
import NewsList from "components/News/NewsList";
import Side from "components/News/Side";

import { Suspense, useEffect } from "react";

export default function Page() {
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

  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="main">
          <section>
            <div className="container">
              <div className="translate-google">
                <div id="google_translate_element"></div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <Side />
                </div>
                <div className="col-lg-9">
                  <NewsList />
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}
