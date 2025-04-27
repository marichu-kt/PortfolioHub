"use client";

import React, { useEffect, useState } from "react";
import { languageIcons } from "../utils/languageIcons";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

        const res = await fetch("https://api.github.com/user/repos?per_page=100", {
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        const repos = await res.json();

        if (!Array.isArray(repos)) throw new Error("Invalid response from GitHub API");

        const languageSet = new Set();
        repos.forEach((repo) => {
          if (repo.language) languageSet.add(repo.language);
        });

        setSkills(Array.from(languageSet).sort());
      } catch (error) {
        console.error("Error fetching GitHub languages:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLanguages();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">🛠️ Skills / Technologies</h2>

      {loading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading skills...</p>
      ) : skills.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No skills found.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
          {skills.map((lang) => {
            const IconComponent = languageIcons[lang];

            return (
              <div
                key={lang}
                className="flex flex-col items-center text-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
              >
                <div className="mb-2 text-4xl">
                  {IconComponent ? (
                    <IconComponent className="text-5xl" />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full text-gray-700 dark:text-white text-lg font-semibold">
                      {lang.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{lang}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}