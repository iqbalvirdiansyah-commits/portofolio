import { createFileRoute } from "@tanstack/react-router";
import GradientText from "../components/GradientText";
import GradientWaves from "../components/GradientWaves";
import DecryptedText from "../components/DecryptedText";
import LightRays from "../components/LightRays";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Iqbal Virdiansyah | Product & Web Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Iqbal Virdiansyah: web platforms, AI products, and sponsorship work including MUNKEY, Lingua, Siakin, and COMPFEST 18.",
      },
      { property: "og:title", content: "Iqbal Virdiansyah | Product & Web Portfolio" },
      {
        property: "og:description",
        content:
          "Selected work: MUNKEY, Lingua, Siakin, and sponsorship deals at COMPFEST 18.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const projects = [
  {
    name: "MUNKEY",
    role: "Backend Engineer",
    year: "2025",
    href: "https://munkey-zeta.vercel.app/",
    desc: "A comprehensive platform for Model United Nations delegates featuring news, skill-sharing, and DiplomAI-an AI-driven debate simulator.",
    tags: ["Backend", "AI Simulation", "API Design"],
    image: "/munkey.png",
  },
  {
    name: "Lingua",
    role: "Design & Build",
    year: "2025",
    href: "https://lingua-phi.vercel.app/",
    desc: "A lightweight and focused language learning space, crafted with micro-interactions for a seamless and engaging practice flow.",
    tags: ["React", "Motion", "UX Writing"],
    image: "/lingua.png",
  },
  {
    name: "Siakin",
    role: "Founder",
    year: "2026",
    href: "https://siakin.com",
    desc: "A fast and reliable course-bidding service designed to secure students' desired classes during peak traffic hours.",
    tags: ["Automation", "Ops", "Growth"],
    image: "/siakin.png",
  },
];

const activities = [
  {
    num: "01",
    year: "2025",
    title: "COMPFEST 18 Sponsorship",
    role: "Sponsorship Lead",
    body: "Closed sponsorship deals with Google Cloud Platform and WIZ AI for Indonesia's largest student-led technology event.",
    tags: ["B2B", "Tech Events", "Negotiation"],
  },
  {
    num: "02",
    year: "2025",
    title: "DiplomAI Research",
    role: "AI Researcher",
    body: "Designed an AI simulation pipeline to evaluate arguments of MUN delegates in real-time, pushing the frontier of AI-assisted debate tools.",
    tags: ["AI", "Research", "NLP"],
  },
  {
    num: "03",
    year: "2026",
    title: "Siakin Launch",
    role: "Founder & Operator",
    body: "Scaled from an initial concept to a paid service with hundreds of users within a single course registration season.",
    tags: ["Product", "Growth", "Automation"],
  },
];

const achievements = [
  {
    title: "Finalist RISTEK Hackathon",
    org: "RISTEK Fasilkom UI",
    role: "AI Engineer & Backend",
    year: "2026",
    body: "Advanced to the final round as an AI & Backend Engineer, building and presenting a working product prototype within days.",
    image: "/ristek.jpg",
  },
];

const stack = [
  "React",
  "TypeScript",
  "Next.js",
  "Framer Motion",
  "Product Design",
  "Business Development",
];

