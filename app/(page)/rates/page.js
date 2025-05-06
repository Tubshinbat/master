"use client";
import Loader from "components/Generals/Loader";
import Search from "components/Generals/Search";
import SearchMember from "components/Generals/SearchMember";
import Side from "components/Generals/Side";
import RateMembers from "components/RateMembers";
import useWorks from "hooks/useWorks";
import { Suspense, useEffect } from "react";
export default function Page() {
  const { works } = useWorks();
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="main">
          <SearchMember linkstart="rates" works={works} />
          <div className="container">
            <section>
              <RateMembers />
            </section>{" "}
          </div>
        </div>
      </Suspense>
    </>
  );
}
