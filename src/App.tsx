import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { profileData } from './data/profileData';
import { fetchGitHubRepos, type GitHubRepo } from './utils/github';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 20 } },
};

function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SkillBar({ level }: { level: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref} className="skill-bar-container">
      <motion.div
        className="skill-bar"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level * 20}%` } : { width: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      />
    </div>
  );
}

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
      {/* Header */}
      <motion.header
        className="header"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="header-inner">
          <div className="header-left">
            <a href="#about" className="logo">
              {profileData.name} <motion.span
                className="logo-dot"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </a>
          </div>
          <nav className="header-center nav-links">
            {['about', 'projects', 'skills', 'experience', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => setActiveSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </nav>
          <div className="header-right" />
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="about">
        <div className="hero-container">
          <div className="hero-content">
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {profileData.title}
            </motion.p>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hi, I'm <span>{profileData.name}</span>
            </motion.h1>
            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {profileData.bio}
            </motion.p>
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <SectionReveal>
          <motion.div className="section-header" variants={fadeUp}>
            <p className="section-subtitle">Portfolio</p>
            <h2 className="section-title">GitHub Repositories</h2>
          </motion.div>
        </SectionReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', marginBottom: '32px' }}>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
          />
          <motion.div
            className="projects-filter-bar"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {uniqueLanguages.map(lang => (
              <motion.button
                key={lang}
                variants={scaleIn}
                onClick={() => setFilterLang(lang)}
                className={`filter-badge ${filterLang === lang ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'hsl(var(--text-secondary))', fontFamily: 'var(--font-mono)' }}>
            Loading repositories from GitHub...
          </div>
        ) : (
          <motion.div
            className="projects-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {filteredRepos.map(repo => (
              <motion.div
                key={repo.id}
                className="glass-card"
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08), 0 0 1px 1px hsl(155 80% 45% / 0.15) inset' }}
              >
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Skills Section */}
      <section id="skills">
        <SectionReveal>
          <motion.div className="section-header" variants={fadeUp}>
            <p className="section-subtitle">Proficiencies</p>
            <h2 className="section-title">My Tech Stack</h2>
          </motion.div>
        </SectionReveal>
        <motion.div
          className="skills-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {['Languages', 'AI/ML', 'Computer Vision', 'Web Dev', 'Tools'].map(cat => {
            const catSkills = profileData.skills.filter(s => s.category === cat);
            return (
              <motion.div key={cat} className="skills-category" variants={fadeUp}>
                <h3 className="skills-category-title">{cat}</h3>
                {catSkills.map(skill => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      <span>{skill.level * 20}%</span>
                    </div>
                    <SkillBar level={skill.level} />
                  </div>
                ))}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Experience Timeline */}
      <section id="experience">
        <SectionReveal>
          <motion.div className="section-header" variants={fadeUp}>
            <p className="section-subtitle">Journey</p>
            <h2 className="section-title">Work Experience</h2>
          </motion.div>
        </SectionReveal>
        <div className="timeline">
          {profileData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              className="timeline-item"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <SectionReveal>
          <motion.div className="section-header" variants={fadeUp}>
            <p className="section-subtitle">Get in touch</p>
            <h2 className="section-title">Let's Work Together</h2>
          </motion.div>
        </SectionReveal>
        <div className="contact-container">
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
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
              <motion.button
                type="submit"
                className="btn btn-primary submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
              {formSubmitted && (
                <motion.div
                  className="form-status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="footer-socials">
          <a href={profileData.socials.github} target="_blank" rel="noreferrer" className="footer-social-link">GitHub</a>
          <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" className="footer-social-link">LinkedIn</a>
          <a href={`mailto:${profileData.socials.email}`} className="footer-social-link">Email</a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} {profileData.name}. All rights reserved.
        </p>
      </motion.footer>
      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}
