import { lazy, Suspense, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { FiArrowDownRight, FiDownload, FiExternalLink, FiGithub, FiMail } from 'react-icons/fi';
import { contactCards, heroRoles, navItems, projects, skills, socials, timeline } from './data/portfolio.js';
import Cursor from './components/Cursor.jsx';
import Magnetic from './components/Magnetic.jsx';

const Scene = lazy(() => import('./components/Scene.jsx'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const portraitRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    ScrollTrigger.clearScrollMemory('manual');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      smoothWheel: true,
    });

    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.set('.poster-title, .poster-portrait-wrap, .poster-caption, .poster-credit-strip, .poster-meta-left, .poster-meta-right, .poster-vertical-label, .about-photo-echo', {
        clearProps: 'transform,opacity,filter',
      });
      gsap.set('.poster-portrait-wrap', { transformOrigin: '50% 58%' });
      gsap.set('.poster-transition-band', { yPercent: 100, opacity: 0 });
      gsap.set('.poster-scene-marker', { y: 44, opacity: 0, filter: 'blur(14px)' });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=175%',
          scrub: 1.05,
          pin: true,
          anticipatePin: 1,
        },
      });

      heroTl
        .to('.poster-bg-layer', { yPercent: -7, scale: 1.08, opacity: 0.94, ease: 'none' }, 0)
        .to('.poster-title', { yPercent: -10, scale: 1.04, opacity: 0.82, ease: 'none' }, 0)
        .to('.poster-portrait-wrap', { xPercent: -4, yPercent: -8, scale: 1.2, ease: 'none' }, 0.04)
        .to('.poster-credit-strip', { yPercent: -42, opacity: 0.16, filter: 'blur(6px)', ease: 'none' }, 0.05)
        .to('.poster-caption', { yPercent: -58, scale: 0.9, opacity: 0, filter: 'blur(16px)', ease: 'none' }, 0.1)
        .to('.poster-meta-left, .poster-meta-right, .poster-vertical-label', { yPercent: -30, opacity: 0.22, ease: 'none' }, 0.1)
        .to('.poster-transition-band', { yPercent: 22, opacity: 1, ease: 'none' }, 0.22)
        .to('.poster-title', { yPercent: -22, scale: 1.16, opacity: 0.5, filter: 'blur(1px)', ease: 'none' }, 0.3)
        .to('.poster-portrait-wrap', { xPercent: 8, yPercent: -31, scale: 1.72, opacity: 1, filter: 'blur(0px)', ease: 'none' }, 0.3)
        .to('.poster-scene-marker', { y: 0, opacity: 1, filter: 'blur(0px)', ease: 'none' }, 0.38)
        .to('.poster-bg-layer', { yPercent: -18, scale: 1.18, opacity: 0.62, ease: 'none' }, 0.55)
        .to('.poster-title', { yPercent: -44, scale: 1.25, opacity: 0.22, filter: 'blur(4px)', ease: 'none' }, 0.58)
        .to('.poster-portrait-wrap', { xPercent: -3, yPercent: -94, scale: 2.26, opacity: 0.36, filter: 'blur(7px)', ease: 'none' }, 0.58)
        .to('.poster-transition-band', { yPercent: -12, opacity: 1, ease: 'none' }, 0.64)
        .to('.poster-scene-marker', { y: -40, opacity: 0, filter: 'blur(14px)', ease: 'none' }, 0.82);

      gsap.utils.toArray('.scene-section').forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.cinema-reveal'),
          { y: 70, opacity: 0, filter: 'blur(18px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 70%' },
          },
        );
      });

      gsap.fromTo(
        '.about-photo-echo',
        { y: -220, scale: 1.85, opacity: 0, filter: 'blur(24px)' },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.25,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#about', start: 'top 72%' },
        },
      );
    });

    const onMove = (event) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      const layers = heroRef.current?.querySelectorAll('[data-depth]') || [];
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth || 1);
        gsap.to(layer, {
          x: nx * depth,
          y: ny * depth * 0.65,
          rotateY: nx * depth * 0.04,
          rotateX: -ny * depth * 0.035,
          duration: 0.9,
          ease: 'power3.out',
        });
      });
    };

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="min-h-screen overflow-hidden bg-black text-white selection:bg-sky-300 selection:text-black">
        <Cursor />
        <motion.div className="fixed left-0 top-0 z-[80] h-1 origin-left bg-gradient-to-r from-sky-300 via-white to-red-700" style={{ scaleX: progressScale }} />
        <BackgroundAtmosphere />
        <Nav />
        <main>
          <section ref={heroRef} id="hero" className="poster-hero relative flex min-h-screen items-center justify-center overflow-hidden px-4">
            <div className="poster-layer poster-bg-layer absolute inset-0 z-0" data-depth="8">
              <Suspense fallback={<div className="h-full w-full bg-black" />}>
                <Scene />
              </Suspense>
            </div>

            <div className="poster-layer poster-title-layer pointer-events-none absolute z-10 flex justify-center overflow-hidden" data-depth="18">
              <motion.h1 className="hero-title poster-title font-black uppercase leading-none">
                <span className="poster-title-scale">ANEETA</span>
              </motion.h1>
            </div>

            <div className="poster-layer pointer-events-none absolute inset-x-0 bottom-[-9vh] z-30 flex justify-center" data-depth="30">
              <motion.div
                ref={portraitRef}
                className="poster-portrait-wrap relative flex items-end justify-center"
              >
                <div className="portrait-aura portrait-aura-blue" />
                <div className="portrait-aura portrait-aura-red" />
                <div className="portrait-ground-shadow" />
                <img
                  src="/assets/aneeta-hero.png"
                  alt="Aneeta Peter"
                  className="hero-portrait relative z-20 w-auto object-contain"
                  loading="eager"
                />
              </motion.div>
            </div>

            <div className="poster-transition-band pointer-events-none absolute inset-x-0 bottom-[-2px] z-[35]">
              <div className="poster-transition-rail" />
              <div className="poster-scene-marker">
                <span>Scene 02</span>
                <strong>Origin Story</strong>
              </div>
            </div>

            <div className="poster-layer poster-ui-layer pointer-events-none absolute inset-0 z-40 mx-auto w-full max-w-[1500px]" data-depth="42">
              <motion.div
                className="poster-credit-strip hidden md:grid"
              >
                <span>Flutter Developer</span>
                <span>Full Stack Developer</span>
                <span>AI Enthusiast</span>
                <span>Creative Engineer</span>
              </motion.div>

              <motion.div
                className="poster-caption pointer-events-auto absolute inset-x-4 bottom-7 mx-auto text-center"
              >
                <p className="kicker">ANEETA PETER</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2 md:hidden">
                  {heroRoles.map((role) => (
                    <span key={role} className="rounded-full border border-white/12 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/75 backdrop-blur-md">
                      {role}
                    </span>
                  ))}
                </div>
                <p className="poster-tagline mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-white/58 md:text-base">
                  Build beautiful digital experiences with Flutter, React and Artificial Intelligence.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <Magnetic><a href="#projects" className="btn-primary">Explore Projects <FiArrowDownRight /></a></Magnetic>
                  <Magnetic><a href="/assets/Aneeta-Peter.docx" download className="btn-ghost">Download Resume <FiDownload /></a></Magnetic>
                  <Magnetic><a href="#contact" className="btn-ghost">Contact Me <FiMail /></a></Magnetic>
                </div>
              </motion.div>

              <motion.div
                className="poster-meta poster-meta-left hidden md:block"
              >
                <span>Software Engineer</span>
                <strong>Flutter / Full Stack / AI</strong>
              </motion.div>

              <motion.div
                className="poster-meta poster-meta-right hidden md:block"
              >
                <span>Sequence 01</span>
                <strong>Premium Digital Systems</strong>
              </motion.div>

              <div className="poster-vertical-label hidden md:flex">Developer Portfolio</div>
            </div>
          </section>

          <About />
          <Projects />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  );
}

