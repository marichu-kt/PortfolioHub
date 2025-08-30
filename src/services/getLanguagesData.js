export async function getLanguagesData(repos, token) {
    const headers = {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    };
  
    const languagesTotals = {};
  
    for (const repo of repos) {
      const res = await fetch(repo.languages_url, { headers });
      const data = await res.json();
  
      for (const [lang, bytes] of Object.entries(data)) {
        if (languagesTotals[lang]) {
          languagesTotals[lang] += bytes;
        } else {
          languagesTotals[lang] = bytes;
        }
      }
    }
  
    return languagesTotals;
  }
  