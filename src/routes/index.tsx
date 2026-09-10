import { createFileRoute } from "@tanstack/react-router";
import GradientText from "../components/GradientText";
import GradientWaves from "../components/GradientWaves";
import DecryptedText from "../components/DecryptedText";
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
      className="group relative border-b border-white/10 py-8 transition-colors hover:bg-white/[0.02]"
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
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
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
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </div>

            {/* Info */}
            <div className="p-8 sm:p-10">
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
                  className="mt-1 shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  View <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
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
          className="absolute left-4 top-[calc(9/32*100%)] -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
          aria-label="Previous project"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-[calc(9/32*100%)] -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
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
                : "bg-white/20 w-2 h-2 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ActivityCard({ item, index, total, scrollYProgress }: {
  item: any;
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const start = index / (total + 1);
  const end = (index + 1) / (total + 1);
  const y = useTransform(scrollYProgress, [start, end], [0, -50]);
  const opacity = useTransform(scrollYProgress, [start, Math.min(end + 0.05, 1)], [1, index === total - 1 ? 1 : 0.4]);
  const scale = useTransform(scrollYProgress, [start, end], [1, index === total - 1 ? 1 : 0.97]);

  return (
    <motion.div
      style={{ y, opacity, scale, top: index * 24 }}
      className="sticky rounded-3xl border border-white/10 bg-card p-8 sm:p-10 shadow-[0_-12px_40px_-10px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-start justify-between">
        <span className="text-6xl font-bold leading-none text-primary/15 select-none">{item.num}</span>
        <span className="text-xs uppercase tracking-widest text-primary">{item.year}</span>
      </div>
      <h3 className="mt-4 text-2xl sm:text-3xl font-light text-foreground">{item.title}</h3>
      <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{item.role}</p>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.body}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {item.tags.map((t: string) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function StackedActivities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  return (
    <section id="activities" className="mx-auto max-w-5xl px-6 py-28">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-sm uppercase tracking-[0.35em] text-primary mb-12"
      >
        Activities
      </motion.h2>
      <div ref={containerRef} className="relative flex flex-col gap-6" style={{ paddingBottom: `${activities.length * 24}px` }}>
        {activities.map((a, i) => (
          <ActivityCard key={a.title} item={a} index={i} total={activities.length} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}


function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <main className="relative storm-bg overflow-x-hidden">
      {/* Progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-primary"
      />

      {/* Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-white/10 shadow-sm"
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
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-white/10 py-4 px-6 flex flex-col gap-4 shadow-xl"
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
      {/* LAYER 1: HERO — sticky behind content  */}
      {/* ═══════════════════════════════════════ */}
      <div ref={heroRef} className="relative h-[200vh]">
        <motion.section
          id="about"
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="sticky top-0 h-screen flex items-center overflow-hidden"
        >
          {/* GradientWaves — white on black */}
          <div className="absolute inset-0 z-0">
            <GradientWaves
              horizonColor="#000000"
              waveColor="#999999"
              crestColor="#ffffff"
              speed={0.3}
              amplitude={2.0}
              waveScale={0.5}
              waveRatio={0.9}
              swell={30}
              turbulence={18}
              tilt={1.1}
              zoom={1}
              height={5.5}
              fogDepth={18}
              detail="medium"
              brightness={0.85}
              opacity={1}
              mouseInteraction
              parallaxStrength={0.4}
              grain
              grainIntensity={0.04}
            />
          </div>

          {/* Bottom fade into content layer */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10 bg-gradient-to-t from-background to-transparent" />

          {/* Left photo */}
          <div
            className="absolute inset-y-0 left-0 w-full md:w-[45%] z-0"
            style={{
              WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 100%)",
              maskImage: "linear-gradient(to right, black 40%, transparent 100%)",
            }}
          >
            <img
              src="/iqbal.jpg"
              alt="Iqbal Virdiansyah"
              loading="eager"
              className="h-full w-full object-cover object-[center_30%] opacity-70"
            />
          </div>

          {/* Right readability overlay */}
          <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-[70%] z-0 bg-gradient-to-l from-background via-background/80 to-transparent" />
          <div className="md:hidden pointer-events-none absolute inset-x-0 bottom-0 h-2/3 z-0 bg-gradient-to-t from-background via-background/90 to-transparent" />

          {/* Content */}
          <div className="relative mx-auto w-full max-w-5xl z-10 grid md:grid-cols-[30%_70%] px-6 -mt-20 md:-mt-24">
            <div className="hidden md:block" />
            <div className="flex flex-col justify-center py-20 md:pl-10">
              <motion.p custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.35em] text-primary"
              >
                Jakarta &middot; Product Builder
              </motion.p>

              <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="mt-6 w-fit">
                <GradientText
                  colors={["#c8ff00", "#ffffff", "#c8ff00", "#ffffff", "#c8ff00"]}
                  animationSpeed={4}
                  showBorder={false}
                  className="!m-0 !justify-start text-left text-3xl leading-tight sm:text-4xl"
                >
                  <DecryptedText
                    text="Iqbal Virdiansyah, Information Systems at Universitas Indonesia."
                    animateOn="view"
                    revealDirection="start"
                    sequential={true}
                    speed={30}
                    maxIterations={15}
                  />
                </GradientText>
              </motion.div>

              <motion.p custom={3} variants={fadeUp} initial="hidden" animate="show"
                className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground"
              >
                I am an Information Systems student at Universitas Indonesia with a deep passion for the intersection
                of technology, design, and business. My primary focus is translating user needs into digital solutions
                that are efficient, intuitive, and of high quality.
              </motion.p>

              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show"
                className="mt-8 flex flex-wrap gap-2"
              >
                {stack.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                    {s}
                  </span>
                ))}
              </motion.div>

              <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show"
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Magnetic className="inline-block">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--glow-lime)]"
                  >
                    View works <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Magnetic>
                <a href="#contact" className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline">
                  Let's collaborate
                </a>
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-muted-foreground z-10"
          >
            SCROLL
          </motion.div>
        </motion.section>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 2: CONTENT — naik dari bawah menutupi Hero       */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 rounded-t-[2.5rem] bg-background shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.8)]">

        {/* WORK */}
        <section id="work" className="mx-auto max-w-5xl px-6 py-28">
          <ProjectCarousel />
        </section>

        {/* ACTIVITIES */}
        <StackedActivities />

        {/* ACHIEVEMENTS */}
        <section id="achievements" className="mx-auto max-w-5xl px-6 pb-28 pt-10">
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.35em] text-primary"
          >
            Achievements
          </motion.h2>
          <div className="mt-12 flex flex-col border-t border-white/10">
            {achievements.map((c, i) => (
              <AchievementRow key={c.title} item={c} index={i} />
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-5xl px-6 pb-28 pt-8">
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
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
          <p className="mt-10 text-center text-xs tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} IQBAL VIRDIANSYAH
          </p>
        </section>
      </div>
    </main>
  );
}