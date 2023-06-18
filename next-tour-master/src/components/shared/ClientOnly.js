"use client";

import { useState, useEffect } from "react";

export default function ClientOnly({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="loading-container">
        <h1 className="loading" style={{ color: "gray" }}>
          Loading...
        </h1>
      </div>
    );
  }

  return <>{children}</>;
}
