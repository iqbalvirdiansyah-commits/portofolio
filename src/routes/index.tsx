import { createFileRoute } from "@tanstack/react-router";
import AccordionGallery from "../components/AccordionGallery";
import GradientText from "../components/GradientText";
import GradientWaves from "../components/GradientWaves";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Trophy, Menu, X } from "lucide-react";



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
    desc: "A comprehensive platform for Model United Nations delegates featuring news, skill-sharing, and DiplomAI—an AI-driven debate simulator.",
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
    year: "2025",
    title: "COMPFEST 18 Sponsorship",
    body: "Closed sponsorship deals with Google Cloud Platform and WIZ AI for Indonesia's largest student-led technology event.",
  },
  {
    year: "2025",
    title: "DiplomAI Research",
    body: "Designed an AI simulation pipeline to evaluate arguments of MUN delegates in real-time.",
  },
  {
    year: "2026",
    title: "Siakin Launch",
    body: "Scaled from an initial concept to a paid service with hundreds of users within a single course registration season.",
  },
];

const competitions = [
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
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroFade = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const glowScale = useTransform(heroProgress, [0, 1], [1, 1.6]);

  return (
    <main className="relative min-h-screen storm-bg overflow-x-hidden">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-primary"
      />

      <header 
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/80 backdrop-blur-md border-b border-white/5 shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div 
          className={`mx-auto flex max-w-5xl items-center justify-between px-6 transition-all duration-300 ${
            isScrolled ? "py-3" : "py-6"
          }`}
        >
          <GradientText
            colors={["#14B8A6", "#0EA5E9", "#14B8A6"]}
            animationSpeed={6}
            showBorder={false}
            className="!m-0 font-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em]"
          >
            IQBAL VIRDIANSYAH
          </GradientText>
          
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {["about", "work", "activities", "competitions", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="relative transition-colors hover:text-primary"
              >
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

        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-border py-4 px-6 flex flex-col gap-4 shadow-xl"
          >
            {["about", "work", "activities", "competitions", "contact"].map((id) => (
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

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center px-6"
      >
        <div className="absolute inset-0 z-0 overflow-hidden opacity-60">
          <GradientWaves
            horizonColor="#051216"
            waveColor="#0ea5e9"
            crestColor="#14b8a6"
            speed={0.4}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1}
            height={5.5}
            fogDepth={15}
            detail="medium"
            brightness={1}
            opacity={1}
            mouseInteraction
            parallaxStrength={0.5}
            grain
            grainIntensity={0.05}
          />
        </div>
        
        {/* Gradient overlay to fade bottom into background */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <motion.div
          style={{ y: heroY, opacity: heroFade }}
          className="relative mx-auto w-full max-w-5xl z-10"
        >
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.35em] text-primary"
          >
            Jakarta &middot; Product Builder
          </motion.p>

          <h1 className="mt-6 max-w-3xl text-4xl sm:text-5xl md:text-7xl leading-[1.15] sm:leading-[1.05]">
            {["Building", "digital products", "that feel alive."].map(
              (line, i) => (
                <motion.div
                  key={line}
                  custom={i + 1}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="block w-fit"
                >
                  <GradientText
                    colors={["#14B8A6", "#0EA5E9", "#14B8A6"]}
                    animationSpeed={8}
                    showBorder={false}
                    className="!m-0 !justify-start"
                  >
                    {line}
                  </GradientText>
                </motion.div>
              ),
            )}
          </h1>


          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic className="inline-block">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--glow-teal)]"
              >
                View works <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              Let's collaborate
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-muted-foreground"
        >
          SCROLL
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-5xl px-6 py-28">
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,340px)_1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -6, rotate: -1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative overflow-hidden rounded-3xl surface-card p-2 aspect-[4/5] md:aspect-auto"
          >
            <img
              src={"/iqbal.jpg"}
              alt="Iqbal Virdiansyah, mahasiswa Sistem Informasi Universitas Indonesia"
              loading="lazy"
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="pointer-events-none absolute inset-2 rounded-2xl ring-1 ring-primary/20" />
          </motion.div>

          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.35em] text-primary"
            >
              About
            </motion.h2>
              <motion.div
                custom={1}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-6 w-fit"
              >
                <GradientText
                  colors={["#14B8A6", "#0EA5E9", "#14B8A6"]}
                  animationSpeed={8}
                  showBorder={false}
                  className="!m-0 !justify-start text-left text-3xl leading-tight sm:text-4xl"
                >
                  Iqbal Virdiansyah, Sistem Informasi Universitas Indonesia.
                </GradientText>
              </motion.div>
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground"
            >
              I am an Information Systems student at Universitas Indonesia with a deep passion for the intersection of technology, design, and business. My primary focus is translating user needs into digital solutions that are efficient, intuitive, and of high quality. My approach spans the entire development lifecycle—from initial research and prototyping to the final launch—delivering tangible impact for users.
            </motion.p>
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* WORK */}

      <section id="work" className="relative mx-auto max-w-5xl px-6 py-28">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-sm uppercase tracking-[0.35em] text-primary"
        >
          Selected work
        </motion.h2>

        <div className="mt-12 md:mt-20">
          {/* Desktop Layout: Accordion Gallery */}
          <div className="hidden md:block">
            <AccordionGallery
              items={projects.map(p => ({
                image: p.image || '',
                label: p.name,
                link: p.href,
                description: `${p.role} — ${p.desc}`
              }))}
              defaultIndex={0}
              expandRatio={0.52}
              trigger="hover"
              accentColor="#ffffff"
              overlayColor="#0a0713"
              textColor="#ffffff"
              grayscale={false}
              showLabels={true}
              duration={0.6}
              ease="power3.out"
              parallax={0.5}
              tilt={8}
              stagger={0.06}
              height={500}
              gap={10}
              radius={24}
              orientation="horizontal"
            />
          </div>

          {/* Mobile Layout: Stacked Cards */}
          <div className="md:hidden flex flex-col gap-8">
            {projects.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 0.98 }}
                className="group block rounded-[2rem] surface-card border border-white/5 overflow-hidden shadow-xl"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative ring-1 ring-primary/20">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0713]/80 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl text-foreground font-medium">{p.name}</h3>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-primary/80">
                    {p.role} &middot; {p.year}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {p.desc}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITIES - scrollytelling timeline */}
      <ActivitiesSection />

      {/* COMPETITIONS */}
      <section id="competitions" className="mx-auto max-w-5xl px-6 pb-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-sm uppercase tracking-[0.35em] text-primary"
        >
          Competitions
        </motion.h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {competitions.map((c, i) => (
            <motion.div
              key={c.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="rounded-2xl surface-card p-5 sm:p-7"
            >
              {c.image && (
                <div className="mb-6 overflow-hidden rounded-xl ring-1 ring-primary/20">
                  <img
                    src={c.image}
                    alt="Iqbal Virdiansyah presenting at the RISTEK Hackathon final, Fakultas Ilmu Komputer Universitas Indonesia"
                    loading="lazy"
                    className="h-52 w-full object-cover"
                  />
                </div>
              )}
              <Trophy className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-xl text-foreground">{c.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary/80">
                {c.org} · {c.role} · {c.year}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-5xl px-6 pb-28 pt-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
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
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
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
    </main>
  );
}

function ActivitiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.3,
  });

  return (
    <section id="activities" className="mx-auto max-w-5xl px-6 py-28">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-sm uppercase tracking-[0.35em] text-primary"
      >
        Activities
      </motion.h2>

      <div ref={ref} className="relative mt-12 pl-8">
        <div className="absolute left-[3px] top-0 h-full w-px bg-border" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-[3px] top-0 h-full w-px origin-top bg-primary"
        />

        <div className="space-y-14">
          {activities.map((a, i) => (
            <motion.div
              key={a.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <span className="absolute -left-8 top-2 h-[9px] w-[9px] -translate-x-[3px] rounded-full bg-primary shadow-[var(--glow-teal)]" />
              <p className="text-xs tracking-[0.25em] text-muted-foreground">
                {a.year}
              </p>
              <h3 className="mt-2 text-2xl text-foreground">{a.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {a.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
