"use client";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import PageSide from "components/Generals/PageSide";
import PartnerDetails from "components/PartnerDetails";
import { getCourse, getMembers, getPartner } from "lib/getFetchers";

import { Suspense, useEffect, useState } from "react";

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coursies, setCoursies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { partner } = await getPartner(params.id);
      if (partner) {
        const { members } = await getMembers(
          `&partner=${partner.name}&limit=100`
        );

        const { courses } = await getCourse(
          `&partner=${partner._id}&limit=100`
        );

        setCoursies(courses || []);
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
              <div className="row">
                <div className="col-lg-12">
                  {!data && <NotFound />}
                  <PartnerDetails
                    data={data}
                    members={members}
                    coursies={coursies}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}
