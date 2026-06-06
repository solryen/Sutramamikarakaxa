import { useEffect, useRef, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import logoImage from './assets/todayler-logo.jpg'
import heroPhoneImage from './assets/1paywallphoto_1779089972449.png'
import sarahProfileImage from './assets/sarahprofile.jpg'
import jamesProfileImage from './assets/jamesprofile.jpg'
import emilyProfileImage from './assets/emilyprofile.jpg'
import {
  APP_STORE_URL,
  COMPARISON_SECTION,
  FEATURES_SECTION,
  FAQS,
  FINAL_CTA,
  FOOTER_CONTENT,
  HERO_FLOATING_CARDS,
  HERO_CONTENT,
  HOME_META,
  LEGAL_META,
  PRIVACY_LAST_UPDATED,
  PRIVACY_SECTIONS,
  PROCESS_SECTION,
  SUPPORT_NOTE,
  TERMS_LAST_UPDATED,
  TERMS_SECTIONS,
  TESTIMONIALS,
  TRANSITION_SECTION,
} from './content'

const testimonialImages = {
  SarahNihelton1: sarahProfileImage,
  James22: jamesProfileImage,
  ElenaR_: emilyProfileImage,
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/privacy"
          element={
            <LegalPage
              title="Privacy Policy"
              lastUpdated={PRIVACY_LAST_UPDATED}
              sections={PRIVACY_SECTIONS}
            />
          }
        />
        <Route
          path="/terms"
          element={
            <LegalPage
              title="Terms of Service"
              lastUpdated={TERMS_LAST_UPDATED}
              sections={TERMS_SECTIONS}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function Meta({ title, description }) {
  const location = useLocation()

  useEffect(() => {
    document.title = title

    updateHeadTag('meta[name="description"]', {
      tag: 'meta',
      attributes: { name: 'description', content: description },
    })
    updateHeadTag('link[rel="canonical"]', {
      tag: 'link',
      attributes: {
        rel: 'canonical',
        href: `https://example.com${location.pathname}`,
      },
    })
    updateHeadTag('meta[property="og:title"]', {
      tag: 'meta',
      attributes: { property: 'og:title', content: title },
    })
    updateHeadTag('meta[property="og:description"]', {
      tag: 'meta',
      attributes: { property: 'og:description', content: description },
    })
    updateHeadTag('meta[property="og:type"]', {
      tag: 'meta',
      attributes: { property: 'og:type', content: 'website' },
    })
    updateHeadTag('meta[property="og:url"]', {
      tag: 'meta',
      attributes: {
        property: 'og:url',
        content: `https://example.com${location.pathname}`,
      },
    })
    updateHeadTag('meta[property="og:image"]', {
      tag: 'meta',
      attributes: { property: 'og:image', content: 'https://example.com/og-image.jpg' },
    })
    updateHeadTag('meta[name="twitter:card"]', {
      tag: 'meta',
      attributes: { name: 'twitter:card', content: 'summary_large_image' },
    })
    updateHeadTag('meta[name="twitter:title"]', {
      tag: 'meta',
      attributes: { name: 'twitter:title', content: title },
    })
    updateHeadTag('meta[name="twitter:description"]', {
      tag: 'meta',
      attributes: { name: 'twitter:description', content: description },
    })
    updateHeadTag('meta[name="twitter:image"]', {
      tag: 'meta',
      attributes: { name: 'twitter:image', content: 'https://example.com/og-image.jpg' },
    })
  }, [description, location.pathname, title])

  return null
}

function updateHeadTag(selector, config) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement(config.tag)
    document.head.appendChild(element)
  }

  Object.entries(config.attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function HomePage() {
  return (
    <>
      <Meta title={HOME_META.title} description={HOME_META.description} />
      <SiteHeader />
      <main className="home-page">
        <HeroSection />
        <TransitionSection />
        <ComparisonSection />
        <FeaturesSection />
        <SupportNoteSection />
        <ProcessSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}

function SiteHeader() {
  return (
    <header className="site-header">
      <PageShell>
        <div className="site-header-inner">
          <Link to="/" className="brand-link brand-link--header">
            <img src={logoImage} alt="Todayler" />
            <span>Todayler</span>
          </Link>
          <StoreButton location="header-cta">
            Download
          </StoreButton>
        </div>
      </PageShell>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="section hero-section">
      <PageShell className="hero-layout">
        <Reveal as="div" className="hero-copy reveal reveal-fade-up">
          <div className="hero-eyebrow-pill">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            <span>{HERO_CONTENT.eyebrow}</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-title-wipe">{HERO_CONTENT.titleLead}</span>{' '}
            <span className="hero-title-accent">{HERO_CONTENT.titleAccent}</span>
          </h1>
          <p className="hero-description">{HERO_CONTENT.description}</p>
          <div className="hero-cta-row">
            <StoreButton location="hero-primary">{HERO_CONTENT.primaryCta}</StoreButton>
            <p className="fine-print">{HERO_CONTENT.finePrint}</p>
          </div>
        </Reveal>
        <Reveal as="div" className="hero-visual reveal reveal-rise" delay={120}>
          <div className="hero-device-stage">
            <div className="hero-float-card hero-float-card-sleep" aria-hidden="true">
              <span className="hero-float-emoji">{HERO_FLOATING_CARDS.sleep.emoji}</span>
              <p className="hero-float-title">{HERO_FLOATING_CARDS.sleep.title}</p>
              <p className="hero-float-detail">{HERO_FLOATING_CARDS.sleep.detail}</p>
            </div>
            <div className="hero-float-card hero-float-card-feeding" aria-hidden="true">
              <div className="hero-float-header">
                <span className="hero-float-icon" role="img" aria-label="feeding">
                  🍼
                </span>
                <p className="hero-float-title">{HERO_FLOATING_CARDS.feeding.title}</p>
              </div>
              {HERO_FLOATING_CARDS.feeding.lines.map((line) => (
                <p key={line} className="hero-float-detail">
                  {line}
                </p>
              ))}
            </div>
            <div className="hero-float-card hero-float-card-diapers" aria-hidden="true">
              <div className="hero-float-header">
                <span
                  className="hero-float-icon hero-float-icon-diapers"
                  role="img"
                  aria-label="diapers"
                >
                  🩲
                </span>
                <p className="hero-float-title">{HERO_FLOATING_CARDS.diapers.title}</p>
              </div>
              {HERO_FLOATING_CARDS.diapers.lines.map((line) => (
                <p key={line} className="hero-float-detail">
                  {line}
                </p>
              ))}
            </div>
            <div className="hero-chapter-badge" aria-hidden="true">
              <p>{HERO_FLOATING_CARDS.chapter.title}</p>
              <span>{HERO_FLOATING_CARDS.chapter.subtitle}</span>
            </div>
            <div className="phone-spotlight phone-spotlight-hero">
            <PhoneFrame
              src={heroPhoneImage}
              alt="Todayler baby app overview on an iPhone"
              className="phone-frame-hero"
            />
            </div>
          </div>
        </Reveal>
      </PageShell>
    </section>
  )
}

function TransitionSection() {
  return (
    <section className="section section-tight" id="about">
      <PageShell narrow>
        <Reveal as="div" className="transition-panel reveal reveal-fade-up">
          <h2 className="transition-title">
            <span>From </span>
            <span className="section-title-accent">overwhelmed</span>
            <span> to </span>
            <span className="section-title-accent">quietly confident.</span>
          </h2>
          <p className="section-intro">{TRANSITION_SECTION.body}</p>
        </Reveal>
      </PageShell>
    </section>
  )
}

function ComparisonSection() {
  return (
    <section className="section section-tight comparison-section">
      <PageShell narrow>
        <div className="comparison-grid">
          {COMPARISON_SECTION.columns.map((column, index) => (
            <Reveal
              as="article"
              key={column.label}
              className={`comparison-card comparison-card-${index + 1} reveal reveal-fade-up-soft`}
              delay={90 + index * 70}
            >
              <span className="comparison-number">{column.number}</span>
              <h3 className={`comparison-heading comparison-heading-${index + 1}`}>
                {column.label}
              </h3>
              <ul className="comparison-list">
                {column.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </PageShell>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section className="section features-section" id="features">
      <PageShell>
        <div className="section-heading section-heading-centered">
          <Reveal as="h2" className="features-title reveal reveal-fade-up">
            <span>Everything you need. </span>
            <span className="section-title-accent">Nothing you don't.</span>
          </Reveal>
          <Reveal
            as="p"
            className="section-intro section-intro-light reveal reveal-fade-up"
            delay={80}
          >
            {FEATURES_SECTION.intro}
          </Reveal>
        </div>
        <div className="feature-card-grid">
          {FEATURES_SECTION.items.map((item, index) => (
            <Reveal
              as="article"
              key={item.title}
              className="feature-card reveal reveal-fade-up-soft"
              delay={100 + index * 60}
            >
              <span className="feature-icon-badge" aria-hidden="true">
                <FeatureIcon type={item.title} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
          <Reveal
            as="article"
            className="feature-card feature-card-accent reveal reveal-fade-up-soft"
            delay={100 + FEATURES_SECTION.items.length * 60}
          >
            <span className="feature-icon-badge feature-icon-badge-accent" aria-hidden="true">
              <FeatureIcon type={SUPPORT_NOTE.title} />
            </span>
            <h3>{SUPPORT_NOTE.title}</h3>
            <p>{SUPPORT_NOTE.body}</p>
          </Reveal>
        </div>
      </PageShell>
    </section>
  )
}

function SupportNoteSection() {
  return null
}

function ProcessSection() {
  return (
    <section className="section process-section" id="today-flow">
      <div className="process-curve" aria-hidden="true" />
      <PageShell narrow>
        <div className="section-heading section-heading-centered">
          <Reveal as="h2" className="process-title reveal reveal-fade-up">
            <span>How it </span>
            <span className="section-title-accent">works.</span>
          </Reveal>
        </div>
        <div className="steps-list process-grid">
          {PROCESS_SECTION.steps.map((step, index) => (
            <Reveal
              as="article"
              key={step.number}
              className="step-card process-card reveal reveal-fade-up-soft"
              delay={110 + index * 70}
            >
              <p className="step-number">{step.number}</p>
              <div className="step-copy">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageShell>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="section section-warm" id="testimonials">
      <PageShell>
        <div className="section-heading section-heading-centered">
          <Reveal as="h2" className="testimonials-title reveal reveal-fade-up">
            <span>Trusted by </span>
            <span className="section-title-accent">tired parents.</span>
          </Reveal>
        </div>
        <div className="testimonial-stack testimonial-stack-long">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal
              as="article"
              key={testimonial.name}
              className="testimonial-app-card reveal reveal-fade-up-soft"
              delay={100 + index * 70}
            >
              <div className="testimonial-profile">
                <img
                  className="testimonial-avatar"
                  src={testimonialImages[testimonial.name]}
                  alt={`${testimonial.name} profile`}
                  loading="lazy"
                />
                <div className="testimonial-meta">
                  <p className="testimonial-name">{testimonial.name}</p>
                  <p className="testimonial-role">{testimonial.profile}</p>
                </div>
              </div>
              <p className="testimonial-text">“{testimonial.text}”</p>
            </Reveal>
          ))}
        </div>
      </PageShell>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="section faq-section">
      <PageShell narrow>
        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <Reveal
              as="details"
              key={faq.question}
              className="faq-card reveal reveal-fade-up-soft"
              delay={100 + index * 70}
              open={index === 0}
            >
              <summary className="faq-summary">
                <h3>{faq.question}</h3>
                <span className="faq-toggle" aria-hidden="true">
                  ⌄
                </span>
              </summary>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageShell>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section className="section final-cta">
      <PageShell narrow>
        <div className="final-card final-card-cta">
          <Reveal as="h2" className="final-cta-title reveal reveal-fade-up">
            <span>Ready for a little more </span>
            <span className="section-title-accent-light">calm?</span>
          </Reveal>
          <Reveal as="p" className="section-intro reveal reveal-fade-up" delay={70}>
            {FINAL_CTA.body}
          </Reveal>
          <StoreButton location="final-cta">{FINAL_CTA.cta}</StoreButton>
          <p className="fine-print">{FINAL_CTA.finePrint}</p>
        </div>
      </PageShell>
    </section>
  )
}

function LegalPage({ title, lastUpdated, sections }) {
  return (
    <>
      <Meta title={LEGAL_META[title].title} description={LEGAL_META[title].description} />
      <div className="legal-page">
        <SiteHeader />
        <main className="legal-main">
          <PageShell narrow>
            <h1 className="legal-title">{title}</h1>
            <p className="legal-updated">Todayler · Last updated: {lastUpdated}</p>
            <div className="legal-sections">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.link ? (
                    <a
                      className="button button-primary legal-link-button"
                      href={section.link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {section.link.label}
                    </a>
                  ) : null}
                </section>
              ))}
            </div>
          </PageShell>
        </main>
      </div>
    </>
  )
}

function NotFoundPage() {
  return (
    <>
      <Meta title="Todayler, Page Not Found" description="The page you requested does not exist." />
      <SiteHeader />
      <main className="not-found-page">
        <PageShell narrow>
          <div className="not-found-card">
            <p className="not-found-code">404</p>
            <h1>Oops! Page not found</h1>
            <p>The page you tried to open does not exist.</p>
            <Link className="button button-primary" to="/">
              Return to Home
            </Link>
          </div>
        </PageShell>
      </main>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <PageShell className="footer-layout">
        <div className="footer-brand">
          <div className="brand-link brand-link--footer">
            <img src={logoImage} alt="Todayler" />
            <span>Todayler</span>
          </div>
          <p className="footer-tagline">{FOOTER_CONTENT.tagline}</p>
        </div>
        <div className="footer-groups">
          {FOOTER_CONTENT.groups.map((group) => (
            <nav key={group.title} className="footer-group" aria-label={group.title}>
              <p className="footer-group-title">{group.title}</p>
              <div className="footer-links">
                {group.links.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  ) : link.href.startsWith('/#') ? (
                    <a key={link.label} href={link.href}>
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.label} to={link.href}>
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </nav>
          ))}
        </div>
        <div className="footer-meta">
          <p>{FOOTER_CONTENT.copyright}</p>
        </div>
      </PageShell>
    </footer>
  )
}

function StoreButton({ children, block = false, location }) {
  return (
    <a
      className={`button button-primary${block ? ' button-block' : ''}`}
      href={APP_STORE_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackCtaTap(children, location)}
    >
      {children}
    </a>
  )
}

function InlineButton({ children, href, location }) {
  return (
    <a
      className="button button-secondary"
      href={href}
      onClick={() => trackCtaTap(children, location)}
    >
      {children}
    </a>
  )
}

function trackCtaTap(label, location) {
  const eventPayload = {
    event: 'todayler_cta_tap',
    label,
    location,
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload)
  }

  window.dispatchEvent(new CustomEvent('todayler:cta', { detail: eventPayload }))
}

function PageShell({ children, narrow = false, className = '' }) {
  const shellClassName = ['page-shell', narrow ? 'page-shell--narrow' : '', className]
    .filter(Boolean)
    .join(' ')

  return <div className={shellClassName}>{children}</div>
}

function PhoneFrame({ src, alt, className = '' }) {
  return (
    <div className={`phone-frame ${className}`.trim()}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  )
}

function FeatureIcon({ type }) {
  const paths = {
    '3 Daily Activities':
      'M4 12h4l2-7 4 14 2-8h4',
    'Baby Tracker':
      'M10.9 5.8c-1.1 0-2 .7-2.4 1.8-.2-.1-.4-.1-.6-.1-1.6 0-2.8 1.3-2.8 2.9 0 .8.3 1.5.8 2-.4.4-.6 1-.6 1.7 0 1.7 1.4 3.1 3.1 3.1.3 0 .7-.1 1-.2.5 1 1.4 1.6 2.5 1.6V5.8zm2.2 0c1.1 0 2 .7 2.4 1.8.2-.1.4-.1.6-.1 1.6 0 2.8 1.3 2.8 2.9 0 .8-.3 1.5-.8 2 .4.4.6 1 .6 1.7 0 1.7-1.4 3.1-3.1 3.1-.3 0-.7-.1-1-.2-.5 1-1.4 1.6-2.5 1.6V5.8zm-1.1 0v12.8m-1.8-8.3c0-.8-.7-1.4-1.4-1.4m1.4 5.1c0-.8-.7-1.4-1.4-1.4m3.6-2.3c0-.8.7-1.4 1.4-1.4m-1.4 5.1c0-.8.7-1.4 1.4-1.4m-1.8-1h1m-1-3.3h1',
    'Milestone Chapters':
      'M5.8 7h4.7c1.5 0 2.8.6 3.5 1.6.7-1 2-1.6 3.5-1.6H18v10.2h-.5c-1.8 0-3.3.7-4.4 1.9-1.1-1.2-2.6-1.9-4.4-1.9h-.5zm6.2 1.2v10.7m-5-9.1h2.8m4.4 0h2.8',
    'Bedtime Stories':
      'M15.5 4.5a7 7 0 1 0 4 12.8A8 8 0 1 1 15.5 4.5z',
    'Meet Mia':
      'M12 5c4.4 0 8 2.9 8 6.5S16.4 18 12 18c-.8 0-1.7-.1-2.5-.4L6 19l1.2-3C5.8 14.9 4 13.3 4 11.5 4 7.9 7.6 5 12 5z',
    'Built with love':
      'M12 19.2c-2.2-1.4-7.2-4.9-7.2-8.8 0-2.2 1.6-3.9 3.7-3.9 1.5 0 2.6.8 3.3 1.9.7-1.1 1.8-1.9 3.3-1.9 2.1 0 3.7 1.7 3.7 3.9 0 3.9-5 7.4-7.2 8.8z',
  }

  return (
    <svg
      className={type === 'Built with love' ? 'feature-icon-svg feature-icon-svg-heart' : 'feature-icon-svg'}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[type] ?? 'M5 12h14'} />
    </svg>
  )
}

function Reveal({
  as = 'div',
  children,
  className = '',
  threshold,
  rootMargin,
  delay = 0,
}) {
  const { isVisible, setNode } = useReveal({ threshold, rootMargin })
  const Tag = as

  return (
    <Tag
      ref={setNode}
      className={getRevealClassName(className, isVisible)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

function useReveal({ threshold = 0.22, rootMargin = '0px 0px -10% 0px' } = {}) {
  const nodeRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    const element = nodeRef.current
    if (!element || isVisible || prefersReducedMotion) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [isVisible, prefersReducedMotion, rootMargin, threshold])

  return {
    isVisible: isVisible || prefersReducedMotion,
    setNode: (node) => {
      nodeRef.current = node
    },
  }
}

function getRevealClassName(baseClassName, isVisible) {
  return [baseClassName, isVisible ? 'reveal-visible' : '']
    .filter(Boolean)
    .join(' ')
}

export default App
