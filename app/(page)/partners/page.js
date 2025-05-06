"use client";
import Loader from "components/Generals/Loader";
import SearchMember from "components/Generals/SearchMember";
import Side from "components/Generals/Side";
import Partners from "components/Partners";
import useWorks from "hooks/useWorks";

import { Suspense, useEffect } from "react";

export default function Page() {
  const { works } = useWorks();

  return (
    <>
      <div className="main">
        <SearchMember linkstart="partners" works={works} />
        <div className="section">
          <div className="container">
            <Partners />
          </div>
        </div>
      </div>
    </>
  );
}
