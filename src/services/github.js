export async function getUserData() {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) {
    console.error("GitHub token is missing in environment variables.");
    throw new Error("GitHub token is missing.");
  }

  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("GitHub API error (getUserData):", res.status, errorText);
    throw new Error(`Failed to fetch user data: ${res.status}`);
  }

  return res.json();
}

export async function getRepos() {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) {
    console.error("GitHub token is missing in environment variables.");
    throw new Error("GitHub token is missing.");
  }

  const res = await fetch("https://api.github.com/user/repos?per_page=100", {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("GitHub API error (getRepos):", res.status, errorText);
    throw new Error(`Failed to fetch repositories: ${res.status}`);
  }

  const repos = await res.json();

  const reposWithCommits = await Promise.all(
    repos.map(async (repo) => {
      try {
        const commitRes = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`,
          {
            headers: {
              Authorization: `token ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!commitRes.ok) {
          const commitErrorText = await commitRes.text();
          console.error(
            `GitHub API error (commits for ${repo.name}):`,
            commitRes.status,
            commitErrorText
          );
          return { ...repo, commits: 0 };
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
