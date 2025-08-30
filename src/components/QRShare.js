"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRShare() {
  const url = "https://github.com/marichu-kt";
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    const checkDarkMode = () => {
      setIsDarkMode(html.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Share my PortfolioHub through QR!</h2>
      <div className="inline-block max-w-fit bg-white dark:bg-gray-800 p-3 rounded-md">
        <QRCodeCanvas
          value={url}
          size={280}
          bgColor={isDarkMode ? "#1f2937" : "#ffffff"}
          fgColor={isDarkMode ? "#ffffff" : "#000000"}
          includeMargin={true}
        />
      </div>
    </div>
  );
}
