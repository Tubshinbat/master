"use client";
import Header from "components/Generals/Header";
import { useAuthContext } from "context/authContext";
import useMenus from "hooks/useMenus";
import useWebInfo from "hooks/useWebInfo";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

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
