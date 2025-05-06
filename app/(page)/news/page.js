"use client";
import Loader from "components/Generals/Loader";
import Search from "components/Generals/Search";
import NewsList from "components/News/NewsList";
import Side from "components/News/Side";
import useWorks from "hooks/useWorks";

import { Suspense, useEffect } from "react";

export default function Page() {
  const { works } = useWorks();
  return (
    <>
      <div className="main">
        <Search works={works} />
        <section>
          <div className="container">
            <NewsList />
          </div>
        </section>
      </div>
    </>
  );
}
