import Login from "@/components/login/Login";
import { getUserInfo } from "@/utils/user-helper";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt");

  let isLogin;

  if (!jwt || jwt.value === "loggedout") {
    isLogin = false;
  }

  if (jwt) {
    const res = await getUserInfo(jwt.value);

    if (res.status === "success") {
      isLogin = true;
    } else {
      isLogin = false;
    }
  }

  return <Login isLogin={isLogin} />;
}
