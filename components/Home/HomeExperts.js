import Link from "next/link";
import React from "react";

const HomeExperts = () => {
  return (
    <>
      {" "}
      <div className="section">
        <div className="container">
          <div className="section__header">
            <h4>Экспертүүд</h4>
            <Link href="/experts">Цааш харах</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeExperts;
