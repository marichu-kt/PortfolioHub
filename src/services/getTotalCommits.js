// src/services/getTotalCommits.js

export async function getTotalCommits(repos, token) {
    let totalCommits = 0;
  
    for (const repo of repos) {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${repo.full_name}/commits?per_page=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const linkHeader = res.headers.get("Link");
        if (linkHeader) {
          const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
          if (match) {
            totalCommits += parseInt(match[1], 10);
          } else {
            totalCommits += 1;
          }
        } else {
          const commits = await res.json();
          if (Array.isArray(commits)) totalCommits += commits.length;
        }
      } catch (err) {
        console.error(`Error fetching commits for ${repo.name}:`, err);
      }
    }
  
    return totalCommits;
  }
  