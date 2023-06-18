import { cookies } from "next/headers";
import Image from "next/image";
import UserBox from "./UserBox";
import { getUserInfo } from "@/utils/user-helper";
import Link from "next/link";

async function Header() {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt");

  let user = undefined;

  if (jwt) {
    const res = await getUserInfo(jwt.value);

    if (res.status === "success") {
      user = res.data.data;
    }
  }

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link className="nav__el" href="/">
          Next Tour
        </Link>
      </nav>
      <div className="header__logo">
        <Image
          src="/img/logo-main.png"
          alt="logo"
          width={734}
          height={734}
          style={{ height: "4.5rem", width: "100%" }}
          placeholder="empty"
        />
      </div>
      <nav className="nav nav--user">
        <UserBox user={user} />
      </nav>
    </header>
  );
}

export default Header;
