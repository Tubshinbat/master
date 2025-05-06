"use client";

import SearchMember from "components/Generals/SearchMember";
import MemberList from "components/MemberList";
import useWorks from "hooks/useWorks";

export default function Page() {
  const { works } = useWorks();
  return (
    <>
      <div className="main">
        <SearchMember linkstart="members" works={works} />
        <div className="section">
          <div className="container">
            <MemberList plusQuery="memberShip=false" />
          </div>
        </div>
      </div>
    </>
  );
}
