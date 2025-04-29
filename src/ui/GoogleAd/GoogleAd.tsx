"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function GoogleAd() {
  const adLoaded = useRef(false);

  useEffect(() => {
    if (adLoaded.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adLoaded.current = true;
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8676936217263705"
      data-ad-slot="4413840962"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
