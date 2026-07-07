import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Cpu,
  FileText,
  LogIn,
  MessageCircle,
  MessageSquareText,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRoundCheck,
  Workflow
} from 'lucide-react';

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
    salary: '$110k-$145k',
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
    salary: '$95k-$125k',
    experience: '2+ years',
    remote: true,
    match: 81,
    stage: 'Interview'
  },
  {
    id: 4,
    title: 'Senior Product Manager',
    company: 'Helio Finance',
    location: 'Chicago, IL',
    salary: '$150k-$190k',
    experience: '6+ years',
    remote: false,
    match: 91,
    stage: 'Review'
  },
  {
    id: 5,
    title: 'Machine Learning Engineer',
    company: 'Lumen AI',
    location: 'Remote',
    salary: '$130k-$170k',
    experience: '4+ years',
    remote: true,
    match: 87,
    stage: 'Screening'
  }
];

const features = [
  {
    title: 'Smart Filtered Search',
    icon: Search,
    summary: 'Find the right roles without endless scrolling.',
    bullets: ['Search by location, compensation, seniority, and remote preferences', 'Save reusable filters for recurring career goals', 'See highly relevant jobs in seconds']
  },
  {
    title: 'AI Match Scoring',
    icon: Cpu,
    summary: 'Understand how well you align with each role before applying.',
    bullets: ['Score your profile against each job description instantly', 'Surface the strongest opportunities first', 'Reveal missing skills so you can improve quickly']
  },
  {
    title: 'One-Click Quick Apply',
    icon: FileText,
    summary: 'Move from discovery to application in a single tap.',
    bullets: ['Use pre-saved profiles, resumes, and cover notes', 'Reduce friction for high-intent applicants', 'Tracks every submission with completion status']
  },
  {
    title: 'Applicant Tracking System',
    icon: Workflow,
    summary: 'Bring structure to hiring with an elegant pipeline.',
    bullets: ['Track candidates from review to hire in one workspace', 'Organize by stage, urgency, and fit score', 'Stay aligned across recruiters and hiring teams']
  },
  {
    title: 'Automated Screening Questions',
    icon: ShieldCheck,
    summary: 'Filter unqualified applicants automatically.',
    bullets: ['Ask custom knockout questions for each role', 'Eliminate low-fit applications before manual review', 'Customise qualification rules for every opening']
  },
  {
    title: 'Instant Job Alerts',
    icon: BellRing,
    summary: 'Stay ahead of new opportunities as soon as they appear.',
    bullets: ['Receive email or push alerts for fresh matches', 'Set preferences for industry, location, and role type', 'Prioritise roles that match your current goals']
  },
  {
    title: 'Auto Interview Scheduler',
    icon: CalendarDays,
    summary: 'Let candidates book interviews without back-and-forth.',
    bullets: ['Sync with calendars and availability slots', 'Reduce time-to-interview for every application', 'Keep reminders and confirmations automated']
  },
  {
    title: 'Direct Real-Time Chat',
    icon: MessageSquareText,
    summary: 'Communicate securely inside the platform.',
    bullets: ['Message verified recruiters and hiring managers', 'Share updates, questions, and next steps in-app', 'Keep every conversation organised and searchable']
  },
  {
    title: 'Resume Parsing Engine',
    icon: FileText,
    summary: 'Turn uploaded documents into structured profile data.',
    bullets: ['Extract skills, experience, and qualifications from PDF resumes', 'Auto-populate profile fields to reduce manual entry', 'Improve match quality with cleaner data']
  },
  {
    title: 'Visual Pipeline Tracker',
    icon: BarChart3,
    summary: 'Keep applicants informed with real-time progress.',
    bullets: ['Show each candidate their current stage clearly', 'Reveal what happens next in the process', 'Build confidence through transparent progress updates']
  }
];

const steps = [
  { title: 'Create your profile', text: 'Upload your resume, define your preferences, and let the platform understand your goals.' },
  { title: 'Discover your match', text: 'Review AI-ranked roles and apply with confidence using saved profile details.' },
  { title: 'Move forward faster', text: 'Track your applications, chat with recruiters, and book interviews instantly.' }
];

const highlights = [
  'Trusted by high-growth startups and enterprise teams',
  'Modern experience designed for people who expect speed and clarity',
  'Built to reduce hiring friction across every stage of the journey'
];

const dashboardStats = [
  { value: '126', label: 'active candidates' },
  { value: '18', label: 'interviews this week' },
  { value: '94%', label: 'response SLA' }
];

