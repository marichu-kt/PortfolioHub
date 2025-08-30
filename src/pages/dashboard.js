import { useEffect, useState } from "react";
import { getUserData, getRepos } from "../services/github";
import { getLanguagesData } from "../services/getLanguagesData";

import ThemeSwitch from "../components/ThemeSwitch";
import AnimatedSection from "../components/AnimatedSection";
import LanguageChart from "../components/LanguageChart";
import QRShare from "../components/QRShare";
import PdfExportButton from "../components/PdfExportButton";
import RepoFilters from "../components/RepoFilters";

import Achievements from "../components/Achievements";
import AdvancedStats from "../components/AdvancedStats";
import GitHubCalendarSection from "../components/GitHubCalendarSection";
import LiveCodeEditor from "../components/LiveCodeEditor";
import Skills from "../components/Skills";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [languagesData, setLanguagesData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

        if (!token) {
          throw new Error("GitHub token not found in environment variables.");
        }

        const userData = await getUserData(token);
        setUser(userData);

        const reposData = await getRepos(token);

        const reposWithNoCommits = reposData.map((repo) => ({
          ...repo,
          commits: null,
        }));

        setRepos(reposWithNoCommits);
        setFilteredRepos(reposWithNoCommits);

        // Cargamos los commits en segundo plano
        reposWithNoCommits.forEach(async (repo) => {
          try {
            const res = await fetch(
              `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`,
              {
                headers: {
                  Authorization: `token ${token}`,
                  Accept: "application/vnd.github.v3+json",
                },
              }
            );

            let commits = 1;
            if (res.ok) {
              const linkHeader = res.headers.get("Link");
              const match = linkHeader?.match(/&page=(\d+)>; rel="last"/);
              commits = match ? parseInt(match[1], 10) : 1;
            }

            setRepos((prevRepos) =>
              prevRepos.map((r) =>
                r.id === repo.id ? { ...r, commits } : r
              )
            );
            setFilteredRepos((prevRepos) =>
              prevRepos.map((r) =>
                r.id === repo.id ? { ...r, commits } : r
              )
            );
          } catch (error) {
            console.warn(`Error fetching commits for ${repo.name}:`, error);
          }
        });

        const langs = await getLanguagesData(reposData, token);
        setLanguagesData(langs);
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleFilter = (filtered) => {
    setFilteredRepos(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
        <p>Loading PortfolioHub...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
        <p>Failed to load user data.</p>
      </div>
    );
  }

  return (
    <div
      id="entire-page"
      className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
    >
      <header className="flex items-center justify-between p-5 shadow bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold">PortfolioHub Dashboard</h1>
        <ThemeSwitch />
      </header>

      <main className="max-w-5xl mx-auto py-10 px-4">
        <AnimatedSection>
          <section className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md mb-8">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar_url}
                alt="User Avatar"
                className="w-24 h-24 rounded-full border border-gray-200 dark:border-gray-700"
              />
              <div>
                <h2 className="text-xl font-semibold mb-1">{user.login}</h2>
                {user.bio && <p className="mb-2">{user.bio}</p>}
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View GitHub Profile
                </a>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <Achievements repos={repos} />
        </AnimatedSection>

        <AnimatedSection>
          <AdvancedStats repos={repos} />
        </AnimatedSection>

        <AnimatedSection>
          <section className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">My Repositories</h2>
            <RepoFilters repos={repos} onFilter={handleFilter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="p-4 rounded shadow hover:shadow-lg transition bg-gray-50 dark:bg-gray-700"
                >
                  <h3 className="text-lg font-bold mb-2 text-blue-700 dark:text-blue-300">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {repo.name}
                    </a>
                  </h3>
                  <p className="text-sm mb-2">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                      {repo.language || "Unknown"}
                    </span>
                    <span className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                      ⭐ {repo.stargazers_count}
                    </span>
                    <span className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                      Forks: {repo.forks_count}
                    </span>
                    <span className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                      {repo.commits === null
                        ? "Loading commits..."
                        : `Commits: ${repo.commits}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Overall Languages</h2>
            <p className="text-sm mb-4 text-gray-400 italic">
              Showing actual language usage based on your GitHub repos.
            </p>
            <LanguageChart languagesData={languagesData} />
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <GitHubCalendarSection username={user.login} />
        </AnimatedSection>

        {}
        <AnimatedSection>
          <div className="mt-10">
            <Skills />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <LiveCodeEditor />
        </AnimatedSection>

        <AnimatedSection>
          <section className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md mb-8">
            <QRShare />
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md text-center mb-8">
            <h2 className="text-xl font-bold mb-4">Extra Features (Coming Soon)</h2>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com/marichu-kt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-700 text-white rounded shadow hover:bg-green-800 transition"
              >
                By @marichu_kt
              </a>

              <a
                href="https://github.com/marichu-kt/PortfolioHub"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
              >
                GitHub Repository (PortfolioHub)
              </a>

            </div>
          </section>
        </AnimatedSection>
      </main>

      <footer className="flex items-center justify-center p-4 bg-white dark:bg-gray-800">
        <PdfExportButton />
      </footer>
    </div>
  );
}
