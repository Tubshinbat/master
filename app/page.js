"use client";
import Header from "components/Generals/Header";
import LineWorkList from "components/Generals/LineWorkList";
import Search from "components/Generals/Search";
import HomeCompany from "components/Home/HomeCompany";
import HomeExperts from "components/Home/HomeExperts";
import useCompany from "hooks/useCompany";
import useMenus from "hooks/useMenus";
import useWebInfo from "hooks/useWebInfo";
import useWorks from "hooks/useWorks";

import { Suspense, useEffect } from "react";

export default function Page() {
  const { info } = useWebInfo();
  const { menus } = useMenus();
  const { works } = useWorks();
  const { companies } = useCompany();

  return (
    <>
      <Header info={info} menus={menus} />
      <Search works={works} />
      <LineWorkList works={works} />
      <HomeCompany companies={companies} />
      <HomeExperts />

      <section className="section"></section>
    </>
  );
}
