"use client";
import Loader from "components/Generals/Loader";
import SearchMember from "components/Generals/SearchMember";
import MemberList from "components/MemberList";
import useWorks from "hooks/useWorks";
import { Suspense, useEffect } from "react";

export default function Page() {
  const { works } = useWorks();

  return (
    <>
      <div className="main">
        <SearchMember linkstart="experts" works={works} />
        <div className="section">
          <div className="container">
            <Suspense fallback={<Loader />}>
              <MemberList plusQuery="memberShip=true" />{" "}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
