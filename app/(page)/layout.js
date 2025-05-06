"use client";
import Header from "components/Generals/Header";
import useMenus from "hooks/useMenus";
import useWebInfo from "hooks/useWebInfo";

export default function RootLayout({ children }) {
  const { info } = useWebInfo();
  const { menus } = useMenus();

  return (
    <>
      <Header info={info} menus={menus} />

      {children}
    </>
  );
}
