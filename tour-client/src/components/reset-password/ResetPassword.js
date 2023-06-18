"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from "@/store";
import ResetPasswordForm from "./ResetPasswordForm";
import Alert from "@/components/shared/Alert";

export default function ResetPassword({ token }) {
  const [formValues, setFormValues] = useState({
    password: "",
    passwordConfirm: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const alert = useSelector((state) => state.alerts);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (e.target.id === "password") {
      setFormValues((prev) => {
        const newEmail = { ...prev, password: e.target.value };
        return newEmail;
      });
    }
    if (e.target.id === "passwordConfirm") {
      setFormValues((prev) => {
        const newPasswordConfirm = { ...prev, passwordConfirm: e.target.value };
        return newPasswordConfirm;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_INTERNAL}/api/resetPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formValues, token }),
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
          message: "Your password is successfully reset",
        })
      );

      setSuccessMessage(responseData.message);
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} message={alert.message} />}
      {successMessage ? (
        <h1>{successMessage}</h1>
      ) : (
        <ResetPasswordForm
          formValues={formValues}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </>
  );
}
