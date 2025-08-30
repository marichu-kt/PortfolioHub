"use client";

import React, { useEffect, useState } from "react";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

        const res = await fetch(
          "https://api.github.com/user/repos?per_page=100",
          {
            headers: {
              Authorization: `token ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        const repos = await res.json();

        if (!Array.isArray(repos)) {
          throw new Error("Invalid response from GitHub API");
        }

        const languageSet = new Set();

        await Promise.all(
          repos.map(async (repo) => {
            if (repo.languages_url) {
              const resLangs = await fetch(repo.languages_url, {
                headers: {
                  Authorization: `token ${token}`,
                  Accept: "application/vnd.github.v3+json",
                },
              });
              if (resLangs.ok) {
                const data = await resLangs.json();
                Object.keys(data).forEach((lang) => {
                  if (lang) languageSet.add(lang);
                });
              }
            }
          })
        );

        setSkills(Array.from(languageSet).sort());
      } catch (error) {
        console.error("Error fetching GitHub languages:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLanguages();
  }, []);

  const mapToSkillicon = (lang) => {
    const mapping = {
      javascript: "js",
      typescript: "ts",
      python: "py",
      html: "html",
      css: "css",
      scss: "sass",
      less: "less",
      c: "c",
      "c#": "cs",
      csharp: "cs",
      "c++": "cpp",
      cpp: "cpp",
      java: "java",
      kotlin: "kotlin",
      swift: "swift",
      dart: "dart",
      go: "go",
      rust: "rust",
      ruby: "ruby",
      php: "php",
      sql: "mysql",
      shell: "bash",
      batchfile: "bash", // ✅ Batchfile ahora usa el icono de bash
      powershell: "powershell",
      dockerfile: "docker",
      tex: "latex",
      latex: "latex",
      json: "json",
      yaml: "yaml",
      xml: "xml",
      perl: "perl",
      r: "r",
      scala: "scala",
      clojure: "clojure",
      elixir: "elixir",
      erlang: "erlang",
      haxe: "haxe",
      vb: "dotnet",
      visualbasic: "dotnet",
      assembly: "asm",
      makefile: "make",
      cmake: "cmake",
      graphql: "graphql",
      markdown: "markdown",
      terraform: "terraform",
      ansible: "ansible",
      nginx: "nginx",
      apache: "apache",
      mysql: "mysql",
      mariadb: "mysql",
      postgresql: "postgres",
      sqlite: "sqlite",
      redis: "redis",
      mongodb: "mongodb",
      firebase: "firebase",
      supabase: "supabase",
      tailwind: "tailwindcss",
      bootstrap: "bootstrap",
      sass: "sass",
      stylus: "stylus",
      vue: "vue",
      nuxt: "nuxtjs",
      react: "react",
      nextjs: "nextjs",
      astro: "astro",
      angular: "angular",
      svelte: "svelte",
      solidjs: "solidjs",
      jquery: "jquery",
      express: "express",
      node: "nodejs",
      deno: "deno",
      electron: "electron",
      vite: "vite",
      webpack: "webpack",
      parcel: "parcel",
      babel: "babel",
      eslint: "eslint",
      prettier: "prettier",
      jest: "jest",
      mocha: "mocha",
      playwright: "playwright",
      cypress: "cypress",
      githubactions: "githubactions",
      git: "git",
      github: "github",
      gitlab: "gitlab",
      bitbucket: "bitbucket",
      azure: "azure",
      aws: "aws",
      gcp: "gcp",
      digitalocean: "digitalocean",
      vercel: "vercel",
      netlify: "netlify",
      heroku: "heroku",
      linux: "linux",
      ubuntu: "ubuntu",
      debian: "debian",
      arch: "arch",
      manjaro: "manjaro",
      fedora: "fedora",
      raspberrypi: "raspberrypi",
      vscode: "vscode",
      vim: "vim",
      emacs: "emacs",
      figma: "figma",
      photoshop: "ps",
      illustrator: "ai",
      blender: "blender",
      unity: "unity",
      unreal: "unreal",
      godot: "godot",
      android: "android",
      ios: "apple",
      chrome: "chrome",
      firefox: "firefox",
      edge: "edge",
      safari: "safari",
    };

    const slug = lang?.toLowerCase().trim();
    return mapping[slug] || slug || "unknown";
  };

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span role="img" aria-label="tools">
          🛠️
        </span>
        Skills / Technologies
      </h2>

      {loading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading skills...
        </p>
      ) : skills.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No skills found.
        </p>
      ) : (
        <div className="grid grid-cols-6 gap-6 justify-items-center">
          {skills.map((lang, idx) => {
            const skilliconId = mapToSkillicon(lang);

            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition w-24"
              >
                <div className="mb-2">
                  <img
                    src={`https://skillicons.dev/icons?i=${skilliconId}`}
                    alt=""
                    className="w-16 h-16"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/64?text=${encodeURIComponent(
                        (lang || "NA").slice(0, 2).toUpperCase()
                      )}`;
                    }}
                  />
                </div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                  {lang}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
