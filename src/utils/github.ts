export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
}

// Fallback data to display in case of API rate limits or network issues.
const fallbackRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "project-attendance",
    description: "An event management and attendance tracking system with python backend and react dashboard.",
    html_url: "https://github.com/s7oaib/project-attendance",
    stargazers_count: 5,
    forks_count: 0,
    language: "Python",
    topics: ["fastapi", "react", "attendance-tracker", "sqlite"],
    updated_at: "2026-07-14T00:00:00Z"
  },
  {
    id: 2,
    name: "shoaib-portfolio",
    description: "A premium personal portfolio website built with React, Vite, TypeScript and custom glassmorphism styling.",
    html_url: "https://github.com/s7oaib/shoaib-portfolio",
    stargazers_count: 2,
    forks_count: 0,
    language: "TypeScript",
    topics: ["react", "vite", "typescript", "css-grid", "glassmorphism"],
    updated_at: "2026-07-14T00:00:00Z"
  },
  {
    id: 3,
    name: "python-utilities",
    description: "A collection of script automation, database helpers and API connectors written in Python.",
    html_url: "https://github.com/s7oaib/python-utilities",
    stargazers_count: 1,
    forks_count: 0,
    language: "Python",
    topics: ["python", "scripts", "automation", "api-wrapper"],
    updated_at: "2026-06-10T00:00:00Z"
  }
];

export async function fetchGitHubRepos(username: string = "s7oaib"): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    const data: GitHubRepo[] = await response.json();
    
    // Filter out forks and sort by stargazers_count & updated_at
    const sortedRepos = data
      .filter((repo) => !repo.forks_count || repo.stargazers_count >= 0) // include personal repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    return sortedRepos.length > 0 ? sortedRepos : fallbackRepos;
  } catch (error) {
    console.warn("Failed to fetch from GitHub API, using local fallback repos:", error);
    return fallbackRepos;
  }
}
