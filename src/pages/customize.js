// pages/customize.js
import { useState, useEffect } from "react";

export default function CustomizePage() {
  const [showRepos, setShowRepos] = useState(true);
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    // Load saved prefs from localStorage
    const saved = JSON.parse(localStorage.getItem("portfolioPrefs")) || {};
    if (saved.showRepos !== undefined) setShowRepos(saved.showRepos);
    if (saved.tagline !== undefined) setTagline(saved.tagline);
  }, []);

  function handleSave() {
    // Save to localStorage
    localStorage.setItem(
      "portfolioPrefs",
      JSON.stringify({ showRepos, tagline })
    );
    alert("Preferences saved!");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customize Your Portfolio</h1>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={showRepos}
            onChange={(e) => setShowRepos(e.target.checked)}
          />
          <span className="ml-2">Show Repositories Section</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Tagline:</label>
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="border px-2 py-1"
        />
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white">
        Save Preferences
      </button>
    </div>
  );
}
