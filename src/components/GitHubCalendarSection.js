"use client";

import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";

export default function GitHubCalendarSection() {
  const [username, setUsername] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      if (typeof window !== "undefined") {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      }
    };

    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchUsername() {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const res = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        const data = await res.json();
        setUsername(data.login);
      } catch (err) {
        console.error("Error fetching GitHub username:", err);
      }
    }

    fetchUsername();
  }, []);

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">📅 GitHub Activity Calendar</h2>
      {username ? (
        <div className="overflow-x-auto flex justify-center">
          <GitHubCalendar
            username={username}
            blockSize={13}
            blockMargin={4}
            fontSize={14}
            colorScheme={isDarkMode ? "dark" : "light"} // ← ¡Aquí se aplica!
          />
        </div>
      ) : (
        <p className="text-gray-500">Loading calendar...</p>
      )}
    </div>
  );
}
