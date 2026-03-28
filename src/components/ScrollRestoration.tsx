"use client";

import { useEffect } from "react";

/** Sets manual scroll restoration without a raw <script> in the RSC tree (avoids Next.js client-render warnings). */
export function ScrollRestoration() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);
  return null;
}
