import Signup from "@/components/signup/Signup";
import { getUserInfo } from "@/utils/user-helper";
import { cookies } from "next/headers";

export default async function SignupPage() {
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

  return <Signup isLogin={isLogin} />;
}
