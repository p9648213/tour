"use client";

import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeAlert } from "@/store";

function Alert({ type, message }) {
  const alert = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert.show) {
      const closeAlertTimeout = setTimeout(() => {
        dispatch(closeAlert());
      }, 5000);

      return () => {
        clearTimeout(closeAlertTimeout);
      };
    }
  }, [alert.show, dispatch]);

  return ReactDOM.createPortal(
    <div className={`alert alert--${type}`}>{message}</div>,
    document.body
  );
}

export default Alert;
