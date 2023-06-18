"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showAlert } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Alert from "../shared/Alert";
import SignupForm from "./SignupForm";

export default function Signup({ isLogin }) {
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  const [signupSuccess, setSignupSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const alert = useSelector((state) => state.alerts);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_INTERNAL}/api/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );

    const responseData = await response.json();

    setLoading(false);

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
          message: "Sign up successfully",
        })
      );
      setSignupSuccess(true);
      router.refresh();
    }
  };

  const handleInputChange = (e) => {
    if (e.target.id === "name") {
      setFormValues((prev) => {
        const newName = { ...prev, name: e.target.value };
        return newName;
      });
    }

    if (e.target.id === "email") {
      setFormValues((prev) => {
        const newEmail = { ...prev, email: e.target.value };
        return newEmail;
      });
    }

    if (e.target.id === "password") {
      setFormValues((prev) => {
        const newPassword = { ...prev, password: e.target.value };
        return newPassword;
      });
    }

    if (e.target.id === "passwordConfirm") {
      setFormValues((prev) => {
        const newPasswordConfirm = { ...prev, passwordConfirm: e.target.value };
        return newPasswordConfirm;
      });
    }
  };

  useEffect(() => {
    if (signupSuccess) {
      const navigate = setTimeout(() => {
        router.replace("/");
      }, 3000);

      return () => {
        clearTimeout(navigate);
      };
    }
  }, [signupSuccess, router]);

  return (
    <>
      {alert.show && <Alert type={alert.type} message={alert.message} />}
      {isLogin && signupSuccess === false ? (
        <div>
          <h1>You are logged in</h1>
          <Link href="/" replace={true}>
            <h1>Go to home</h1>
          </Link>
        </div>
      ) : signupSuccess ? (
        <h1>
          Your account have been created ! You will be automatically redirected
          to home page in 3 seconds
        </h1>
      ) : (
        <SignupForm
          formValues={formValues}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </>
  );
}