const pricingPlans = [
  { name: 'Starter', price: '$39', description: 'For founders hiring their first team.', perks: ['Unlimited candidate search', 'AI match scoring', '3 active roles'] },
  { name: 'Growth', price: '$99', description: 'For scaling teams that need live pipeline control.', perks: ['Everything in Starter', 'Advanced ATS insights', 'Priority support'] },
  { name: 'Scale', price: '$199', description: 'For large recruiting operations with full collaboration.', perks: ['Everything in Growth', 'Unlimited roles', 'Dedicated onboarding'] }
];

const testimonials = [
  { quote: 'TalentFlow helped us reduce candidate response time by 60%.', person: 'Mina Chen', role: 'Head of Talent, Northstar Labs' },
  { quote: 'The apply flow feels polished and the dashboard gives our team instant clarity.', person: 'Alicia Gomez', role: 'Recruiting Lead, Helio Finance' }
];

function buildFeatureOutput(featureTitle, values) {
  switch (featureTitle) {
    case 'Smart Filtered Search': {
      const matches = seedJobs.filter((job) => {
        const query = (values.role || '').toLowerCase();
        const remoteOnly = values.remote === 'true';
        const matchesQuery = !query || `${job.title} ${job.company}`.toLowerCase().includes(query);
        const matchesLocation = !values.location || job.location.toLowerCase().includes(values.location.toLowerCase());
        const matchesSalary = !values.salary || job.salary.includes(values.salary);
        const matchesExperience = !values.experience || job.experience === values.experience;
        const matchesRemote = !remoteOnly || job.remote;
        return matchesQuery && matchesLocation && matchesSalary && matchesExperience && matchesRemote;
      });
      return {
        summary: `Found ${matches.length} matching roles for ${values.role || 'your search'}.`,
        items: matches.slice(0, 3).map((job) => `${job.title} · ${job.location}`)
      };
    }
    case 'AI Match Scoring': {
      const skillCount = (values.skills || '').split(/\s+/).filter(Boolean).length;
      const experience = Number(values.years || 0);
      const score = Math.min(99, 55 + Math.min(skillCount, 6) * 6 + (experience > 2 ? 10 : 0));
      return {
        summary: `Your compatibility score is ${score}% for ${values.role || 'the role'}.`,
        items: [`${skillCount} highlighted skills detected`, `${experience} years of relevant experience`, 'Recommendation: submit your application with confidence']
      };
    }
    case 'One-Click Quick Apply': {
      return {
        summary: values.name ? `Application sent for ${values.name}.` : 'Application prepared and ready to send.',
        items: ['Resume and profile attached', 'Recruiter team notified instantly', 'Status: In review']
      };
    }
    case 'Applicant Tracking System': {
      const newStage = values.stage || 'Review';
      return {
        summary: `Candidate moved to ${newStage}.`,
        items: ['Pipeline updated', 'Stakeholders alerted', 'Next action queued']
      };
    }
    case 'Automated Screening Questions': {
      const years = Number(values.years || 0);
      const score = years >= 3 ? 'qualified' : 'needs review';
      return {
        summary: `Applicant outcome: ${score}.`,
        items: ['Knockout questions answered', 'Experience threshold reviewed', 'Manual follow-up recommended if needed']
      };
    }
    case 'Instant Job Alerts': {
      return {
        summary: `Alerts enabled for ${values.location || 'your preferred location'}.`,
        items: [`Frequency: ${values.frequency || 'daily'}`, `Interests: ${values.interests || 'product, design'}`, 'Notifications will be sent instantly']
      };
    }
    case 'Auto Interview Scheduler': {
      return {
        summary: `Interview slot booked for ${values.date || 'today'}.`,
        items: [`Time: ${values.time || '09:00'}`, `Duration: ${values.duration || '45 min'}`, 'Calendar invite prepared']
      };
    }
    case 'Direct Real-Time Chat': {
      return {
        summary: `Message thread started with ${values.recruiter || 'the recruiter'}.`,
        items: ['Conversation marked secure', 'Response expected within 30 minutes', 'Transcript stored in-app']
      };
    }
    case 'Resume Parsing Engine': {
      const extractedSkills = (values.resume || '').toLowerCase();
      const skills = ['react', 'node', 'design', 'analytics', 'python'].filter((skill) => extractedSkills.includes(skill));
      return {
        summary: `Parsed ${skills.length} verified skills from the uploaded resume.`,
        items: skills.length ? skills : ['No obvious keywords detected, please upload a fuller resume']
      };
    }
    case 'Visual Pipeline Tracker': {
      return {
        summary: `Pipeline status for ${values.candidate || 'the candidate'} is ${values.stage || 'review'}.`,
        items: ['Applicant notified', 'Current step highlighted', 'Timeline updated in real time']
      };
    }
    default:
      return { summary: 'No demo output yet.', items: [] };
  }
}

