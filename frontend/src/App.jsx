import { useEffect, useMemo, useState } from 'react';
import { Briefcase, Sparkles, BellRing, CalendarDays, MessageCircle, BarChart3, FileText, Search } from 'lucide-react';

const seedJobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Northstar Labs',
    location: 'Remote',
    salary: '$140k-$180k',
    experience: '5+ years',
    remote: true,
    match: 94,
    stage: 'Review'
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Astra Cloud',
    location: 'Austin, TX',
    salary: '$110k-$140k',
    experience: '3+ years',
    remote: false,
    match: 88,
    stage: 'Screening'
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Finora',
    location: 'New York, NY',
    salary: '$90k-$120k',
    experience: '2+ years',
    remote: true,
    match: 81,
    stage: 'Interview'
  }
];

const features = [
  { title: 'Smart Filtered Search', icon: Search, text: 'Instantly filter by location, salary, experience, and remote work.' },
  { title: 'AI Match Scoring', icon: Sparkles, text: 'Receive instant compatibility scores based on your profile.' },
  { title: 'Quick Apply', icon: FileText, text: 'Apply in one tap using your saved resume and profile.' },
  { title: 'ATS Pipeline', icon: BarChart3, text: 'Track every application from review to hire in a visual board.' }
];

export default function App() {
  const [jobs, setJobs] = useState(seedJobs);
  const [filters, setFilters] = useState({ query: '', location: '', salary: '', experience: '', remote: false });

  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        if (data?.jobs?.length) setJobs(data.jobs);
      })
      .catch(() => {});
  }, []);

  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const q = filters.query.toLowerCase();
    const matchesQuery = !q || `${job.title} ${job.company}`.toLowerCase().includes(q);
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesSalary = !filters.salary || job.salary.includes(filters.salary);
    const matchesExperience = !filters.experience || job.experience === filters.experience;
    const matchesRemote = !filters.remote || job.remote;
    return matchesQuery && matchesLocation && matchesSalary && matchesExperience && matchesRemote;
  }), [filters, jobs]);

  return (
    <div className="app-shell">
      <header className="hero">
        <nav className="topbar">
          <div className="brand"><Briefcase size={20} /> TalentFlow</div>
          <div className="nav-links">
            <a href="#jobs">Explore Jobs</a>
            <a href="#features">Platform</a>
            <a href="#insights">Insights</a>
          </div>
        </nav>
        <div className="hero-content">
          <div>
            <p className="eyebrow">AI-powered recruiting platform</p>
            <h1>Find better roles faster with modern recruiting intelligence.</h1>
            <p className="hero-text">Smart search, resume parsing, live applicant tracking, instant alerts, and seamless interviews—all in one elegant workspace.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#jobs">Start applying</a>
              <a className="btn btn-secondary" href="#features">Explore features</a>
            </div>
          </div>
          <div className="hero-card">
            <div className="mini-stat"><Sparkles size={18} /> 94% AI match score</div>
            <div className="mini-stat"><BellRing size={18} /> Instant alerts enabled</div>
            <div className="mini-stat"><CalendarDays size={18} /> Auto interview booking</div>
            <div className="mini-stat"><MessageCircle size={18} /> Direct recruiter chat</div>
          </div>
        </div>
      </header>

      <main>
        <section id="features" className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="card">
                <Icon size={20} />
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            );
          })}
        </section>

        <section id="jobs" className="board">
          <div className="board-header">
            <div>
              <p className="eyebrow">Live opportunities</p>
              <h2>Discover curated roles tailored to you</h2>
            </div>
            <div className="pill">{filteredJobs.length} matches</div>
          </div>

          <div className="filters">
            <input placeholder="Search title or company" value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
            <input placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
            <select value={filters.salary} onChange={(e) => setFilters({ ...filters, salary: e.target.value })}>
              <option value="">Any salary</option>
              <option value="$90k">$90k+</option>
              <option value="$110k">$110k+</option>
              <option value="$140k">$140k+</option>
            </select>
            <select value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })}>
              <option value="">Any experience</option>
              <option value="2+ years">2+ years</option>
              <option value="3+ years">3+ years</option>
              <option value="5+ years">5+ years</option>
            </select>
            <label className="checkbox"><input type="checkbox" checked={filters.remote} onChange={(e) => setFilters({ ...filters, remote: e.target.checked })} /> Remote only</label>
          </div>

          <div className="jobs-list">
            {filteredJobs.map((job) => (
              <article key={job.id} className="job-card">
                <div>
                  <div className="job-title-row">
                    <h3>{job.title}</h3>
                    <span className="score">{job.match}% match</span>
                  </div>
                  <p>{job.company}</p>
                  <p>{job.location} • {job.salary} • {job.experience}</p>
                </div>
                <div className="job-actions">
                  <span className="stage">{job.stage}</span>
                  <button>Quick Apply</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="insights" className="insights">
          <div className="card wide">
            <h3>Application dashboard</h3>
            <p>Monitor your pipeline with real-time status updates, recruiter chat, and interview scheduling.</p>
            <div className="pipeline">
              <div>Review</div>
              <div>Screening</div>
              <div>Interview</div>
              <div>Offer</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
