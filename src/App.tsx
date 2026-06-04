import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  Facebook, 
  Youtube, 
  Instagram, 
  Music, // Used to represent TikTok
  Menu, 
  X, 
  HeartPulse, // Allied Health icon
  MessageSquare, // English icon
  Monitor, // Computer/IT icon
  GraduationCap, // Expert Faculty icon
  Award, // Certified Programs
  Building, // Modern Facilities
  Briefcase, // Career Support
  Quote, 
  ArrowRight, 
  MapPin, 
  Clock,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Send,
  Info
} from 'lucide-react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Form Inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseInterest: 'allied-health',
    message: ''
  });

  // Track scroll state to shrink/shadow navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
      // Basic manual Section active-tracking on scroll
      const sections = ['home', 'about', 'courses', 'why-us', 'gallery', 'testimonials', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const sections = document.querySelectorAll('.fade-in-section');
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Trigger animation once
        }
      });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));
    return () => {
      sections.forEach(sec => observer.unobserve(sec));
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setEnrollModalOpen(false);
      setFormSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        courseInterest: 'allied-health',
        message: ''
      });
    }, 2800);
  };

  const handleEnrollClick = (courseName?: string) => {
    if (courseName) {
      setFormData(prev => ({ ...prev, courseInterest: courseName }));
    }
    setEnrollModalOpen(true);
  };

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 90; // account for floating header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app-landing" id="home">
      
      {/* 1. TOP BAR */}
      <div className="top-bar" id="app-topbar">
        <div className="top-bar-container">
          <div className="top-bar-info">
            <div className="top-bar-item">
              <Mail size={14} className="text-secondary-sky" />
              <a href="mailto:nbamimahs@gmail.com">nbamimahs@gmail.com</a>
            </div>
            <div className="top-bar-item">
              <Phone size={14} className="text-secondary-sky" />
              <a href="tel:+924235718224">+92 (42) 3571-8224</a>
            </div>
            <div className="top-bar-item sm:block hidden">
              <Clock size={14} className="text-secondary-sky inline mr-1" />
              <span>Office Hours: 08:00 AM - 04:00 PM</span>
            </div>
          </div>
          <div className="top-bar-socials">
            <button className="social-btn" aria-label="Facebook">
              <Facebook size={16} />
            </button>
            <button className="social-btn" aria-label="YouTube">
              <Youtube size={16} />
            </button>
            <button className="social-btn" aria-label="Instagram">
              <Instagram size={16} />
            </button>
            <button className="social-btn" aria-label="TikTok">
              <Music size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. NAVBAR */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="app-navbar">
        <div className="navbar-container">
          <a onClick={() => handleNavClick('home')} className="navbar-logo cursor-pointer select-none">
            <span className="navbar-logo-short">New Bab-Al-Madina Institute</span>
            <span className="navbar-logo-sub">Pioneering Professional Excellence</span>
          </a>

          {/* Desktop Links */}
          <ul className="navbar-menu-desktop hidden md:flex" style={{ display: 'flex', listStyle: 'none', gap: '30px', alignItems: 'center' }}>
            <li>
              <a 
                onClick={() => handleNavClick('home')} 
                className={`navbar-link cursor-pointer ${activeSection === 'home' ? 'active' : ''}`}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                onClick={() => handleNavClick('about')} 
                className={`navbar-link cursor-pointer ${activeSection === 'about' ? 'active' : ''}`}
              >
                About
              </a>
            </li>
            <li>
              <a 
                onClick={() => handleNavClick('courses')} 
                className={`navbar-link cursor-pointer ${activeSection === 'courses' ? 'active' : ''}`}
              >
                Courses
              </a>
            </li>
            <li>
              <a 
                onClick={() => handleNavClick('why-us')} 
                className={`navbar-link cursor-pointer ${activeSection === 'why-us' ? 'active' : ''}`}
              >
                Why Choose Us
              </a>
            </li>
            <li>
              <a 
                onClick={() => handleNavClick('gallery')} 
                className={`navbar-link cursor-pointer ${activeSection === 'gallery' ? 'active' : ''}`}
              >
                Gallery
              </a>
            </li>
            <li>
              <a 
                onClick={() => handleNavClick('testimonials')} 
                className={`navbar-link cursor-pointer ${activeSection === 'testimonials' ? 'active' : ''}`}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a 
                onClick={() => handleNavClick('contact')} 
                className={`navbar-link cursor-pointer ${activeSection === 'contact' ? 'active' : ''}`}
              >
                Contact
              </a>
            </li>
            <li>
              <button 
                onClick={() => handleEnrollClick()} 
                style={{
                  backgroundColor: 'var(--accent-gold)', 
                  color: 'white', 
                  padding: '8px 20px', 
                  borderRadius: '4px', 
                  border: 'none', 
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  marginLeft: '8px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-gold-hover)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-gold)'}
              >
                Enroll Online
              </button>
            </li>
          </ul>

          {/* Hamburger Icon */}
          <button 
            className="menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''} md:hidden`}>
          <li>
            <a onClick={() => handleNavClick('home')} className={`navbar-link ${activeSection === 'home' ? 'active' : ''}`}>
              Home
            </a>
          </li>
          <li>
            <a onClick={() => handleNavClick('about')} className={`navbar-link ${activeSection === 'about' ? 'active' : ''}`}>
              About
            </a>
          </li>
          <li>
            <a onClick={() => handleNavClick('courses')} className={`navbar-link ${activeSection === 'courses' ? 'active' : ''}`}>
              Courses
            </a>
          </li>
          <li>
            <a onClick={() => handleNavClick('why-us')} className={`navbar-link ${activeSection === 'why-us' ? 'active' : ''}`}>
              Why Choose Us
            </a>
          </li>
          <li>
            <a onClick={() => handleNavClick('gallery')} className={`navbar-link ${activeSection === 'gallery' ? 'active' : ''}`}>
              Gallery
            </a>
          </li>
          <li>
            <a onClick={() => handleNavClick('testimonials')} className={`navbar-link ${activeSection === 'testimonials' ? 'active' : ''}`}>
              Testimonials
            </a>
          </li>
          <li>
            <a onClick={() => handleNavClick('contact')} className={`navbar-link ${activeSection === 'contact' ? 'active' : ''}`}>
              Contact
            </a>
          </li>
          <li style={{ padding: '12px 24px' }}>
            <button 
              onClick={() => { setMobileMenuOpen(false); handleEnrollClick(); }} 
              style={{
                backgroundColor: 'var(--accent-gold)', 
                color: 'white', 
                padding: '12px 24px', 
                borderRadius: '4px', 
                border: 'none', 
                fontWeight: 600,
                fontSize: '1rem',
                width: '100%',
                cursor: 'pointer'
              }}
            >
              Enroll Online
            </button>
          </li>
        </ul>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-gradient"></div>
        
        <div className="container hero-container">
          <div className="hero-left">
            <h1 style={{ animation: 'fadeIn 1s ease-out' }}>
              <span>Know Yourself, Grow Yourself, Give Yourself</span>
              Inspiring Future Healthcare &amp; Digital Pioneers
            </h1>
            <p className="hero-subheadline">
              New Bab-Al-Madina Institute of Management and Allied Health Sciences leads academic development 
              by merging clinical medical knowledge with intensive professional language masteries and computational expertise.
            </p>
            <div className="hero-actions">
              <button onClick={() => handleEnrollClick()} className="btn btn-primary">
                Enroll Now <ChevronRight size={16} className="ml-1" />
              </button>
              <button onClick={() => handleNavClick('courses')} className="btn btn-outline">
                Explore Courses
              </button>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="stats-card">
              <h3 className="stats-card-title">Academic Milestones</h3>
              
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Active &amp; Successful Students Graduated</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-number">20+</div>
                <div className="stat-label">Allied Health &amp; Digital Professional Courses</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Years of Exceptional Academic Legacy (Est. 2014)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section className="about fade-in-section" id="about">
        <div className="container about-container">
          <div className="about-left">
            <span className="section-label">A Legacy of Knowledge</span>
            <h2 style={{ color: 'var(--primary-navy)', fontSize: '2.5rem', marginBottom: '24px' }}>
              Empowering Minds, Advancing Healthcare
            </h2>
            <div className="about-paragraphs">
              <p>
                Founded in 2014, the New Bab-Al-Madina Institute of Management and Allied Health Sciences (NBAMIM &amp; AHS) 
                is dedicated to equipping the regional youth of Punjab with certified clinical skills, modern computer knowledge, 
                and polished global communications capability. We act as a transformative pathway between textbook learning and professional careers.
              </p>
              <p>
                Our rigorous science curricula are fully certified and designed in accordance with current laboratory and hospital parameters. 
                Our laboratory layouts emphasize clean standards, guaranteeing safety while giving students realistic clinical exposures.
              </p>
              <p>
                We believe that premium education shouldn't just be absolute; it should be compassionate, highly focused, and inclusive. 
                Through a blend of medical knowledge, computer mastery, and English fluency, our learners build reliable paths back to global ecosystems.
              </p>
            </div>
          </div>
          
          <div className="about-right">
            <div className="about-gold-corner"></div>
            <div className="about-image-box">
              <div className="about-image-pattern"></div>
              <div className="about-image-center-logo">
                <BookOpen strokeWidth={1} />
                <span>NBAMIM &amp; AHS</span>
              </div>
            </div>
            <div className="about-gold-corner-bottom"></div>
            <div className="badge-est">
              <span>Established</span>
              <span className="badge-est-year">2014</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COURSES SECTION */}
      <section className="courses fade-in-section" id="courses">
        <div className="container">
          <div className="section-heading-centered">
            <span className="section-label">Explore Our Programs</span>
            <h2>Certified Degrees &amp; Professional Specializations</h2>
            <p>
              Explore our core specialized pathways designed by healthcare specialists, seasoned language linguists, and computer developers.
            </p>
          </div>
          
          <div className="courses-grid">
            {/* Card 1 */}
            <div className="course-card">
              <div className="course-icon-container">
                <HeartPulse size={30} />
              </div>
              <h3>Allied Health Sciences</h3>
              <p>
                Comprehensive medical technician training paths including Laboratory Technology (MLT), 
                Operation Theatre Assistant, and Pharmacy programs. Emphasizes mandatory clinical routines, 
                diagnostic methods, and critical patient safety standards inside modern medical labs.
              </p>
              <button onClick={() => handleEnrollClick('allied-health')} className="btn-text-arrow">
                Enroll Now <ArrowRight size={16} />
              </button>
            </div>
            
            {/* Card 2 */}
            <div className="course-card">
              <div className="course-icon-container">
                <MessageSquare size={30} />
              </div>
              <h3>English Language Programs</h3>
              <p>
                From fundamental conversational English to advanced structural academic writing and professional IELTS preparations. 
                Perfect for secure global immigration, foreign academic admissions, corporate fluency, and overseas freelance work.
              </p>
              <button onClick={() => handleEnrollClick('english-language')} className="btn-text-arrow">
                Enroll Now <ArrowRight size={16} />
              </button>
            </div>
            
            {/* Card 3 */}
            <div className="course-card">
              <div className="course-icon-container">
                <Monitor size={30} />
              </div>
              <h3>Computer &amp; IT Courses</h3>
              <p>
                Modern digital learning programs. Focuses on full-cycle web engineering, programming foundations, 
                office software suites, database setups, and smart local IT management workflows to turn students into qualified contributors.
              </p>
              <button onClick={() => handleEnrollClick('computer-it')} className="btn-text-arrow">
                Enroll Now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="why-choose fade-in-section" id="why-us">
        <div className="container">
          <div className="section-heading-centered">
            <span className="section-label">Institutional Quality</span>
            <h2>Key Pillars of Our Educational Excellence</h2>
            <p>
              With ten years of dedicated regional tutoring, we provide academic advantages tailored to real industrial systems.
            </p>
          </div>
          
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-container">
                <GraduationCap size={44} strokeWidth={1.5} />
              </div>
              <h3>Expert Faculty</h3>
              <p>Practical medicine clinicians, technical developers, and experienced language tutors teaching with proven techniques.</p>
            </div>
            
            <div className="why-card">
              <div className="why-icon-container">
                <Award size={44} strokeWidth={1.5} />
              </div>
              <h3>Certified Programs</h3>
              <p>Completely synchronized with official standard frameworks, facilitating smooth state registrations and licensing.</p>
            </div>
            
            <div className="why-card">
              <div className="why-icon-container">
                <Building size={44} strokeWidth={1.5} />
              </div>
              <h3>Modern Facilities</h3>
              <p>Optimized physics, pathology, and chemical labs with high-speed computers and spacious air-conditioned rooms.</p>
            </div>
            
            <div className="why-card">
              <div className="why-icon-container">
                <Briefcase size={44} strokeWidth={1.5} />
              </div>
              <h3>Career Support</h3>
              <p>Direct internships with local clinical centers, interview coaching sessions, and direct community placement ties.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GALLERY SECTION */}
      <section className="gallery fade-in-section" id="gallery">
        <div className="container">
          <div className="section-heading-centered">
            <span className="section-label">Campus Life</span>
            <h2>Captured Moments of Excellence</h2>
            <p>
              Take a visual tour inside our classrooms, active biology labs, study arenas, and professional workshops.
            </p>
          </div>
          
          <div className="gallery-grid">
            {/* Cell 1: Large Wide */}
            <div className="gallery-item gallery-item-wide">
              <div className="gallery-scale-box gallery-bg-navy">
                <div className="gallery-placeholder-pattern"></div>
              </div>
              <div className="gallery-overlay">
                <HeartPulse />
                <h4>Diagnostic Skills Showcase</h4>
                <span>Practical Allied Health Lab</span>
              </div>
            </div>
            
            {/* Cell 2: Tall */}
            <div className="gallery-item gallery-item-tall">
              <div className="gallery-scale-box gallery-bg-accent">
                <div className="gallery-placeholder-pattern" style={{ backgroundSize: '16px 16px' }}></div>
              </div>
              <div className="gallery-overlay">
                <GraduationCap />
                <h4>Anniversary Convocations</h4>
                <span>Est. 2014 Commemoration</span>
              </div>
            </div>
            
            {/* Cell 3: Regular */}
            <div className="gallery-item">
              <div className="gallery-scale-box gallery-bg-sky">
                <div className="gallery-placeholder-pattern"></div>
              </div>
              <div className="gallery-overlay">
                <MessageSquare />
                <h4>Language Presentation Hour</h4>
                <span>English Communication Class</span>
              </div>
            </div>
            
            {/* Cell 4: Regular */}
            <div className="gallery-item">
              <div className="gallery-scale-box gallery-bg-dark">
                <div className="gallery-placeholder-pattern" style={{ backgroundSize: '32px 32px' }}></div>
              </div>
              <div className="gallery-overlay">
                <Monitor />
                <h4>Database Architecture lab</h4>
                <span>Computer &amp; IT Suite</span>
              </div>
            </div>
            
            {/* Cell 5: Wide */}
            <div className="gallery-item gallery-item-wide">
              <div className="gallery-scale-box gallery-bg-slate">
                <div className="gallery-placeholder-pattern"></div>
              </div>
              <div className="gallery-overlay">
                <ExternalLink />
                <h4>Hospital Clinical Placement</h4>
                <span>Practical Operations Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="testimonials fade-in-section" id="testimonials">
        <div className="container">
          <div className="section-heading-centered">
            <span className="section-label">Voices of Success</span>
            <h2>What Our Accomplished Grads Say</h2>
            <p>
              Discover how New Bab-Al-Madina Institute changed the developmental path and lifestyle of our alumni.
            </p>
          </div>
          
          <div className="testimonials-grid">
            {/* Testimonial 1 */}
            <div className="testimonial-card">
              <div className="quote-mark">“</div>
              <p className="testimonial-text">
                Studying Laboratory Technology at NBAMIM &amp; AHS was absolutely incredible. The visual pathology setups 
                and hand-oriented guidance gave me enough diagnostic confidence to secure my residency right after licensing.
              </p>
              <div className="testimonial-user">
                <div className="avatar-initials">AS</div>
                <div className="user-info">
                  <span className="user-name">Ayesha Siddiqa</span>
                  <span className="user-course">Allied Health Alumna</span>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="testimonial-card">
              <div className="quote-mark">“</div>
              <p className="testimonial-text">
                The conversational spoken courses and IELTS modules gave me the confidence I needed. 
                Now I deal regularly with global remote team partners as an IT strategist and software reviewer.
              </p>
              <div className="testimonial-user">
                <div className="avatar-initials">MA</div>
                <div className="user-info">
                  <span className="user-name">Muhammad Ali</span>
                  <span className="user-course">English &amp; IT Graduate</span>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="testimonial-card">
              <div className="quote-mark">“</div>
              <p className="testimonial-text">
                The helpfulness of the professors is unmatched. They went through each medical pharmacy outline 
                patiently, ensuring each student passed key government registration exams with flying scores!
              </p>
              <div className="testimonial-user">
                <div className="avatar-initials">ZF</div>
                <div className="user-info">
                  <span className="user-name">Zainab Fatimah</span>
                  <span className="user-course">Pharmacy Tech Alumna</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-banner-wrapper">
          <div className="cta-background-navy"></div>
          <div className="cta-background-gold"></div>
          
          <div className="cta-banner-container">
            <div className="cta-content">
              <h2>Ready to Start Your Journey?</h2>
              <p>Admissions are actively open for the current academic session. Secure your position now!</p>
            </div>
            <div className="cta-action">
              <button onClick={() => handleEnrollClick()} className="btn btn-cta">
                Apply Now <ChevronRight size={18} style={{ marginLeft: '4px', verticalAlign: 'middle', display: 'inline-block' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL LINKABLE: Interactive Lead retrieval / contact / map form requested in sections */}
      <section className="contact fade-in-section" id="contact" style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-heading-centered" style={{ marginBottom: '40px' }}>
            <span className="section-label">Connect Wit Us</span>
            <h2>We’re Here to Build Your Future</h2>
            <p>Have questions about registration fees, clinical timing, or certificates? Get in touch with our registry team.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'stretch' }} className="responsive-contact-grid">
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '40px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>Official Campus Registry</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1rem' }}>
                  Visit our office or dial during business hours to sit with an advisor. Walks-ins are warmly welcomed.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '4px', backgroundColor: 'rgba(15,45,94,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-navy)' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--primary-navy)' }}>Physical Address</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Madina Campus, Bypass Road, Punjab, Pakistan</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '4px', backgroundColor: 'rgba(15,45,94,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-navy)' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--primary-navy)' }}>Email Contacts</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>nbamimahs@gmail.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '4px', backgroundColor: 'rgba(15,45,94,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-navy)' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--primary-navy)' }}>Telephone Registry</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>+92 (42) 3571-8224 / +92 (300) 456-7890</p>
                  </div>
                </div>
              </div>

              {/* Styled Maps Placeholder Box based on requirements */}
              <div style={{ height: '160px', backgroundColor: 'var(--primary-navy)', borderRadius: '6px', marginTop: '30px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                <Info size={28} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px', color: 'var(--text-light)' }}>Google Maps Location</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>Bypass Road Junction, Pakistan</span>
              </div>
            </div>

            {/* In-page request info form */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '40px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Send An Inquiry</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>Fill out the details below and an admissions officer will reach out directly.</p>
              
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '6px' }}>Applicant Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    required 
                    placeholder="e.g. Hassan Ahmed"
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outlineColor: 'var(--accent-gold)' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '6px' }}>Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="hassan@example.com"
                      value={formData.email} 
                      onChange={handleInputChange} 
                      style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outlineColor: 'var(--accent-gold)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '6px' }}>Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      placeholder="+92 300 1234567"
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outlineColor: 'var(--accent-gold)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '6px' }}>Preferred Stream *</label>
                  <select 
                    name="courseInterest" 
                    value={formData.courseInterest} 
                    onChange={handleInputChange} 
                    style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outlineColor: 'var(--accent-gold)', backgroundColor: 'white' }}
                  >
                    <option value="allied-health">Allied Health Sciences (MLT, OTA, Pharmacy)</option>
                    <option value="english-language">English Language Programs (IELTS / Speaks)</option>
                    <option value="computer-it">Computer &amp; IT Courses (Web Dev / SQL / Office)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '6px' }}>Accompanying Message</label>
                  <textarea 
                    name="message" 
                    rows={3} 
                    placeholder="Tell us about your educational background or current question..."
                    value={formData.message} 
                    onChange={handleInputChange} 
                    style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outlineColor: 'var(--accent-gold)', fontFamily: 'inherit' }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  style={{
                    backgroundColor: 'var(--primary-navy)', 
                    color: 'white', 
                    padding: '14px', 
                    borderRadius: '4px', 
                    border: 'none', 
                    fontWeight: 600, 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-gold)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-navy)'}
                >
                  <Send size={16} /> Send Admissions Message
                </button>
                
                {formSubmitted && (
                  <div style={{ padding: '12px', backgroundColor: '#def7ec', color: '#03543f', borderRadius: '4px', fontSize: '0.9rem', textAlign: 'center', transition: 'all 0.3s' }}>
                    ✔ Thank you! Registration team will call you within 1 business day.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          {/* Col 1 */}
          <div className="footer-col1">
            <a onClick={() => handleNavClick('home')} className="footer-logo cursor-pointer select-none">
              <span>New Bab-Al-Madina Institute</span>
              <span className="footer-logo-sub">Pioneering Professional Excellence</span>
            </a>
            <p className="footer-about-text">
              Providing certified clinical training, technological readiness, and spoken language masteries 
              to empower modern professional communities. Pioneering Professional Excellence.
            </p>
            <div className="footer-socials">
              <button className="footer-social-btn" aria-label="Facebook">
                <Facebook size={18} />
              </button>
              <button className="footer-social-btn" aria-label="YouTube">
                <Youtube size={18} />
              </button>
              <button className="footer-social-btn" aria-label="Instagram">
                <Instagram size={18} />
              </button>
              <button className="footer-social-btn" aria-label="TikTok">
                <Music size={18} />
              </button>
            </div>
          </div>
          
          {/* Col 2 */}
          <div>
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a onClick={() => handleNavClick('home')} className="cursor-pointer">Home</a></li>
              <li><a onClick={() => handleNavClick('about')} className="cursor-pointer">About Institute</a></li>
              <li><a onClick={() => handleNavClick('courses')} className="cursor-pointer">Our Studies</a></li>
              <li><a onClick={() => handleNavClick('why-us')} className="cursor-pointer">Quality Pillars</a></li>
              <li><a onClick={() => handleNavClick('gallery')} className="cursor-pointer">Campus Gallery</a></li>
              <li><a onClick={() => handleNavClick('testimonials')} className="cursor-pointer">Student Success</a></li>
              <li><a onClick={() => handleNavClick('contact')} className="cursor-pointer">Inquiry</a></li>
            </ul>
          </div>
          
          {/* Col 3 */}
          <div>
            <h3>Our Courses</h3>
            <ul className="footer-links">
              <li><a onClick={() => handleEnrollClick('allied-health')} className="cursor-pointer">Medical Lab Technology (MLT)</a></li>
              <li><a onClick={() => handleEnrollClick('allied-health')} className="cursor-pointer">Operation Theatre Assistant (OTA)</a></li>
              <li><a onClick={() => handleEnrollClick('allied-health')} className="cursor-pointer">Pharmacy Technician Course</a></li>
              <li><a onClick={() => handleEnrollClick('english-language')} className="cursor-pointer">IELTS Academic Preparation</a></li>
              <li><a onClick={() => handleEnrollClick('english-language')} className="cursor-pointer">Spoken English Masterclass</a></li>
              <li><a onClick={() => handleEnrollClick('computer-it')} className="cursor-pointer">Full-Stack Web Engineering</a></li>
              <li><a onClick={() => handleEnrollClick('computer-it')} className="cursor-pointer">Digital Marketing Operations</a></li>
            </ul>
          </div>
          
          {/* Col 4 */}
          <div>
            <h3>Keep In Touch</h3>
            <div className="footer-contact-item">
              <MapPin size={18} className="footer-contact-icon" />
              <span>Madina Campus, Bypass Road, Punjab, Pakistan</span>
            </div>
            
            <div className="footer-contact-item">
              <Phone size={18} className="footer-contact-icon" />
              <span>
                +92 (42) 3571-8224 <br />
                +92 (300) 456-7890
              </span>
            </div>
            
            <div className="footer-contact-item">
              <Mail size={18} className="footer-contact-icon" />
              <span>
                nbamimahs@gmail.com
              </span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} NBAMIM &amp; AHS (New Bab-Al-Madina Institute of Management &amp; Allied Health Sciences). All Rights Reserved. <br />
            Registration and certification governed under official educational frameworks.
          </p>
        </div>
      </footer>

      {/* POP-UP FORM ENROLLMENT MODAL */}
      {enrollModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(9, 27, 54, 0.8)',
          backdropFilter: 'blur(5px)',
          zIndex: 10000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            animation: 'fadeInUp 0.3s ease-out',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              backgroundColor: 'var(--primary-navy)',
              color: 'white',
              padding: '24px',
              position: 'relative'
            }}>
              <h3 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '4px' }}>Submit Admission Form</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Secure your seat for the upcoming {new Date().getFullYear()} semester admissions.</p>
              <button 
                onClick={() => setEnrollModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  opacity: 0.8
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '30px' }}>
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '6px' }}>Applicant Name *</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    required 
                    placeholder="Enter your full legal name"
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '6px' }}>Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="Enter your contact email address"
                    value={formData.email} 
                    onChange={handleInputChange} 
                    style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '6px' }}>Active WhatsApp/Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    placeholder="e.g. +92 300 1234567"
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '6px' }}>Program Stream *</label>
                  <select 
                    name="courseInterest" 
                    value={formData.courseInterest} 
                    onChange={handleInputChange} 
                    style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.95rem', backgroundColor: 'white' }}
                  >
                    <option value="allied-health">Allied Health Sciences (MLT, OTA, Pharmacy)</option>
                    <option value="english-language">English Language Programs (IELTS / Spoken)</option>
                    <option value="computer-it">Computer &amp; IT Courses (Web Dev / SQL / Office)</option>
                  </select>
                </div>

                <div style={{ padding: '4px 0 0 0' }}>
                  <button 
                    type="submit" 
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--accent-gold)',
                      color: 'white',
                      padding: '14px',
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-gold-hover)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-gold)'}
                  >
                    Complete Online Application
                  </button>
                </div>

                {formSubmitted && (
                  <div style={{ padding: '12px', backgroundColor: '#def7ec', color: '#03543f', borderRadius: '4px', fontSize: '0.9rem', textAlign: 'center' }}>
                    ✔ Application Received! A registration supervisor will call you today.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
