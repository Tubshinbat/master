"use client";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import PageSide from "components/Generals/PageSide";
import PartnerDetails from "components/PartnerDetails";
import { getMembers, getPartner } from "lib/getFetchers";

import { Suspense, useEffect, useState } from "react";

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const { partner } = await getPartner(params.id);
      if (partner) {
        const { members } = await getMembers(
          `&partner=${partner.name}&limit=100`
        );
        console.log(members);
        setMembers(members);
      }
      setData(partner);
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

  if (loading === true && !data) {
    return (
      <section>
        <div className="container">
          <Loader />;
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section>
        <div className="container">
          <NotFound />;
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
              <div className="row">
                <div className="col-lg-2">
                  <PageSide slug="/partners/" />
                </div>
                <div className="col-lg-10">
                  {!data && <NotFound />}
                  <PartnerDetails data={data} members={members} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}
