"use client";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import PageSide from "components/Generals/PageSide";
import MemberDetials from "components/MemberDetials";
import { getMember } from "lib/getFetchers";
import { Suspense, useEffect, useState } from "react";

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [alternativeMembers, setAlternativeMembers] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      const { member, alternativeMembers } = await getMember(params.id);
      setData(member);
      setAlternativeMembers(alternativeMembers);
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
            <div className="container">
              <div className="translate-google">
                <div id="google_translate_element"></div>
              </div>
              <div className="row flex-column-reverse flex-lg-row">
                <div className="col-lg-2 col-md-12">
                  <PageSide />
                </div>

                <div className="col-lg-10 col-md-12">
                  {data && (
                    <MemberDetials
                      data={data}
                      alternativeMembers={alternativeMembers}
                    />
                  )}

                  {!data && <NotFound />}
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}