export default function App() {
  const [jobs, setJobs] = useState(seedJobs);
  const [filters, setFilters] = useState({ query: '', location: '', salary: '', experience: '', remote: false });
  const [activeFeature, setActiveFeature] = useState(features[0]);
  const [featureInputs, setFeatureInputs] = useState({});
  const [featureResult, setFeatureResult] = useState(null);
  const [selectedJob, setSelectedJob] = useState(seedJobs[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showApplyWizard, setShowApplyWizard] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [applyStep, setApplyStep] = useState(1);
  const [applyForm, setApplyForm] = useState({ name: '', experience: '', skills: '', coverLetter: '', availability: '', salaryExpectation: '' });
  const [atsForm, setAtsForm] = useState({ role: '', resume: '', years: '' });
  const [atsResult, setAtsResult] = useState(null);

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

  const handleFeatureSelect = (feature) => {
    setActiveFeature(feature);
    setFeatureResult(null);
  };

  const handleFeatureInputChange = (field, value) => {
    const current = featureInputs[activeFeature.title] || {};
    setFeatureInputs({ ...featureInputs, [activeFeature.title]: { ...current, [field]: value } });
  };

  const handleFeatureSubmit = (event) => {
    event.preventDefault();
    const currentValues = featureInputs[activeFeature.title] || {};
    setFeatureResult(buildFeatureOutput(activeFeature.title, currentValues));
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    if (isLoggedIn) {
      setShowApplyWizard(true);
      setApplyStep(1);
      setApplicationStatus({ job, status: 'In progress', message: `Your application for ${job.title} is ready to complete.` });
      return;
    }
    setShowAuthModal(true);
    setAuthMode('login');
    setAuthError('');
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    if (authMode === 'signup' && !authForm.name) {
      setAuthError('Please enter your full name to create an account.');
      return;
    }
    if (!authForm.email || !authForm.password) {
      setAuthError('Please enter your email and password to continue.');
      return;
    }
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setShowApplyWizard(true);
    setApplyStep(1);
    setApplicationStatus({ job: selectedJob, status: 'In progress', message: `Welcome${authMode === 'signup' ? `, ${authForm.name}` : ''}. Your application for ${selectedJob.title} is ready.` });
  };

  const handleApplyAdvance = () => {
    if (applyStep < 4) {
      setApplyStep(applyStep + 1);
      return;
    }
    setApplicationStatus({ job: selectedJob, status: 'Submitted', message: `Your application for ${selectedJob.title} has been submitted successfully.` });
    setShowApplyWizard(false);
    setApplyStep(1);
  };

  const handleAtsSubmit = (event) => {
    event.preventDefault();
    const resumeText = (atsForm.resume || '').toLowerCase();
    const years = Number(atsForm.years || 0);
    const roleKeywords = (atsForm.role || '').toLowerCase();
    const keywordHits = ['react', 'node', 'design', 'frontend', 'ux', 'analytics', 'python', 'product', 'sales', 'typescript', 'figma', 'sql'].filter((keyword) => resumeText.includes(keyword) || roleKeywords.includes(keyword));
    const score = Math.min(98, 46 + keywordHits.length * 8 + (years >= 3 ? 10 : 0) + (resumeText.split(/\s+/).filter(Boolean).length > 70 ? 6 : 0));
    setAtsResult({
      score,
      keywords: keywordHits.length ? keywordHits : ['No clear resume keywords detected'],
      summary: `${atsForm.role || 'the role'} looks ${score >= 80 ? 'highly compatible' : score >= 65 ? 'promising' : 'in need of stronger keyword alignment'} for ATS screening.`
    });
  };

  return (
    <div className="app-shell">
      {showAuthModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Login or sign up">
          <div className="modal-card auth-modal">
            <button type="button" className="modal-close" onClick={() => setShowAuthModal(false)}>×</button>
            <div className="auth-modal-header">
              <div>
                <p className="eyebrow">Secure access</p>
                <h3>{authMode === 'login' ? 'Welcome back' : 'Create your account'}</h3>
              </div>
              <div className="auth-toggle">
                <button type="button" className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Login</button>
                <button type="button" className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>Sign up</button>
              </div>
            </div>
            <p className="modal-copy">Create a profile or sign in to continue your application for {selectedJob.title}.</p>
            <form className="auth-form" onSubmit={handleAuthSubmit}>
              {authMode === 'signup' ? (
                <label className="form-group">
                  <span>Full name</span>
                  <input value={authForm.name} onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })} placeholder="Alex Johnson" />
                </label>
              ) : null}
              <label className="form-group">
                <span>Email</span>
                <input type="email" value={authForm.email} onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })} placeholder="you@example.com" />
              </label>
              <label className="form-group">
                <span>Password</span>
                <input type="password" value={authForm.password} onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })} placeholder="••••••••" />
              </label>
              {authError ? <p className="error-text">{authError}</p> : null}
              <button type="submit" className="btn btn-primary full-width"><LogIn size={16} /> {authMode === 'login' ? 'Sign in and continue' : 'Create account and continue'}</button>
            </form>
          </div>
        </div>
      )}

      {showApplyWizard && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Application form">
          <div className="modal-card apply-modal">
            <button type="button" className="modal-close" onClick={() => setShowApplyWizard(false)}>×</button>
            <div className="auth-modal-header">
              <div>
                <p className="eyebrow">Application form</p>
                <h3>{selectedJob.title}</h3>
              </div>
              <div className="status-pill">Step {applyStep} of 4</div>
            </div>
            <div className="wizard-progress">
              {[1, 2, 3, 4].map((step) => <span key={step} className={step <= applyStep ? 'active' : ''} />)}
            </div>
            {applyStep === 1 ? (
              <div className="wizard-step">
                <label className="form-group"><span>Full name</span><input value={applyForm.name} onChange={(event) => setApplyForm({ ...applyForm, name: event.target.value })} placeholder="Alex Johnson" /></label>
                <label className="form-group"><span>Years of experience</span><input value={applyForm.experience} onChange={(event) => setApplyForm({ ...applyForm, experience: event.target.value })} placeholder="5 years" /></label>
                <button type="button" className="btn btn-primary full-width" onClick={handleApplyAdvance}>Continue</button>
              </div>
            ) : null}
            {applyStep === 2 ? (
              <div className="wizard-step">
                <label className="form-group"><span>Core skills</span><input value={applyForm.skills} onChange={(event) => setApplyForm({ ...applyForm, skills: event.target.value })} placeholder="React, Node, UX" /></label>
                <label className="form-group"><span>Salary expectation</span><input value={applyForm.salaryExpectation} onChange={(event) => setApplyForm({ ...applyForm, salaryExpectation: event.target.value })} placeholder="$150k" /></label>
                <button type="button" className="btn btn-primary full-width" onClick={handleApplyAdvance}>Continue</button>
              </div>
            ) : null}
            {applyStep === 3 ? (
              <div className="wizard-step">
                <label className="form-group"><span>Availability</span><input value={applyForm.availability} onChange={(event) => setApplyForm({ ...applyForm, availability: event.target.value })} placeholder="Available in 2 weeks" /></label>
                <label className="form-group"><span>Cover letter</span><textarea value={applyForm.coverLetter} onChange={(event) => setApplyForm({ ...applyForm, coverLetter: event.target.value })} placeholder="Tell the team why you are a strong fit." /></label>
                <button type="button" className="btn btn-primary full-width" onClick={handleApplyAdvance}>Continue</button>
              </div>
            ) : null}
            {applyStep === 4 ? (
              <div className="wizard-step review-step">
                <h4>Review your submission</h4>
                <p><strong>Name:</strong> {applyForm.name || 'Not provided'}</p>
                <p><strong>Experience:</strong> {applyForm.experience || 'Not provided'}</p>
                <p><strong>Skills:</strong> {applyForm.skills || 'Not provided'}</p>
                <p><strong>Salary expectation:</strong> {applyForm.salaryExpectation || 'Not provided'}</p>
                <p><strong>Availability:</strong> {applyForm.availability || 'Not provided'}</p>
                <button type="button" className="btn btn-primary full-width" onClick={handleApplyAdvance}>Submit application</button>
              </div>
            ) : null}
          </div>
        </div>
      )}

      <header className="hero">
        <nav className="topbar" aria-label="Primary navigation">
          <a className="brand" href="#top"><Briefcase size={20} /> TalentFlow</a>
          <div className="nav-links">
            <a href="#jobs">Explore Jobs</a>
            <a href="#features">Platform</a>
            <a href="#portal">Portal</a>
          </div>
        </nav>

        <div className="hero-content" id="top">
          <div>
            <p className="eyebrow">AI-powered recruiting platform</p>
            <h1>Hire and get hired with a beautifully real recruiting experience.</h1>
            <p className="hero-text">TalentFlow brings together smart search, ATS predictions, instant apply, live pipelines, and recruiter insights in one modern workspace.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#jobs">Start applying <ArrowRight size={16} /></a>
              <button type="button" className="btn btn-secondary btn-glow" onClick={() => { setAuthMode('login'); setShowAuthModal(true); setAuthError(''); }}>Log in / Sign up</button>
            </div>
            <div className="highlight-row" aria-label="Platform highlights">
              {highlights.map((item) => (
                <div key={item} className="mini-pill"><CheckCircle2 size={14} /> {item}</div>
              ))}
            </div>
          </div>

          <div className="hero-card" aria-label="Product overview">
            <div className="hero-card-header">
              <div>
                <p className="eyebrow">Live intelligence</p>
                <h2>Application command center</h2>
              </div>
              <div className="score-badge">94% match</div>
            </div>
            <div className="mini-stat"><Sparkles size={18} /> AI recommendations tuned to your profile</div>
            <div className="mini-stat"><BellRing size={18} /> Instant alerts for fresh matching roles</div>
            <div className="mini-stat"><CalendarDays size={18} /> Interview slots booked in minutes</div>
            <div className="mini-stat"><MessageCircle size={18} /> Direct chat with verified recruiters</div>
          </div>
        </div>
      </header>

      <main>
        <section className="intro-grid" aria-label="Why TalentFlow">
          <article className="card intro-card">
            <p className="eyebrow">Designed for modern hiring</p>
            <h3>Everything you need to move from search to offer without friction.</h3>
            <p>From discovery through interviews, every experience is tuned for clarity, speed, and confidence.</p>
          </article>
          <article className="card stat-card">
            <div className="stat-number">4.9/5</div>
            <p>Average candidate satisfaction score</p>
            <div className="stat-row"><TrendingUp size={16} /> 3x faster hiring conversations</div>
          </article>
        </section>

        <section id="features" className="section-block">
          <div className="page-layout">
            <aside className="card sidebar-card">
              <div className="section-heading compact">
                <div>
                  <p className="eyebrow">Feature suite</p>
                  <h2>Everything hiring teams need.</h2>
                </div>
              </div>
              <div className="feature-nav">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <button key={feature.title} type="button" className={`feature-nav-item ${activeFeature.title === feature.title ? 'active' : ''}`} onClick={() => handleFeatureSelect(feature)}>
                      <span className="feature-nav-icon"><Icon size={16} /></span>
                      <span>{feature.title}</span>
                    </button>
                  );
                })}
              </div>
              <div className="sidebar-card-footer">
                <p className="eyebrow">Platform snapshot</p>
                <h3>Trusted by operators in SaaS, fintech, healthcare, and product teams.</h3>
                <p>TalentFlow combines search, screening, scheduling, and communication in one real hiring workspace.</p>
              </div>
            </aside>

            <div className="main-content">
              <div className="card demo-panel">
                <div className="demo-panel-header">
                  <div>
                    <p className="eyebrow">Interactive demo</p>
                    <h3>{activeFeature.title}</h3>
                  </div>
                  <div className="status-pill">Live simulation</div>
                </div>
                <p className="feature-summary">{activeFeature.summary}</p>
                <form className="demo-form" onSubmit={handleFeatureSubmit}>
                  {activeFeature.title === 'Smart Filtered Search' && (
                    <>
                      <label className="form-group"><span>Role</span><input value={featureInputs[activeFeature.title]?.role || ''} onChange={(event) => handleFeatureInputChange('role', event.target.value)} placeholder="Frontend, design, analytics" /></label>
                      <label className="form-group"><span>Location</span><input value={featureInputs[activeFeature.title]?.location || ''} onChange={(event) => handleFeatureInputChange('location', event.target.value)} placeholder="Remote, Austin, NY" /></label>
                      <label className="form-group"><span>Salary</span><input value={featureInputs[activeFeature.title]?.salary || ''} onChange={(event) => handleFeatureInputChange('salary', event.target.value)} placeholder="$110k" /></label>
                      <label className="form-group"><span>Experience</span><select value={featureInputs[activeFeature.title]?.experience || ''} onChange={(event) => handleFeatureInputChange('experience', event.target.value)}><option value="">Any</option><option value="2+ years">2+ years</option><option value="3+ years">3+ years</option><option value="5+ years">5+ years</option></select></label>
                      <label className="checkbox"><input type="checkbox" checked={featureInputs[activeFeature.title]?.remote === 'true'} onChange={(event) => handleFeatureInputChange('remote', event.target.checked ? 'true' : 'false')} /> Remote only</label>
                    </>
                  )}
                  {activeFeature.title === 'AI Match Scoring' && (
                    <>
                      <label className="form-group"><span>Role</span><input value={featureInputs[activeFeature.title]?.role || ''} onChange={(event) => handleFeatureInputChange('role', event.target.value)} placeholder="Product Designer" /></label>
                      <label className="form-group"><span>Skills</span><input value={featureInputs[activeFeature.title]?.skills || ''} onChange={(event) => handleFeatureInputChange('skills', event.target.value)} placeholder="React Figma analytics" /></label>
                      <label className="form-group"><span>Years of experience</span><input type="number" value={featureInputs[activeFeature.title]?.years || ''} onChange={(event) => handleFeatureInputChange('years', event.target.value)} placeholder="4" /></label>
                    </>
                  )}
                  {activeFeature.title === 'One-Click Quick Apply' && (
                    <>
                      <label className="form-group"><span>Name</span><input value={featureInputs[activeFeature.title]?.name || ''} onChange={(event) => handleFeatureInputChange('name', event.target.value)} placeholder="Alex Johnson" /></label>
                      <label className="form-group"><span>Resume</span><input value={featureInputs[activeFeature.title]?.resume || ''} onChange={(event) => handleFeatureInputChange('resume', event.target.value)} placeholder="resume.pdf" /></label>
                    </>
                  )}
                  {activeFeature.title === 'Applicant Tracking System' && (
                    <>
                      <label className="form-group"><span>Candidate</span><input value={featureInputs[activeFeature.title]?.candidate || ''} onChange={(event) => handleFeatureInputChange('candidate', event.target.value)} placeholder="Jordan Lee" /></label>
                      <label className="form-group"><span>Stage</span><select value={featureInputs[activeFeature.title]?.stage || ''} onChange={(event) => handleFeatureInputChange('stage', event.target.value)}><option value="">Select stage</option><option value="Review">Review</option><option value="Screening">Screening</option><option value="Interview">Interview</option><option value="Offer">Offer</option></select></label>
                    </>
                  )}
                  {activeFeature.title === 'Automated Screening Questions' && (
                    <>
                      <label className="form-group"><span>Years of experience</span><input type="number" value={featureInputs[activeFeature.title]?.years || ''} onChange={(event) => handleFeatureInputChange('years', event.target.value)} placeholder="3" /></label>
                      <label className="form-group"><span>Relevant skills</span><input value={featureInputs[activeFeature.title]?.skills || ''} onChange={(event) => handleFeatureInputChange('skills', event.target.value)} placeholder="React Node" /></label>
                    </>
                  )}
                  {activeFeature.title === 'Instant Job Alerts' && (
                    <>
                      <label className="form-group"><span>Location</span><input value={featureInputs[activeFeature.title]?.location || ''} onChange={(event) => handleFeatureInputChange('location', event.target.value)} placeholder="Remote" /></label>
                      <label className="form-group"><span>Interests</span><input value={featureInputs[activeFeature.title]?.interests || ''} onChange={(event) => handleFeatureInputChange('interests', event.target.value)} placeholder="Product, design" /></label>
                      <label className="form-group"><span>Frequency</span><select value={featureInputs[activeFeature.title]?.frequency || ''} onChange={(event) => handleFeatureInputChange('frequency', event.target.value)}><option value="">Select</option><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="instant">Instant</option></select></label>
                    </>
                  )}
                  {activeFeature.title === 'Auto Interview Scheduler' && (
                    <>
                      <label className="form-group"><span>Date</span><input value={featureInputs[activeFeature.title]?.date || ''} onChange={(event) => handleFeatureInputChange('date', event.target.value)} placeholder="2026-07-15" /></label>
                      <label className="form-group"><span>Time</span><input value={featureInputs[activeFeature.title]?.time || ''} onChange={(event) => handleFeatureInputChange('time', event.target.value)} placeholder="09:30" /></label>
                      <label className="form-group"><span>Duration</span><input value={featureInputs[activeFeature.title]?.duration || ''} onChange={(event) => handleFeatureInputChange('duration', event.target.value)} placeholder="45 min" /></label>
                    </>
                  )}
                  {activeFeature.title === 'Direct Real-Time Chat' && (
                    <>
                      <label className="form-group"><span>Recruiter</span><input value={featureInputs[activeFeature.title]?.recruiter || ''} onChange={(event) => handleFeatureInputChange('recruiter', event.target.value)} placeholder="Mina from Northstar" /></label>
                      <label className="form-group"><span>Message</span><textarea value={featureInputs[activeFeature.title]?.message || ''} onChange={(event) => handleFeatureInputChange('message', event.target.value)} placeholder="Hello, I would love to learn about the role." /></label>
                    </>
                  )}
                  {activeFeature.title === 'Resume Parsing Engine' && (
                    <label className="form-group"><span>Resume text</span><textarea value={featureInputs[activeFeature.title]?.resume || ''} onChange={(event) => handleFeatureInputChange('resume', event.target.value)} placeholder="React • Node • Design systems • Analytics" /></label>
                  )}
                  {activeFeature.title === 'Visual Pipeline Tracker' && (
                    <>
                      <label className="form-group"><span>Candidate</span><input value={featureInputs[activeFeature.title]?.candidate || ''} onChange={(event) => handleFeatureInputChange('candidate', event.target.value)} placeholder="Taylor Brooks" /></label>
                      <label className="form-group"><span>Stage</span><select value={featureInputs[activeFeature.title]?.stage || ''} onChange={(event) => handleFeatureInputChange('stage', event.target.value)}><option value="">Select stage</option><option value="Review">Review</option><option value="Screening">Screening</option><option value="Interview">Interview</option><option value="Offer">Offer</option></select></label>
                    </>
                  )}
                  <button type="submit" className="btn btn-primary"><Send size={15} /> Book a live demo</button>
                </form>
                {featureResult ? (
                  <div className="result-card">
                    <h4>Output</h4>
                    <p>{featureResult.summary}</p>
                    <ul>
                      {featureResult.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="card ats-card">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">ATS prediction</p>
                <h2>Paste a resume and see how your profile could score in screening.</h2>
              </div>
            </div>
            <div className="ats-grid">
              <form className="demo-form ats-form" onSubmit={handleAtsSubmit}>
                <label className="form-group">
                  <span>Target role</span>
                  <input value={atsForm.role} onChange={(event) => setAtsForm({ ...atsForm, role: event.target.value })} placeholder="Senior Product Designer" />
                </label>
                <label className="form-group">
                  <span>Experience years</span>
                  <input type="number" value={atsForm.years} onChange={(event) => setAtsForm({ ...atsForm, years: event.target.value })} placeholder="4" />
                </label>
                <label className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <span>Resume text</span>
                  <textarea value={atsForm.resume} onChange={(event) => setAtsForm({ ...atsForm, resume: event.target.value })} placeholder="Paste your resume experience, tools, and achievements here." />
                </label>
                <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1' }}>Run ATS prediction</button>
              </form>
              <div className="result-card ats-result">
                {atsResult ? (
                  <>
                    <div className="score-badge large">{atsResult.score}% ATS fit</div>
                    <h4>Prediction overview</h4>
                    <p>{atsResult.summary}</p>
                    <ul>
                      {atsResult.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
                    </ul>
                  </>
                ) : (
                  <>
                    <h4>Why this matters</h4>
                    <p>Paste a resume excerpt to estimate how strongly your background aligns with keyword-based screening and recruiter expectations.</p>
                    <ul>
                      <li>Review role relevance before submitting</li>
                      <li>Spot missing skill language quickly</li>
                      <li>Improve your odds with targeted updates</li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="portal" className="section-block">
          <div className="card portal-card">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">Member portal</p>
                <h2>Full login and sign-up experience.</h2>
              </div>
            </div>
            <div className="portal-grid">
              <div className="portal-copy">
                <p>Sign in, create an account, and continue into a polished onboarding flow that feels like a real hiring platform.</p>
                <div className="portal-badges">
                  <span>Secure access</span>
                  <span>Saved profile</span>
                  <span>Instant onboarding</span>
                </div>
                <button type="button" className="btn btn-primary btn-strong" onClick={() => { setAuthMode('signup'); setShowAuthModal(true); setAuthError(''); }}>Create account</button>
              </div>
              <div className="card portal-panel">
                <div className="auth-toggle inline-toggle">
                  <button type="button" className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Login</button>
                  <button type="button" className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>Sign up</button>
                </div>
                <form className="auth-form" onSubmit={handleAuthSubmit}>
                  {authMode === 'signup' ? (
                    <label className="form-group"><span>Full name</span><input value={authForm.name} onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })} placeholder="Alex Johnson" /></label>
                  ) : null}
                  <label className="form-group"><span>Email</span><input type="email" value={authForm.email} onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })} placeholder="you@example.com" /></label>
                  <label className="form-group"><span>Password</span><input type="password" value={authForm.password} onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })} placeholder="••••••••" /></label>
                  <button type="submit" className="btn btn-primary full-width"><LogIn size={16} /> {authMode === 'login' ? 'Continue to dashboard' : 'Create my account'}</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="jobs" className="board">
          <div className="board-header">
            <div>
              <p className="eyebrow">Live opportunities</p>
              <h2>Explore curated roles tailored to your goals.</h2>
            </div>
            <div className="pill">{filteredJobs.length} matches</div>
          </div>

          <div className="filters">
            <label className="sr-only" htmlFor="job-search">Search role or company</label>
            <input id="job-search" aria-label="Search role or company" placeholder="Search title or company" value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
            <label className="sr-only" htmlFor="job-location">Location</label>
            <input id="job-location" aria-label="Location" placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
            <label className="sr-only" htmlFor="job-salary">Salary</label>
            <select id="job-salary" aria-label="Salary" value={filters.salary} onChange={(e) => setFilters({ ...filters, salary: e.target.value })}>
              <option value="">Any salary</option>
              <option value="$90k">$90k-$125k</option>
              <option value="$110k">$110k-$145k</option>
              <option value="$130k">$130k-$170k</option>
              <option value="$150k">$150k-$190k</option>
            </select>
            <label className="sr-only" htmlFor="job-experience">Experience</label>
            <select id="job-experience" aria-label="Experience" value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })}>
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
                  <button type="button" onClick={() => handleApplyClick(job)}>Quick Apply</button>
                </div>
              </article>
            ))}
          </div>

          {applicationStatus ? (
            <div className="card application-card">
              <div className="demo-panel-header">
                <div>
                  <p className="eyebrow">Application status</p>
                  <h3>{applicationStatus.status}</h3>
                </div>
                <div className="status-pill">{isLoggedIn ? 'Signed in' : 'Guest'}</div>
              </div>
              <p>{applicationStatus.message}</p>
            </div>
          ) : null}
        </section>

        <section id="insights" className="insights">
          <div className="card wide">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">Application dashboard</p>
                <h2>See your journey unfold in real time.</h2>
              </div>
            </div>
            <p>Monitor your pipeline with vivid stage updates, recruiter messaging, and instant interview scheduling in one intuitive dashboard.</p>
            <div className="stats-grid">
              {dashboardStats.map((stat) => (
                <div key={stat.label} className="metric-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="pipeline">
              <div><UserRoundCheck size={16} /> Review</div>
              <div><ShieldCheck size={16} /> Screening</div>
              <div><Clock3 size={16} /> Interview</div>
              <div><CheckCircle2 size={16} /> Offer</div>
            </div>
          </div>
        </section>

        <section className="section-block pricing-section">
          <div className="pricing-grid">
            <div className="card pricing-card-stack">
              <div className="section-heading compact">
                <div>
                  <p className="eyebrow">Pricing</p>
                  <h2>Flexible plans for founders, teams, and enterprise hiring.</h2>
                </div>
              </div>
              <div className="pricing-cards">
                {pricingPlans.map((plan) => (
                  <article key={plan.name} className={`pricing-card ${plan.name === 'Growth' ? 'featured' : ''}`}>
                    <h3>{plan.name}</h3>
                    <div className="price">{plan.price}<span>/mo</span></div>
                    <p>{plan.description}</p>
                    <ul>
                      {plan.perks.map((perk) => <li key={perk}>{perk}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
            <div className="card testimonials-card">
              <div className="section-heading compact">
                <div>
                  <p className="eyebrow">Testimonials</p>
                  <h2>Trusted by modern recruiting teams.</h2>
                </div>
              </div>
              <div className="testimonial-list">
                {testimonials.map((item) => (
                  <article key={item.person} className="testimonial-card">
                    <p className="testimonial-quote">“{item.quote}”</p>
                    <div className="testimonial-person">
                      <strong>{item.person}</strong>
                      <span>{item.role}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>TalentFlow helps people discover better opportunities with clarity, confidence, and modern automation.</p>
      </footer>
    </div>
  );
}
