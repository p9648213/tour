"use client";

import { revalidateCache } from "@/utils/server-action";
import { useRef, useState } from "react";

export default function ManageTour() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await revalidateCache(inputRef.current.value);

    inputRef.current.value = "";

    if (res === 1) {
      setSuccessMessage("Revalidate successfully");
      setErrorMessage("");
    } else {
      setSuccessMessage("");
      setErrorMessage(res);
    }
  };

  return (
    <form className="sidebar-content__container" onSubmit={handleSubmit}>
      <h1>Manage Tour</h1>
      <div className="input-tag__container">
        <label htmlFor="tag">Tag Name: </label>
        <input
          type="text"
          id="tag"
          autoComplete="new-password"
          ref={inputRef}
        />
        <button className="btn btn--blue" type="submit">
          Revalidate
        </button>
      </div>
      {errorMessage && <h2 className="revalidate-error">{errorMessage}</h2>}
      {successMessage && (
        <h2 className="revalidate-success">{successMessage}</h2>
      )}
    </form>
  );
}
