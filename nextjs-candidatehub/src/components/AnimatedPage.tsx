"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface HomepageData {
  heroHeadline?: string;
  heroSubtext?: string;
  ctaText?: string;
  markisCards?: { title: string; description: string }[];
  outcomes?: { stat: string; title: string; description: string }[];
}

export default function AnimatedPage({ data }: { data: HomepageData }) {
  const typewriterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // --- Typewriter Effect ---
    const prompts = [
      "Build a hiring journey for warehouse associates",
      "Show which locations have the highest turnover risk",
      "Create an onboarding workflow for new store managers",
      "Identify candidates ready to re-engage",
      "Recommend internal mobility opportunities",
      "Generate a workforce plan for Q3 hiring"
    ];

    let promptIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;
    let timeoutId: NodeJS.Timeout;

    function typeEffect() {
      if (!typewriterRef.current) return;

      const currentPrompt = prompts[promptIndex];

      if (isDeleting) {
        typewriterRef.current.textContent = currentPrompt.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 20;
      } else {
        typewriterRef.current.textContent = currentPrompt.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = Math.random() * 30 + 30;
      }

      if (!isDeleting && charIndex === currentPrompt.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, 3000);
        return;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        promptIndex = (promptIndex + 1) % prompts.length;
        timeoutId = setTimeout(typeEffect, 500);
        return;
      }

      timeoutId = setTimeout(typeEffect, typingSpeed);
    }

    timeoutId = setTimeout(typeEffect, 1500);

    // --- Scroll Animations ---
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('fade-in-up');
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.square-module, .outcome-card, .testimonial-card, .split-content, .dashboard-widget, .timeline-node, .fade-in-up, .light-card'
    );

    animatedElements.forEach((el, index) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(30px)';
      htmlEl.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
      htmlEl.style.transitionDelay = `${(index % 3) * 0.1}s`;
      observer.observe(el);
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header className="site-header glass-panel">
        <div className="container header-container">
          <div className="logo">
            <Image src="/Logo.png" alt="CandidateHub Logo" width={32} height={32} className="logo-img" />
            <span>CandidateHub</span>
          </div>
          <nav className="main-nav" id="mainNav">
            <Link href="/markis">Markis AI</Link>
            <Link href="/platform">Platform</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="header-actions">
            <Link href="/trial" className="btn btn-secondary nav-btn-trial" style={{ marginRight: '0.5rem', background: '#fff', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
              Start Free Trial
            </Link>
            <Link href="/demo" className="btn btn-primary">{data.ctaText || "Book a Demo"}</Link>
          </div>
          <button className="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle Navigation" style={{ display: 'none' }}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      <section className="hero hero-centered relative overflow-hidden">
        <div className="orb-container">
          <div className="living-orb layer-1"></div>
          <div className="living-orb layer-2"></div>
          <div className="living-orb layer-3"></div>
        </div>

        <div className="container relative z-10 text-center">
          <div className="hero-content">
            <h1 className="fade-in-up" style={{ animationDelay: '0.1s' }} dangerouslySetInnerHTML={{ __html: data.heroHeadline?.replace('AI Operating System', '<span style="color: var(--accent-yellow)">AI Operating System</span>') || 'The <span style="color: var(--accent-yellow)">AI Operating System</span> for Talent' }}>
            </h1>
            <p className="hero-sub fade-in-up" style={{ animationDelay: '0.2s', marginLeft: 'auto', marginRight: 'auto' }}>
              {data.heroSubtext || "CandidateHub is the Candidate Nurturing Engine™ for growing teams. Turn interested candidates into hires through automated, consent-based engagement — without burning out your recruiters."}
            </p>
            <div className="hero-ctas justify-center fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/demo" className="btn btn-primary btn-large">{data.ctaText || "Book a Demo"}</Link>
              <Link href="#markis" className="btn btn-secondary btn-large">Meet Markis</Link>
            </div>
          </div>

          <div className="hero-visual-centered fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="search-interface glass-panel">
              <div className="search-input-area">
                <div className="input-sparkle">
                  <svg viewBox="0 0 24 24" fill="none" className="sparkle-icon">
                    <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" fill="currentColor" />
                  </svg>
                </div>
                <div className="input-wrapper transparent-input">
                  <div id="typewriter-text" ref={typewriterRef} className="typewriter text-large"></div>
                  <span className="cursor">|</span>
                </div>
                <button className="send-btn micro-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="quick-actions fade-in-up" style={{ animationDelay: '0.5s' }}>
              <button className="pill-btn">Talent Journeys</button>
              <button className="pill-btn">Turnover Risk</button>
              <button className="pill-btn">Workforce Planning</button>
              <button className="pill-btn">Candidate Nurturing</button>
              <button className="pill-btn">Internal Mobility</button>
              <button className="pill-btn">Hiring Forecasts</button>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="section section-light problem-section">
        <div className="container text-center text-dark" style={{ maxWidth: '780px' }}>
          <h2 className="section-title text-dark">Your ATS tracks candidates. It doesn&apos;t convert them.</h2>
          <p className="section-subtitle text-body section-body-copy" style={{ maxWidth: '100%' }}>
            Candidates apply and hear nothing. Silver medalists disappear into the database. Recruiters spend their time chasing instead of engaging — not because they don&apos;t care, but because the tools they have were built for record-keeping, not relationships.
          </p>

          <div className="problem-stats row">
            <div className="stat-col column fade-in-up">
              <div className="stat-number">60%</div>
              <div className="stat-label">of candidates never hear back after applying</div>
            </div>
            <div className="stat-col column fade-in-up">
              <div className="stat-number">4 in 5</div>
              <div className="stat-label">silver medalists are never re-engaged</div>
            </div>
            <div className="stat-col column fade-in-up">
              <div className="stat-number">#1</div>
              <div className="stat-label">reason for recruiter burnout is manual follow-up</div>
            </div>
          </div>
        </div>
      </section>

      <section id="markis" className="section section-offwhite markis-section">
        <div className="container text-dark">
          <div className="section-header text-center">
            <span className="eyebrow">Meet Markis</span>
            <h2 className="section-title text-dark">The engagement layer your ATS was never designed to provide.</h2>
            <p className="section-subtitle text-body">
              Markis is the intelligence layer inside CandidateHub. It watches signals, recommends actions, drafts communications, and keeps talent workflows moving — without adding more work to your plate.
            </p>
            <div className="rule-box fade-in-up">
              <p><em>Markis recommends. You decide. Every action requires human approval.</em></p>
            </div>
          </div>

          <div className="markis-grid">
            {/* Markis Cards... */}
            {(data.markisCards && data.markisCards.length > 0 ? data.markisCards : [
              {
                title: "Talent Intelligence Strategist",
                description: "Analyzes talent pools, market trends, and organizational needs to optimize strategy.",
              },
              {
                title: "Journey Architect",
                description: "Designs automated, multi-channel candidate and employee journeys to drive engagement.",
              },
              {
                title: "Recruiting Coordinator",
                description: "Handles scheduling, follow-ups, initial screenings, and routine candidate communications.",
              },
              {
                title: "Employee Retention Advisor",
                description: "Identifies flight risks and prompts timely interventions to keep your top talent.",
              },
              {
                title: "Workforce Planning Analyst",
                description: "Forecasts staffing needs across locations based on historical data and seasonality.",
              },
              {
                title: "Candidate Engagement Specialist",
                description: "Nurtures declined or passive candidates with relevant updates and career opportunities.",
              },
              {
                title: "Internal Mobility Advisor",
                description: "Matches existing employees to new roles, fostering long-term career growth internally.",
              },
              {
                title: "Hiring Operations Manager",
                description: "Oversees the end-to-end recruitment process, ensuring compliance and efficiency.",
              }
            ]).map((card, i) => (
              <div key={i} className="glass-panel square-module">
                <div className="card-content">
                  <div className="card-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" className="icon">
                      {/* Using a generic SVG icon as fallback if hardcoded SVGs aren't available for dynamic content */}
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="card-text text-white">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section section-light stack-section">
        <div className="container text-dark">
          <div className="section-header text-center">
            <h2 className="section-title text-dark">Built to sit on top of your existing ATS.</h2>
            <p className="section-subtitle text-body">
              You don&apos;t need to rip and replace anything. CandidateHub adds the engagement and intelligence layer your current stack is missing.
            </p>
          </div>

          <div className="stack-diagram fade-in-up">
            <div className="tier tier-1">
              <div className="tier-pill grey-pill">ATS</div>
              <span className="tier-label">System of record</span>
            </div>
            <div className="tier-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="tier tier-2">
              <div className="tier-pill blue-pill font-bold">CandidateHub</div>
              <span className="tier-label">System of engagement</span>
            </div>
            <div className="tier-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="tier tier-3">
              <div className="tier-pill dark-blue-pill">Markis</div>
              <span className="tier-label">System of intelligence</span>
            </div>
          </div>
          <div className="stack-note text-center">
            <p>Works with Workday, Greenhouse, ADP, iCIMS, BambooHR and more.</p>
          </div>
        </div>
      </section>

      <section className="section section-offwhite midmarket-section">
        <div className="container text-dark">
          <div className="split-layout">
            <div className="split-content fade-in-up">
              <h2 className="section-title text-dark">Built for teams doing the work of ten.</h2>
              <p className="section-subtitle text-left text-body">
                If your recruiting team is small, your hiring volume is high, and your locations keep multiplying — CandidateHub was built for exactly that.
              </p>
              <div className="recognition-list">
                <div className="rec-item">
                  <span className="rec-problem">24 locations, one HR Director. </span>
                  <span className="rec-solution">CandidateHub gives you enterprise-grade visibility without enterprise complexity.</span>
                </div>
                <div className="rec-item">
                  <span className="rec-problem">Seasonal hiring spikes. </span>
                  <span className="rec-solution">Markis helps you build talent pools before you need them, not after.</span>
                </div>
                <div className="rec-item">
                  <span className="rec-problem">Sky-high turnover. </span>
                  <span className="rec-solution">Identify flight risks early and automate the interventions that actually retain people.</span>
                </div>
              </div>
            </div>
            <div className="split-visual fade-in-up">
              <div className="dashboard-widget light-panel relative">
                <div className="widget-header">
                  <h4>Operations Command</h4>
                </div>
                <div className="widget-metrics">
                  <div className="metric-box box-light">
                    <span className="metric-label">Active Locations</span>
                    <span className="metric-value text-blue">24</span>
                  </div>
                  <div className="metric-box box-light">
                    <span className="metric-label">Seasonal Shift</span>
                    <span className="metric-value text-positive">Ready</span>
                  </div>
                  <div className="metric-box full-width box-light">
                    <span className="metric-label">Turnover Risk Alert</span>
                    <div className="risk-bar box-light-bar">
                      <div className="risk-level" style={{ width: '15%' }}></div>
                    </div>
                    <span className="metric-sub">Reduced by 40% this quarter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="icp-note text-center fade-in-up">
            <p>Manufacturing &middot; Distribution &middot; Retail &middot; Healthcare-adjacent &middot; Multi-entity orgs</p>
          </div>
        </div>
      </section>

      <section className="section section-dark-trust consent-section">
        <div className="container text-center text-white">
          <h2 className="section-title text-white">We don&apos;t scrape. We don&apos;t spam.</h2>
          <p className="section-subtitle text-white mw-700 mx-auto opacity-90" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Every candidate interaction on CandidateHub is opt-in, intentional, and compliant. In a world of data harvesting and automated blasting, consent-based engagement isn&apos;t just an ethical choice — it&apos;t a competitive advantage.
          </p>
          <div className="trust-pills row justify-center fade-in-up">
            <div className="trust-pill">No data scraping</div>
            <div className="trust-pill">Consent-first outreach</div>
            <div className="trust-pill">Compliance built in</div>
          </div>
        </div>
      </section>

      <section id="outcomes" className="section section-light outcomes-section">
        <div className="container text-dark">
          <div className="section-header text-center">
            <h2 className="section-title text-dark">What teams see after switching.</h2>
          </div>
          <div className="outcomes-grid">
            {(data.outcomes && data.outcomes.length > 0 ? data.outcomes : [
              { stat: "85%", title: "Reduction in Manual Work", description: "Automate scheduling, follow-ups, and repetitive tasks with Markis." },
              { stat: "2x", title: "Faster Time-to-Fill", description: "Gain real-time insights and reduce friction in your hiring pipeline." },
              { stat: "3x", title: "Higher Response Rates", description: "Engage candidates through personalized, multi-channel journeys." },
              { stat: "40%", title: "Lower Turnover Risk", description: "Identify flight risks before they leave with proactive interventions." },
              { stat: "2x", title: "Better Retention", description: "Keep your critical frontline and operations talent engaged longer." },
              { stat: "+60%", title: "Internal Mobility", description: "Seamlessly deploy existing talent to new roles and locations." },
            ]).map((outcome, i) => (
              <div key={i} className="outcome-card light-panel text-center fade-in-up">
                <div className="outcome-stat text-blue">{outcome.stat}</div>
                <h4>{outcome.title}</h4>
                <p className="text-body">{outcome.description}</p>
              </div>
            ))}
          </div>
          <div className="disclaimer-note text-center fade-in-up">
            <p>Based on early customer feedback.</p>
          </div>
        </div>
      </section>

      <section className="section section-brand final-cta-section">
        <div className="container text-center text-white">
          <h2 className="section-title text-white" style={{ marginBottom: '2rem' }}>Hiring is broken in the middle. We fix that.</h2>
          <p className="section-subtitle text-white mw-700 mx-auto opacity-90" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            See CandidateHub and Markis in action — or start your free trial and have it running alongside your ATS today.
          </p>
          <div className="cta-actions row justify-center fade-in-up" style={{ gap: '1rem', marginTop: '2.5rem' }}>
            <Link href="/demo" className="btn btn-primary btn-large">{data.ctaText || "Book a Demo"}</Link>
            <Link href="/trial" className="btn btn-secondary-white btn-large">Start Free Trial</Link>
          </div>
          <div className="trust-line fade-in-up" style={{ marginTop: '2rem', opacity: 0.8, fontSize: '0.9rem' }}>
            <p>No credit card required &middot; Works with your existing ATS &middot; Setup in under a day</p>
          </div>
        </div>
      </section>

      <footer className="site-footer light-footer">
        <div className="container text-dark">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <Image src="/Logo.png" alt="CandidateHub Logo" width={24} height={24} className="logo-img" style={{ filter: 'invert(0.8) brightness(0.2)' }} />
                <span className="text-dark">CandidateHub</span>
              </div>
              <p className="text-body" style={{ marginTop: '1rem' }}>The engagement layer your ATS was never designed to provide.</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4 className="text-dark">Platform</h4>
                <Link href="/markis" className="text-body">Markis AI</Link>
                <Link href="/platform" className="text-body">Platform</Link>
                <Link href="#integrations" className="text-body">Integrations</Link>
                <Link href="/pricing" className="text-body">Pricing</Link>
              </div>
              <div className="link-group">
                <h4 className="text-dark">Company</h4>
                <Link href="/about" className="text-body">About</Link>
                <Link href="#careers" className="text-body">Careers</Link>
                <Link href="/contact" className="text-body">Contact</Link>
              </div>
              <div className="link-group">
                <h4 className="text-dark">Resources</h4>
                <Link href="/insights" className="text-body">Insights</Link>
                <Link href="#help" className="text-body">Help Center</Link>
              </div>
              <div className="link-group">
                <h4 className="text-dark">Legal</h4>
                <Link href="#privacy" className="text-body">Privacy</Link>
                <Link href="#terms" className="text-body">Terms</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom text-body">
            &copy; 2026 CandidateHub. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
