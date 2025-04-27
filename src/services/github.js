// src/services/github.js

export async function getUserData() {
  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
}

export async function getRepos() {
  const res = await fetch("https://api.github.com/user/repos?per_page=100", {
    headers: {
      Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch repositories");
  }

  const repos = await res.json();

  const reposWithCommits = await Promise.all(
    repos.map(async (repo) => {
      try {
        const commitRes = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`,
          {
            headers: {
              Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
            }
          }
        );

        if (!commitRes.ok) {
          throw new Error(`Error fetching commits for ${repo.name}`);
        }

        const linkHeader = commitRes.headers.get("Link");
        const match = linkHeader?.match(/&page=(\d+)>; rel="last"/);

        const commitCount = match ? parseInt(match[1], 10) : 1;

        return { ...repo, commits: commitCount };
      } catch (error) {
        console.warn(`Error fetching commits for ${repo.name}:`, error);
        return { ...repo, commits: 0 };
      }
    })
  );

  return reposWithCommits;
}
