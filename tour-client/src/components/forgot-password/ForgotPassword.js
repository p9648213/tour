"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from "@/store";
import ForgotPasswordForm from "./ForgotPasswordForm";
import Alert from "@/components/shared/Alert";

export default function ForgotPassword() {
  const [formValues, setFormValues] = useState({
    email: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const alert = useSelector((state) => state.alerts);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (e.target.id === "email") {
      setFormValues((prev) => {
        const newEmail = { ...prev, email: e.target.value };
        return newEmail;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_INTERNAL}/api/forgotPassword`,
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
          message: "Email sent to your inbox",
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
        <ForgotPasswordForm
          formValues={formValues}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </>
  );
}