function Nav() {
  return (
    <nav className="poster-nav fixed inset-x-0 top-0 z-[70] px-5 py-4">
      <div className="poster-nav-shell mx-auto flex max-w-7xl items-center justify-between">
        <a href="#hero" className="poster-logo magnetic flex items-center justify-center rounded-full bg-white font-black text-black">
          AP
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={item === 'Resume' ? '/assets/Aneeta-Peter.docx' : `#${item.toLowerCase()}`}
              download={item === 'Resume' ? true : undefined}
              className="poster-nav-link magnetic rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/58 transition hover:bg-white/10 hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="poster-social magnetic grid place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:border-sky-300/50 hover:text-sky-200">
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function BackgroundAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_78%_42%,rgba(127,29,29,0.16),transparent_25%),linear-gradient(180deg,#020202,#060606_45%,#020202)]" />
      <div className="noise" />
      <div className="fog fog-a" />
      <div className="fog fog-b" />
      <div className="light-ray left-[18%]" />
      <div className="light-ray left-[68%] opacity-40" />
    </div>
  );
}

function SectionShell({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`scene-section relative z-10 min-h-screen px-5 py-28 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="cinema-reveal mb-14">
          <p className="kicker">{eyebrow}</p>
          <h2 className="section-heading mt-4">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <SectionShell id="about" eyebrow="Origin Story" title="A developer scene with a pulse.">
      <div className="about-photo-echo pointer-events-none hidden lg:block">
        <img src="/assets/aneeta-hero.png" alt="" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="cinema-reveal glass-panel p-8 md:p-10">
          <p className="text-xl leading-9 text-white/75">
            I am Aneeta Peter, a Computer Science and Data Analytics student building mobile, web, and AI-driven products. I like interfaces that feel calm, systems that scale, and ideas that become usable quickly.
          </p>
          <p className="mt-6 text-base leading-8 text-white/55">
            My work moves between Flutter apps, full-stack platforms, machine learning concepts, and healthcare technology. The goal is simple: turn technical depth into experiences people can understand, trust, and enjoy using.
          </p>
        </div>
        <div className="cinema-reveal grid gap-4">
          {timeline.slice(1).map((item) => (
            <TimelineCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function Projects() {
  return (
    <SectionShell id="projects" eyebrow="Featured Work" title="Projects staged like key scenes.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: index * 0.08, duration: 0.7 }}
            className={`project-card cinema-reveal group ${project.accent}`}
          >
            <div className="project-preview">
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.24em] text-sky-200/70">{project.type}</p>
            <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em]">{project.name}</h3>
            <p className="mt-4 min-h-24 text-sm leading-7 text-white/58">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => <span key={tech} className="chip">{tech}</span>)}
            </div>
            <div className="mt-8 flex gap-3">
              <a className="icon-link" href="https://github.com/Aneetapeter/portfolio" target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub`}><FiGithub /></a>
              <a className="icon-link" href="#contact" aria-label={`${project.name} live demo`}><FiExternalLink /></a>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}

