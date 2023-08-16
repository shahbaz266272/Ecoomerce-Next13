import React, { useState, useEffect } from "react";

export const UseOrigin = () => {
  const [mounted, setmounted] = useState(false);

  const origin =
    typeof window !== undefined && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setmounted(true);
  }, []);

  if (!mounted) {
    return "";
  }
  return origin;
};
