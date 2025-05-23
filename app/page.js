"use client";
import Header from "components/Generals/Header";
import LineWorkList from "components/Generals/LineWorkList";
import Search from "components/Generals/Search";
import HomeCompany from "components/Home/HomeCompany";
import HomeExperts from "components/Home/HomeExperts";
import HomeNewMembers from "components/Home/HomeNewMembers";
import HomeNews from "components/Home/HomeNews";
import useCompany from "hooks/useCompany";
import useMembers from "hooks/useMembers";
import useMenus from "hooks/useMenus";
import useNews from "hooks/useNews";
import useWebInfo from "hooks/useWebInfo";
import useWorks from "hooks/useWorks";

export default function Page() {
  const { info } = useWebInfo();
  const { menus } = useMenus();
  const { works } = useWorks();
  const { companies } = useCompany();
  const { experts, members } = useMembers();
  const { news } = useNews();

  return (
    <>
      <Header info={info} menus={menus} />
      <Search works={works} />
      <LineWorkList works={works} />
      <HomeCompany companies={companies} />
      <HomeExperts members={experts} />
      <HomeNewMembers members={members} />
      <HomeNews news={news} />
    </>
  );
}
