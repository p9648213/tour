"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from "@/store";
import Alert from "@/components/shared/Alert";
import ClientOnly from "../shared/ClientOnly";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function Booking({ tour }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const user = useSelector((state) => state.users);
  const alert = useSelector((state) => state.alerts);

  const dispatch = useDispatch();

  function navigateToLogin() {
    router.push("/login");
  }

  async function handleCheckout() {
    setLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_INTERNAL}/api/booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tour.id),
      }
    );

    const responseData = await response.json();

    setLoading(false);

    if (responseData.status === "success") {
      (await stripePromise).redirectToCheckout({
        sessionId: responseData.session.id,
      });
    } else {
      dispatch(
        showAlert({
          type: "error",
          message: responseData.message,
        })
      );
    }
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} message={alert.message} />}
      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <Image
              src="/img/logo-main.png"
              alt="logo"
              width={734}
              height={734}
              style={{ height: "100%", width: "100%" }}
              placeholder="empty"
            />
          </div>
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {tour.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>
            <ClientOnly>
              {user.name ? (
                <button
                  className="btn btn--blue span-all-rows cta__text"
                  onClick={() => handleCheckout()}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Book tour now!"}
                </button>
              ) : (
                <button
                  className="btn btn--blue span-all-rows cta__text"
                  onClick={navigateToLogin}
                >
                  Log in to book tour
                </button>
              )}
            </ClientOnly>
          </div>
        </div>
      </section>
    </>
  );
}
