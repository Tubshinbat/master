"use client";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactPage from "components/ContactPage";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import { getWebInfo } from "lib/webinfo";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { info } = await getWebInfo();
      setData(info);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  if (!data && loading === true) {
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
          <NotFound />
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="page_breadcrumbs">
        <div className="container"></div>
      </div>
      <ContactPage webInfo={data} />
    </>
  );
}
