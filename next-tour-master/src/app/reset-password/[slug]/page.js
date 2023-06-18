import ResetPassword from "@/components/reset-password/ResetPassword";

export default function ResetPasswordPage({ params }) {
  const { slug } = params;

  return <ResetPassword token={slug} />;
}
import React from "react";
