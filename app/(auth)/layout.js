"use client";
import Header from "components/Generals/Header";
import { useAuthContext } from "context/authContext";
import useMenus from "hooks/useMenus";
import useWebInfo from "hooks/useWebInfo";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function RootLayout({ children }) {
  const { user, memberCheck } = useAuthContext();
  const [cookies, removeCookie] = useCookies(["nodetoken"]);
  const { info } = useWebInfo();
  const { menus } = useMenus();
  useEffect(() => {
    const checkData = async () => {
      await memberCheck(cookies.nodetoken);
    };
    if (user) redirect("/profile");
    checkData().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const checkData = async () => {
      await memberCheck(cookies.nodetoken);
    };

    if (cookies && cookies.nodetoken)
      checkData().catch((error) => console.log(error));
    if (user) redirect("/profile");
  }, [cookies, user]);

  return (
    <>
      <Header info={info} menus={menus} />
      {children}
    </>
  );
}
