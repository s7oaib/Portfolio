import { useState, useEffect } from 'react';
import { profileData } from './data/profileData';
import { fetchGitHubRepos, type GitHubRepo } from './utils/github';

export default function App() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [filterLang, setFilterLang] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    async function loadRepos() {
      setLoading(true);
      const data = await fetchGitHubRepos();
      setRepos(data);
      setLoading(false);
    }
    loadRepos();

    // Scroll listener for Nav highlight
    const handleScroll = () => {
      const sections = ['about', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter languages list
  const uniqueLanguages = ['All', ...new Set(repos.map(r => r.language).filter(Boolean) as string[])];

  const filteredRepos = repos.filter(repo => {
    const matchesLang = filterLang === 'All' || repo.language === filterLang;
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLang && matchesSearch;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  return (
    <>
      {/* Header / Navigation */}
      <header className="header">
        <a href="#about" className="logo">
          {profileData.name} <span className="logo-dot"></span>
        </a>
        <nav className="nav-links">
          <a 
            href="#about" 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => setActiveSection('about')}
          >
            About
          </a>
          <a 
            href="#projects" 
            className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveSection('projects')}
          >
            Projects
          </a>
          <a 
            href="#skills" 
            className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveSection('skills')}
          >
            Skills
          </a>
          <a 
            href="#experience" 
            className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveSection('experience')}
          >
            Experience
          </a>
          <a 
            href="#contact" 
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveSection('contact')}
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="about">
        <div className="hero-container">
          <div className="hero-content">
            <p className="hero-subtitle">{profileData.title}</p>
            <h1 className="hero-title">
              Hi, I'm <span>{profileData.name}</span>
            </h1>
            <p className="hero-desc">{profileData.bio}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View Projects</a>
              <a href={`mailto:${profileData.socials.email}`} className="btn btn-secondary">
                {profileData.socials.email}
              </a>
              <a 
                href={profileData.resumeUrl} 
                download="Shoaib_Jamadar_Resume.pdf" 
                className="btn btn-secondary"
                target="_blank" 
                rel="noreferrer"
              >
                Download Resume
              </a>
            </div>
          </div>
          <div className="avatar-showcase">
            <div className="avatar-wrapper">
              <img src={profileData.avatarUrl} alt={profileData.name} className="avatar-image" />
            </div>
            <div className="avatar-glow"></div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="section-header">
          <p className="section-subtitle">Portfolio</p>
          <h2 className="section-title">GitHub Repositories</h2>
        </div>

        {/* Filter and Search Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', marginBottom: '32px' }}>
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
          />
          <div className="projects-filter-bar">
            {uniqueLanguages.map(lang => (
              <button
                key={lang}
                onClick={() => setFilterLang(lang)}
                className={`filter-badge ${filterLang === lang ? 'active' : ''}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'hsl(var(--text-secondary))', fontFamily: 'var(--font-mono)' }}>
            Loading repositories from GitHub...
          </div>
        ) : (
          <div className="projects-grid">
            {filteredRepos.map(repo => (
              <div key={repo.id} className="glass-card">
                <div className="repo-header">
                  <span className="repo-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </span>
                  <div className="repo-stats">
                    <span className="repo-stat-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      {repo.stargazers_count}
                    </span>
                  </div>
                </div>
                <h3 className="repo-name">{repo.name}</h3>
                <p className="repo-desc">{repo.description || "No description provided."}</p>
                <div className="repo-tech-tags">
                  {repo.language && <span className="tech-tag" style={{ border: '1px solid hsl(var(--accent-secondary) / 0.3)' }}>{repo.language}</span>}
                  {repo.topics?.slice(0, 3).map(topic => (
                    <span key={topic} className="tech-tag">{topic}</span>
                  ))}
                </div>
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-link">
                  View Source Code 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="section-header">
          <p className="section-subtitle">Proficiencies</p>
          <h2 className="section-title">My Tech Stack</h2>
        </div>
        <div className="skills-container">
          {['Languages', 'AI/ML', 'Computer Vision', 'Web Dev', 'Tools'].map(cat => {
            const catSkills = profileData.skills.filter(s => s.category === cat);
            return (
              <div key={cat} className="skills-category">
                <h3 className="skills-category-title">{cat}</h3>
                {catSkills.map(skill => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      <span>{skill.level * 20}%</span>
                    </div>
                    <div className="skill-bar-container">
                      <div className="skill-bar" style={{ width: `${skill.level * 20}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience">
        <div className="section-header">
          <p className="section-subtitle">Journey</p>
          <h2 className="section-title">Work Experience</h2>
        </div>
        <div className="timeline">
          {profileData.experience.map((exp, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-meta">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <span className="timeline-company">{exp.company}</span>
                  </div>
                  <span className="timeline-duration">{exp.duration}</span>
                </div>
                <ul className="timeline-desc">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} style={{ color: 'hsl(var(--text-secondary))', lineHeight: '1.6' }}>{bullet}</li>
                  ))}
                </ul>
                <div className="timeline-tags" style={{ marginTop: '12px' }}>
                  {exp.tags.map(tag => (
                    <span key={tag} className="tech-tag" style={{ border: '1px solid hsl(var(--accent-primary) / 0.3)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="section-header">
          <p className="section-subtitle">Get in touch</p>
          <h2 className="section-title">Let's Work Together</h2>
        </div>
        <div className="contact-container">
          <div className="glass-card">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input" 
                  placeholder="john@example.com" 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea" 
                  placeholder="Hi Shoaib, let's connect..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                Send Message
              </button>
              {formSubmitted && (
                <div className="form-status">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-socials">
          <a href={profileData.socials.github} target="_blank" rel="noreferrer" className="footer-social-link">GitHub</a>
          <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" className="footer-social-link">LinkedIn</a>
          <a href={`mailto:${profileData.socials.email}`} className="footer-social-link">Email</a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} {profileData.name}. All rights reserved.
        </p>
      </footer>
    </>
  );
}
