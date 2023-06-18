"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from "@/store";

export default function PasswordForm() {
  const [passwordConfig, setPasswordConfig] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (e.target.id === "password-current") {
      setPasswordConfig((prev) => {
        const newCurrentPassword = { ...prev, passwordCurrent: e.target.value };
        return newCurrentPassword;
      });
    }
    if (e.target.id === "password") {
      setPasswordConfig((prev) => {
        const newPassword = { ...prev, password: e.target.value };
        return newPassword;
      });
    }
    if (e.target.id === "password-confirm") {
      setPasswordConfig((prev) => {
        const newConfirmPassword = { ...prev, passwordConfirm: e.target.value };
        return newConfirmPassword;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_INTERNAL}/api/changePassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordConfig),
      }
    );

    const responseData = await res.json();

    setLoading(false);

    if (responseData.status === "success") {
      dispatch(
        showAlert({
          type: "success",
          message: "Password changed successfully",
        })
      );

      const initialPasswordState = {
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
      };

      setPasswordConfig(initialPasswordState);
    } else {
      dispatch(
        showAlert({
          type: "error",
          message: responseData.message,
        })
      );
    }
  };

  return (
    <>
      {user.name && (
        <form className="form form-user-password" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="password-current">
              Current password
            </label>
            <input
              id="password-current"
              className="form__input"
              type="password"
              placeholder="••••••••"
              value={passwordConfig.passwordCurrent}
              required
              minLength={8}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="password">
              New password
            </label>
            <input
              id="password"
              className="form__input"
              type="password"
              placeholder="••••••••"
              value={passwordConfig.password}
              required
              minLength={8}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__group ma-bt-lg">
            <label className="form__label" htmlFor="password-confirm">
              Confirm password
            </label>
            <input
              id="password-confirm"
              className="form__input"
              type="password"
              placeholder="••••••••"
              value={passwordConfig.passwordConfirm}
              required
              minLength={8}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__group right">
            <button
              type="submit"
              className="btn btn--small btn--blue"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save password"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
