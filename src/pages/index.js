"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { loadFull } from "@tsparticles/engine";
import { Particles } from "@tsparticles/react";

const RotatingPlanet = dynamic(() => import("../components/RotatingPlanet"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  useEffect(() => {
    const glowDiv = document.createElement("div");
    Object.assign(glowDiv.style, {
      position: "fixed",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      pointerEvents: "none",
      opacity: "0.3",
      mixBlendMode: "difference",
      backgroundColor: "white",
      zIndex: "9999",
      transform: "translate(-50%, -50%)",
      transition: "transform 0.05s ease-out",
    });

    document.body.appendChild(glowDiv);
    document.body.style.cursor = "none";

    const handleMouseMove = (e) => {
      glowDiv.style.left = `${e.pageX}px`;
      glowDiv.style.top = `${e.pageY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
      if (document.body.contains(glowDiv)) {
        document.body.removeChild(glowDiv);
      }
    };
  }, []);

  const handleGoToDashboard = () => {
    setLoading(true);
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
        <p>Loading PortfolioHub...</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0d1117] text-white">
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-8 gap-24">
        {/* Contenido centrado */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/logo.png"
            alt="PortfolioHub Logo"
            className="w-32 h-32 mb-6"
          />

          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-md mb-4">
            Welcome to <span className="text-yellow-300">PortfolioHub</span>
          </h1>

          <p className="text-gray-300 mb-8 text-xl max-w-md">
            Show off your GitHub portfolio like never before.
          </p>

          <button
            onClick={handleGoToDashboard}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-lg transition transform hover:scale-105 text-white"
          >
            Go to Dashboard
          </button>

          <div className="mt-8 flex justify-center">
            <a
              href="https://github.com/marichu-kt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5C5.3.5 0 5.8 0 12.3c0 5.2 3.4 9.6 8.2 11.2.6.2.8-.2.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.5-1.3-1.9-1.3-1.9-1-.6.1-.6.1-.6 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.6-.2 2-.4.1-.7.4-1.2.7-1.4-2.6-.3-5.3-1.3-5.3-5.6 0-1.2.4-2.3 1.1-3.1-.1-.3-.5-1.7.1-3.4 0 0 1-.3 3.3 1.2a11.6 11.6 0 0 1 6 0c2.2-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3.1.1 3.4.7.8 1.1 1.9 1.1 3.1 0 4.4-2.7 5.3-5.4 5.6.4.4.7 1 .7 2v2.9c0 .4.2.8.8.6C20.6 21.8 24 17.5 24 12.3 24 5.8 18.7.5 12 .5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
