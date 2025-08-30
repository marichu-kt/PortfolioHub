"use client";
import React from "react";

export default function Achievements({ repos }) {
  if (!repos || !Array.isArray(repos)) return null;

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
  const totalRepos = repos.length;
  const avgStars = totalRepos > 0 ? (totalStars / totalRepos).toFixed(2) : 0;
  const usedLanguages = [...new Set(repos.map(r => r.language).filter(Boolean))];

  const commitsAvailable = repos.some((r) => typeof r.commits === "number");
  const totalCommits = commitsAvailable
    ? repos.reduce((sum, r) => sum + (r.commits || 0), 0)
    : null;

  const badges = [];
  if (totalStars > 100) badges.push("🌟 Star Master");
  if (totalCommits > 500) badges.push("🔥 Commit Hero");
  if (totalRepos > 20) badges.push("📦 Repo Collector");

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">🏅 Achievements</h2>
      <ul className="space-y-2 text-gray-800 dark:text-gray-100">
        <li>⭐ Total Stars: <strong>{totalStars}</strong></li>
        <li>🍴 Total Forks: <strong>{totalForks}</strong></li>
        <li>📂 Total Repositories: <strong>{totalRepos}</strong></li>
        <li>📊 Avg. Stars per Repo: <strong>{avgStars}</strong></li>
        <li>📈 Total Commits: <strong>{totalCommits !== null ? totalCommits : "Not available"}</strong></li>
        <li>🏷️ Languages Used: <strong>{usedLanguages.length}</strong></li>
      </ul>

      {badges.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">🏆 Badges</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((b, i) => (
              <span key={i} className="px-2 py-1 bg-yellow-100 dark:bg-yellow-600 text-sm rounded">
                {b}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
