"use client";

import Link from "next/link";
import Image from "next/image";
import Alert from "../shared/Alert";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { showAlert } from "@/store";
import { setUserInfo, clearUserInfo } from "@/store";

function UserBox({ user }) {
  const alert = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      dispatch(setUserInfo(user));
    }
  }, [user, dispatch]);

  const handleLogout = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_INTERNAL}/api/logout`
    );

    const responseData = await res.json();

    if (responseData.status === "fail") {
      dispatch(
        showAlert({
          type: "error",
          message: responseData.message,
        })
      );
    } else {
      dispatch(
        showAlert({
          type: "success",
          message: "Logged out successfully",
        })
      );
      dispatch(clearUserInfo());
      router.refresh();
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} message={alert.message} />}
      {user ? (
        <>
          <button
            className="nav__el nav__el--logout"
            onClick={() => handleLogout()}
          >
            Log out
          </button>
          <Link className="nav__el" href={`user/myprofile`}>
            <Image
              className="nav__user-img"
              href="#"
              src={`${
                user.photo === "default.webp" ? "/img/default.webp" : user.photo
              }`}
              alt={`Photo of ${user.name}`}
              width={128}
              height={128}
              placeholder="empty"
            />
            <span>{user.name.split(" ")[0]}</span>
          </Link>
        </>
      ) : (
        <>
          <Link href="/login" className="nav__el">
            Login
          </Link>
          <Link href="/signup" className="nav__el nav__el--cta">
            Sign up
          </Link>
        </>
      )}
    </>
  );
}

export default UserBox;
