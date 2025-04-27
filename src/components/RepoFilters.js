"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Listbox } from "@headlessui/react";

export default function RepoFilters({ repos, onFilter }) {
  const [selectedLang, setSelectedLang] = useState("");
  const [sort, setSort] = useState("stars");
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

  const languages = useMemo(() => {
    const builtIn = [
      "Assembly", "C", "C#", "C++", "COBOL", "CSS", "Clojure", "Crystal", "D",
      "Dart", "Delphi", "Dockerfile", "Elixir", "Elm", "Erlang", "F#", "Fortran",
      "Go", "Groovy", "Haskell", "HTML", "Java", "JavaScript", "Julia", "Kotlin",
      "Lua", "MATLAB", "Objective-C", "Perl", "PHP", "PowerShell", "Python",
      "R", "Ruby", "Rust", "Scala", "Shell", "Solidity", "SQL", "Swift", "TeX",
      "TypeScript", "V", "VHDL", "Visual Basic", "Zig"
    ];
    const detected = repos.map((r) => r.language).filter(Boolean);
    return Array.from(new Set([...builtIn, ...detected])).sort();
  }, [repos]);

  const handleFilter = () => {
    let filtered = [...repos];
    if (selectedLang) filtered = filtered.filter((r) => r.language === selectedLang);
    if (sort === "stars") filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
    if (sort === "forks") filtered.sort((a, b) => b.forks_count - a.forks_count);
    if (sort === "updated") filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    onFilter(filtered);
  };

  const baseBg = isDarkMode ? "bg-gray-700" : "bg-white";
  const baseText = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      {/* Lenguaje */}
      <div className="relative w-44">
        <Listbox value={selectedLang} onChange={setSelectedLang}>
          <div className="relative">
            <Listbox.Button className={`w-full px-3 py-2 border rounded shadow ${baseBg} ${baseText}`}>
              {selectedLang || "All Languages"}
            </Listbox.Button>
            <Listbox.Options className={`absolute z-50 mt-1 max-h-48 w-full overflow-y-auto border rounded shadow ${baseBg}`}>
              <Listbox.Option
                key="all"
                value=""
                className={({ active }) =>
                  `px-3 py-1 cursor-pointer ${active ? "bg-blue-500 text-white" : baseText}`
                }
              >
                All Languages
              </Listbox.Option>
              {languages.map((lang) => (
                <Listbox.Option
                  key={lang}
                  value={lang}
                  className={({ active }) =>
                    `px-3 py-1 cursor-pointer ${active ? "bg-blue-500 text-white" : baseText}`
                  }
                >
                  {lang}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* Ordenamiento */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className={`px-3 py-2 border rounded shadow ${baseBg} ${baseText}`}
      >
        <option value="stars">Most Stars</option>
        <option value="forks">Most Forks</option>
        <option value="updated">Recently Updated</option>
      </select>

      {/* Botón aplicar */}
      <button
        onClick={handleFilter}
        className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  );
}