function AchievementRow({ item, index }: { item: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative border-b border-border py-8 transition-colors hover:bg-foreground/[0.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Teks Content */}
      <div className="relative z-10 w-full md:w-[65%]">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-primary">
          <span>{item.year}</span>
          <span className="h-1 w-1 rounded-full bg-primary/50" />
          <span>{item.org}</span>
        </div>
        <h3 className="mt-3 text-3xl font-light text-foreground transition-transform duration-500 group-hover:translate-x-2">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">{item.role}</p>

        <div 
          className={`grid transition-all duration-500 ease-in-out ${
            isHovered ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Image */}
      <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 w-[320px] pointer-events-none z-20">
        <div 
          className={`relative h-[220px] w-full overflow-hidden rounded-2xl transition-all duration-700 ease-out origin-center shadow-2xl ${
            isHovered ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-3"
          }`}
        >
          {item.image && (
            <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 ring-1 ring-inset ring-border rounded-2xl" />
        </div>
      </div>
    </div>
  );
}


function Magnetic({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      {children}
    </motion.span>
  );
}

function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = (index: number, dir: number) => {
    setDirection(dir);
    setCurrentIndex(index);
  };
  const prev = () => {
    const ni = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goTo(ni, -1);
  };
  const next = () => {
    const ni = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goTo(ni, 1);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  const p = projects[currentIndex];

  return (
    <div className="relative">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-sm uppercase tracking-[0.35em] text-primary"
        >
          Selected work
        </motion.h2>
        <span className="text-sm text-muted-foreground font-mono">
          {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row"
          >
            {/* Image Side */}
            <div className="relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[360px] overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              {/* Overlay fade for mobile only */}
              <div className="md:hidden absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              {/* Overlay fade for desktop */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card" />
            </div>

            {/* Info Side */}
            <div className="w-full md:w-3/5 p-8 sm:p-10 flex flex-col justify-center">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-primary">
                    {p.role} &middot; {p.year}
                  </p>
                  <h3 className="mt-2 text-3xl sm:text-4xl font-light text-foreground">{p.name}</h3>
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  View <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-foreground/5 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
          aria-label="Previous project"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
          aria-label="Next project"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
            aria-label={`Go to project ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-primary w-6 h-2"
                : "bg-foreground/20 w-2 h-2 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ActivitiesTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });
  
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section id="activities" ref={containerRef} className="mx-auto max-w-5xl px-6 py-28 relative">
      <motion.h2
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="text-sm uppercase tracking-[0.35em] text-primary text-center md:text-left mb-20"
      >
        Activities
      </motion.h2>

      <div className="relative mx-auto max-w-4xl">
        {/* Center line (background) */}
        <div className="absolute left-[19px] md:left-1/2 top-4 bottom-0 w-[2px] bg-border md:-translate-x-1/2" />
        
        {/* Animated line (foreground) */}
        <motion.div 
           style={{ scaleY, transformOrigin: 'top' }}
           className="absolute left-[19px] md:left-1/2 top-4 bottom-0 w-[2px] bg-primary md:-translate-x-1/2 z-10" 
        />

        <div className="space-y-16 sm:space-y-24">
          {activities.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                 {/* Center Dot */}
                 <div className="absolute left-[19px] md:left-1/2 top-8 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(200,255,0,0.5)]" />
                 
                 {/* Empty space for alternating layout on desktop */}
                 <div className="hidden md:block w-[45%]" />
                 
                 {/* Content */}
                 <div className="w-full pl-16 md:pl-0 md:w-[45%]">
                    <div className="group relative p-8 rounded-3xl border border-primary bg-primary transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                       <span className="text-xs font-mono tracking-widest text-black/70">{item.year}</span>
                       <h3 className="mt-3 text-2xl font-semibold text-black">{item.title}</h3>
                       <p className="mt-1 text-[10px] uppercase tracking-widest text-black/60">{item.role}</p>
                       <p className="mt-5 text-sm leading-relaxed text-black/80">{item.body}</p>
                       <div className="mt-6 flex flex-wrap gap-2">
                         {item.tags.map((t: string) => (
                           <span key={t} className="rounded-full border border-black/20 bg-black/10 px-3 py-1 text-[10px] font-medium text-black">
                             {t}
                           </span>
                         ))}
                       </div>
                    </div>
                 </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.94]);

  return (
    <main className="relative storm-bg">
      {/* Progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-primary"
      />

      {/* Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-5xl items-center justify-between px-6 transition-all duration-300 ${
            isScrolled ? "py-3" : "py-6"
          }`}
        >
          <GradientText
            colors={["#c8ff00", "#ffffff", "#c8ff00"]}
            animationSpeed={5}
            showBorder={false}
            className="!m-0 font-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em]"
          >
            IQBAL VIRDIANSYAH
          </GradientText>

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {["about", "work", "activities", "achievements", "contact"].map((id) => (
              <a key={id} href={`#${id}`} className="transition-colors hover:text-primary">
                {id}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-foreground flex items-center gap-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest">Menu</span>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-border py-4 px-6 flex flex-col gap-4 shadow-xl"
          >
            {["about", "work", "activities", "achievements", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
              >
                {id}
              </a>
            ))}
          </motion.nav>
        )}
      </header>

      {/* ═══════════════════════════════════════ */}
      {/* LAYER 1: HERO — FIXED IN BACKGROUND     */}
      {/* ═══════════════════════════════════════ */}
      <motion.section
        id="about"
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="fixed inset-0 z-0 h-screen w-full flex items-center overflow-hidden bg-background"
      >
        
        {/* Center Content - Quote on left & Socials on right */}
        <div className="relative w-full h-full flex flex-col justify-center px-6 md:px-12 z-20 pointer-events-none mt-10 md:mt-0">
           <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
              
              {/* Left Quote */}
              <div className="relative max-w-[240px] md:max-w-[360px] pointer-events-auto mt-0 md:-mt-24 z-30 mix-blend-difference text-white">
                 <div className="absolute -top-8 -left-4 text-7xl md:text-8xl font-serif leading-none opacity-40">"</div>
                 <h2 className="text-sm md:text-2xl font-bold uppercase leading-relaxed mt-2 relative z-10">
                   DO OR DO NOT, THERE IS NO TRY.
                 </h2>
                 <p className="mt-4 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] relative z-10">- Master Yoda</p>
                 <div className="absolute -bottom-10 right-4 text-7xl md:text-8xl font-serif leading-none opacity-40 rotate-180">"</div>
                 
                 <div className="mt-10 flex gap-4 pointer-events-auto relative z-10">
                    <Magnetic>
                      <a href="#work" className="rounded-full border border-white px-6 py-3 text-xs md:text-sm font-bold text-white hover:bg-white hover:text-black transition-all inline-block">
                        Explore Work
                      </a>
                    </Magnetic>
                 </div>
              </div>

              {/* Right Socials */}
              <div className="hidden md:flex flex-col gap-5 pointer-events-auto z-30 mix-blend-difference text-white mt-0 md:-mt-24 items-end">
                 {[
                   { icon: Github, href: "https://github.com", label: "GitHub" },
                   { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                   { icon: Mail, href: "mailto:iqbalvirdiansyah@gmail.com", label: "Email" }
                 ].map((item) => (
                    <Magnetic key={item.label}>
                       <a href={item.href} target="_blank" rel="noreferrer" className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/50 hover:border-white transition-all duration-300">
                          <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                       </a>
                    </Magnetic>
                 ))}
              </div>

           </div>
        </div>

        {/* Photo - Layer Di Belakang (z-10) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none">
           {/* Massive White Circle Frame */}
           <div className="relative w-[120vh] h-[120vh] md:w-[130vh] md:h-[130vh] rounded-full overflow-hidden bg-white shadow-2xl flex items-end justify-center">
              <img 
                src="/new_iqbal.png" 
                alt="Iqbal Virdiansyah" 
                className="w-auto h-[75%] md:h-[80%] object-contain object-bottom translate-y-[2%] md:translate-y-[4%]" 
              />
           </div>
        </div>

        {/* Floating Resume Button (Right edge) */}
        <button 
          onClick={() => setIsResumeOpen(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 flex items-center gap-2 bg-primary text-black pl-3 pr-1 py-4 rounded-l-xl hover:pr-4 hover:bg-primary/90 transition-all duration-300 shadow-[-10px_0_30px_rgba(200,255,0,0.2)] pointer-events-auto group cursor-pointer"
        >
           <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
           <span className="text-xs font-bold uppercase tracking-[0.2em] select-none" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>RESUME</span>
        </button>

        {/* Giant Name - Layer Depan (z-20) */}
        <div className="absolute bottom-6 md:bottom-10 left-0 w-full z-20 flex justify-center pointer-events-none overflow-hidden px-4">
           <h1 
             className="text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6.5vw] font-black tracking-tighter uppercase leading-[0.8] select-none text-primary whitespace-nowrap"
             style={{ 
               WebkitTextStroke: '2px black'
             }}
           >
             IQBAL VIRDIANSYAH
           </h1>
        </div>
      </motion.section>

      {/* Empty div to capture the scroll progress for hero */}
      <div ref={heroRef} className="absolute inset-x-0 top-0 h-screen pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 2: CONTENT — naik dari bawah menutupi Hero       */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 mt-[100vh] rounded-t-[2.5rem] shadow-[0_-40px_100px_-10px_rgba(0,0,0,0.9)] overflow-hidden bg-background">

        {/* WORK (Creme) */}
        <div className="theme-creme bg-background text-foreground w-full transition-colors duration-500">
          <section id="work" className="mx-auto max-w-5xl px-6 py-28">
            <ProjectCarousel />
          </section>
        </div>

        {/* ACTIVITIES (Hitam) */}
        <div className="relative bg-background text-foreground w-full transition-colors duration-500 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-50">
            <LightRays
              raysOrigin="top-center"
              raysColor="#c8ff00"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
            />
          </div>
          <div className="relative z-10">
            <ActivitiesTimeline />
          </div>
        </div>

        {/* ACHIEVEMENTS (Creme) */}
        <div className="theme-creme bg-background text-foreground w-full transition-colors duration-500">
          <section id="achievements" className="mx-auto max-w-5xl px-6 py-28">
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.35em] text-primary"
            >
              Achievements
            </motion.h2>
            <div className="mt-12 flex flex-col border-t border-border">
              {achievements.map((c, i) => (
                <AchievementRow key={c.title} item={c} index={i} />
              ))}
            </div>
          </section>
        </div>

        {/* CONTACT (Hitam) */}
        <div className="bg-background text-foreground w-full transition-colors duration-500">
          <section id="contact" className="mx-auto max-w-5xl px-6 pb-28 pt-16">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
              className="rounded-3xl surface-card px-5 py-10 sm:px-8 sm:py-14 text-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-gradient-teal">
                Got an idea? Let's build it.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
                Open for product collaborations, sponsorships, and web projects.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Magnetic className="inline-block">
                  <a
                    href="mailto:iqbalvirdiansyah@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
                  >
                    <Mail className="h-4 w-4" /> iqbalvirdiansyah@gmail.com
                  </a>
                </Magnetic>
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <Magnetic key={label} className="inline-block">
                    <a
                      href={href} target="_blank" rel="noreferrer" aria-label={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
            <p className="mt-16 text-center text-xs tracking-[0.2em] text-muted-foreground">
              © {new Date().getFullYear()} IQBAL VIRDIANSYAH
            </p>
          </section>
        </div>
      </div>

      {/* Resume Drawer Popup */}
      <AnimatePresence>
        {isResumeOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm cursor-pointer"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full md:w-[50vw] bg-white z-50 shadow-2xl overflow-y-auto flex flex-col"
            >
               <div className="p-6 md:p-10 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
                  <h2 className="text-2xl font-bold text-black uppercase tracking-tight">Resume / CV</h2>
                  <button onClick={() => setIsResumeOpen(false)} className="p-2 rounded-full hover:bg-gray-100 text-black transition-colors">
                    <X className="w-6 h-6" />
                  </button>
               </div>
               <div className="p-6 md:p-10 flex-1 text-black">
                  <div className="aspect-[1/1.4] w-full bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 font-mono text-sm space-y-4">
                     <p>[ Interactive Resume Viewer ]</p>
                     <p className="text-xs text-gray-400">PDF will be embedded here</p>
                     <a href="#" className="mt-4 px-6 py-2 bg-black text-white rounded-full text-xs hover:bg-black/80 transition-colors uppercase tracking-widest font-bold">Download PDF</a>
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </main>
  );
}