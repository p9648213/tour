"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { showAlert } from "@/store";

export default function UserForm() {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
  });

  const [photo, setPhoto] = useState();

  const [isPhotoSelected, setIsPhotoSelected] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.id === "name") {
      setUserInfo((prev) => {
        const newName = { ...prev, name: e.target.value };
        return newName;
      });
    }
    if (e.target.id === "email") {
      setUserInfo((prev) => {
        const newEmail = { ...prev, email: e.target.value };
        return newEmail;
      });
    }
    if (e.target.id === "photo") {
      setPhoto(e.target.files);
      setIsPhotoSelected(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("email", userInfo.email);
    if (isPhotoSelected) {
      formData.append("photo", photo[0]);
    }

    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_INTERNAL}/api/updateProfile`,
      {
        method: "POST",
        body: formData,
      }
    );

    const responseData = await res.json();

    setLoading(false);

    if (responseData.status === "success") {
      dispatch(
        showAlert({
          type: "success",
          message: "Updated successfully",
        })
      );
      router.refresh();
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
      {user.name ? (
        <form
          className="form form-user-data"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="form__input"
              type="text"
              autoComplete="new-password"
              value={userInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              type="email"
              autoComplete="new-password"
              value={userInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form__group form__photo-upload">
            <Image
              className="form__user-photo"
              width={128}
              height={128}
              src={
                isPhotoSelected
                  ? URL.createObjectURL(photo[0])
                  : `${
                      user.photo === "default.webp"
                        ? "/img/default.webp"
                        : user.photo
                    }`
              }
              alt="User photo"
              placeholder="empty"
            />
            <input
              id="photo"
              name="photo"
              type="file"
              className="form__upload"
              typeof="file"
              accept="image/*"
              onChange={handleInputChange}
            />
            <label htmlFor="photo">Choose new photo</label>
          </div>
          <div className="form__group right">
            <button
              type="submit"
              className="btn btn--small btn--blue"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save Settings"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1>You are not logged in.</h1>
          <h1>Please login to see your account details.</h1>
        </>
      )}
    </>
  );
}
