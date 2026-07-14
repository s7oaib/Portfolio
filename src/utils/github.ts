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
    name: "SafeVision",
    description: "AI-Powered Crime & Weapon Detection System using YOLOv11, OpenCV, and Telegram alerts.",
    html_url: "https://github.com/s7oaib/SafeVision",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    topics: ["yolov11", "opencv", "crime-detection", "federated-learning"],
    updated_at: "2026-07-14T00:00:00Z"
  },
  {
    id: 2,
    name: "inframe",
    description: "AI-powered classroom attendance system with real-time facial recognition, student portal, and analytics.",
    html_url: "https://github.com/s7oaib/inframe",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    topics: ["react", "fastapi", "facial-recognition", "attendance"],
    updated_at: "2026-07-14T00:00:00Z"
  },
  {
    id: 3,
    name: "Hollow",
    description: "S.T.A.R.E. - Next-Generation Fleet Management & Driver Safety Platform with TensorFlow.js.",
    html_url: "https://github.com/s7oaib/Hollow",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    topics: ["nextjs", "tensorflow-js", "fleet-management", "driver-safety"],
    updated_at: "2026-07-14T00:00:00Z"
  },
  {
    id: 4,
    name: "Portfolio",
    description: "Personal portfolio site built with React, TypeScript, and Vite.",
    html_url: "https://github.com/s7oaib/Portfolio",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    topics: ["react", "vite", "typescript", "portfolio"],
    updated_at: "2026-07-14T00:00:00Z"
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
