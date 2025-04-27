"use client";
import React from "react";

export default function AdvancedStats({ repos }) {
  const weeklyUpdates = repos.filter((r) => {
    const updated = new Date(r.updated_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return updated >= weekAgo;
  }).length;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">📊 Advanced Stats</h2>
      <p className="text-gray-700 dark:text-gray-300">
        {weeklyUpdates} repositories updated in the last 7 days.
      </p>
    </div>
  );
}
