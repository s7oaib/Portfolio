export interface Skill {
  name: string;
  category: 'Languages' | 'AI/ML' | 'Computer Vision' | 'Web Dev' | 'Tools';
  level: number; // 1-5 star or scale
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
  tags: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  description?: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  aboutLong: string;
  avatarUrl: string;
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}

export const profileData: Profile = {
  name: "Shoaib Jamadar",
  title: "AI & ML Student | Quantum Computing Research Intern",
  bio: "Building computer vision, multi-agent AI, and full-stack systems. Skilled in Python, TensorFlow, PyTorch, OpenCV, and React/Node.js.",
  aboutLong: "I'm an AI & Machine Learning student and Quantum Computing Research Intern with hands-on experience building computer vision, multi-agent AI, and full-stack systems. Skilled in Python, TensorFlow, PyTorch, OpenCV, and React/Node.js, with proven results shipping production-style projects.\n\nI recently built SafeVision, a real-time crime detection system with fine-tuned YOLOv11, classifying violence and weapons from CCTV feeds at 30 FPS. I also created Air Canvas, a gesture-controlled drawing application using MediaPipe hand tracking, and P.H.O.E.N.I.X., a multi-agent AI desktop assistant with a 4-level hierarchy.\n\nBeyond individual projects, I'm interested in long-term questions around adaptive computing, context-aware AI systems, and software that can learn from and adapt to the people who use it. I'm currently seeking Machine Learning Engineer, AI Engineer, and Computer Vision Engineer roles where I can continue building intelligent systems and contribute to challenging engineering problems.",
  avatarUrl: "/avatar.png",
  resumeUrl: "/Shoaib Jamadar Resume.pdf",
  socials: {
    github: "https://github.com/s7oaib",
    linkedin: "https://www.linkedin.com/in/shoaib-jamadar77/",
    email: "s7oaibjamadar@gmail.com"
  },
  skills: [
    { name: "Python", category: "Languages", level: 3 },
    { name: "Java", category: "Languages", level: 2 },
    { name: "JavaScript", category: "Languages", level: 3 },
    { name: "TensorFlow", category: "AI/ML", level: 3 },
    { name: "PyTorch", category: "AI/ML", level: 3 },
    { name: "Scikit-learn", category: "AI/ML", level: 2 },
    { name: "Pandas", category: "AI/ML", level: 2 },
    { name: "NumPy", category: "AI/ML", level: 2 },
    { name: "OpenCV", category: "Computer Vision", level: 3 },
    { name: "MediaPipe", category: "Computer Vision", level: 3 },
    { name: "YOLOv8/YOLOv11", category: "Computer Vision", level: 3 },
    { name: "React.js", category: "Web Dev", level: 3 },
    { name: "Node.js", category: "Web Dev", level: 2 },
    { name: "FastAPI", category: "Web Dev", level: 3 },
    { name: "Flask", category: "Web Dev", level: 2 },
    { name: "MongoDB", category: "Tools", level: 2 },
    { name: "Docker", category: "Tools", level: 2 },
    { name: "Git", category: "Tools", level: 3 },
    { name: "Google Cloud Platform", category: "Tools", level: 2 }
  ],
  experience: [
    {
      role: "Research Intern - Quantum Computing",
      company: "M R A Gurus Private Limited, Bengaluru",
      duration: "Oct 2025 - Present",
      description: [
        "Research and develop Quantum Computing concepts and applications as part of a 1-year internship program.",
        "Built AI automation pipelines and AI video generation workflows, reducing manual content-production time.",
        "Developed full-stack web applications using React.js and Node.js/Express.js, delivering end-to-end features."
      ],
      tags: ["Python", "React.js", "Node.js", "Quantum Computing"]
    },
    {
      role: "AI & ML Student",
      company: "HKBK College of Engineering, Bengaluru",
      duration: "2023 - 2027",
      description: [
        "Built SafeVision - real-time crime detection system with fine-tuned YOLOv11 at 30 FPS.",
        "Created Air Canvas - gesture-controlled drawing application using MediaPipe hand tracking.",
        "Architecting P.H.O.E.N.I.X. - multi-agent AI desktop assistant with 4-level hierarchy."
      ],
      tags: ["Python", "TensorFlow", "PyTorch", "OpenCV", "YOLOv8"]
    }
  ],
  education: [
    {
      degree: "B.E. - Artificial Intelligence & Machine Learning",
      institution: "HKBK College of Engineering, Bengaluru",
      duration: "2023 - 2027",
      description: "Focused on AI/ML, Computer Vision, and Full-Stack Development."
    }
  ]
};