function Experience() {
  return (
    <SectionShell id="experience" eyebrow="Experience" title="A timeline with momentum.">
      <div className="relative grid gap-5">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-sky-300/60 to-transparent md:block" />
        {timeline.map((item) => <TimelineCard key={item.title} {...item} />)}
      </div>
    </SectionShell>
  );
}

function TimelineCard({ year, title, meta, body }) {
  return (
    <article className="glass-panel cinema-reveal relative overflow-hidden p-6 md:ml-12 md:p-8">
      <div className="absolute -left-[53px] top-9 hidden h-3 w-3 rounded-full bg-sky-200 shadow-[0_0_25px_rgba(125,211,252,0.9)] md:block" />
      <p className="kicker">{year}</p>
      <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.03em]">{title}</h3>
      <p className="mt-2 text-sm font-semibold text-sky-200/80">{meta}</p>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/58">{body}</p>
    </article>
  );
}

function Skills() {
  return (
    <SectionShell id="skills" eyebrow="Technical Arsenal" title="A constellation of tools.">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {skills.map(({ name, icon: Icon, tone }, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.78, rotate: -4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.035, duration: 0.55 }}
            className={`skill-orb cinema-reveal ${tone}`}
          >
            <Icon className="text-4xl" />
            <span>{name}</span>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function Contact() {
  return (
    <SectionShell id="contact" eyebrow="Final Scene" title="Let's build something memorable.">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="cinema-reveal glass-panel p-8 md:p-10">
          <p className="text-xl leading-9 text-white/72">
            I am open to internships, collaborations, and ambitious digital products that need thoughtful engineering and a strong visual signature.
          </p>
          <Magnetic>
            <a href="mailto:aneetaaaa62388@gmail.com" className="btn-primary mt-8 inline-flex">
              Start a Conversation <FiMail />
            </a>
          </Magnetic>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {contactCards.map(({ label, value, href, icon: Icon }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="contact-card cinema-reveal">
              <Icon className="text-3xl" />
              <span>{label}</span>
              <strong>{value}</strong>
            </a>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 px-5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-white/45 md:flex-row">
        <span className="font-black uppercase tracking-[0.35em] text-white">Aneeta Peter</span>
        <span className="h-px w-40 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
        <span>Designed and built as a cinematic developer experience.</span>
      </div>
    </footer>
  );
}

export default App;
