import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Gauge,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const img = (id, w = 1400, h = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=82`;

const heroImage = img("photo-1558981285-6f0c94958bb6", 2200, 1400);

const bikes = [
  {
    name: "Apex V4 Carbon",
    type: "Track Specification",
    price: "$31,900",
    img: img("photo-1591637333184-19aa84b3e01f"),
    specs: ["214 hp", "3.1s 0-60", "Carbon aero"],
  },
  {
    name: "R nineT Noir",
    type: "Heritage Roadster",
    price: "$18,450",
    img: img("photo-1568772585407-9361f9bf3a87"),
    specs: ["1170 cc", "Boxer twin", "Billet kit"],
  },
  {
    name: "Midnight Lowline",
    type: "Grand Cruiser",
    price: "$24,200",
    img: img("photo-1609630875171-b1321377ee65"),
    specs: ["114 ci", "Tour pack", "Stage II"],
  },
];

const collections = [
  ["Superbike", "Homologation machines with ceramic braking and active aero."],
  ["Heritage", "Modern classics restored, detailed, and warranty inspected."],
  ["Electric", "Instant torque commuters with private charging consultation."],
  ["Touring", "Long-range luxury rigs prepared for two-up cross-country travel."],
];

const gallery = [
  "photo-1558981403-c5f9899a28bc",
  "photo-1558618666-fcd25c85cd64",
  "photo-1591637333184-19aa84b3e01f",
  "photo-1568772585407-9361f9bf3a87",
  "photo-1609630875171-b1321377ee65",
  "photo-1558981285-6f0c94958bb6",
].map((id, i) => ({ src: img(id, 900, i % 2 ? 1200 : 760), tall: i % 2 === 1 }));

const testimonials = [
  "They found a numbered Panigale I had chased for two years and delivered it in concours condition.",
  "The finance desk felt private, fast, and honest. No dealership theater. Just serious people.",
  "Every surface, signature, and handoff felt like buying a watch from a flagship boutique.",
  "My test ride route was pre-planned with sweepers, highway, and city sections. Ridiculously good.",
];

const faqs = [
  ["Do you ship nationwide?", "Yes. Enclosed, insured transport is available across the continental United States."],
  ["Can I trade in a bike?", "We accept premium trade-ins after inspection, service history review, and market valuation."],
  ["Are the bikes warrantied?", "Every certified unit includes a 90-day atelier warranty with extended options."],
  ["Do you offer track delivery?", "For select superbikes, we provide trackside setup, tire warmers, and suspension baseline tuning."],
];

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      touchMultiplier: 1.25,
    });
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

function useRevealAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 42, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          },
        );
      });

      gsap.utils.toArray("[data-counter]").forEach((el) => {
        const value = Number(el.dataset.counter);
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: value,
            duration: 2,
            snap: { textContent: 1 },
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });

      gsap.to("[data-parallax]", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);
}

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 24, stiffness: 260 });
  const sy = useSpring(y, { damping: 24, stiffness: 260 });
  const [mode, setMode] = useState("default");
  const rotate = useTransform(sx, [-100, window.innerWidth || 1200], [0, 180]);

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 24);
      y.set(event.clientY - 24);
    };
    const over = (event) => {
      const target = event.target.closest("[data-cursor]");
      setMode(target?.dataset.cursor || "default");
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <motion.div
      className={`cursor-shell cursor-${mode}`}
      style={{ x: sx, y: sy, rotate }}
      aria-hidden="true"
    >
      <span className="cursor-core" />
      <span className="cursor-label">{mode === "drag" ? "DRAG" : mode === "view" ? "VIEW" : ""}</span>
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = ["Bikes", "Collections", "Gallery", "Finance", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`nav-shell ${scrolled ? "nav-scrolled" : ""}`}>
        <a href="#hero" className="brand" data-cursor="view">
          <span>NM</span>
          <strong>Nocturne Moto</strong>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} data-cursor="view">
              {link}
            </a>
          ))}
        </nav>
        <a className="cta magnetic" href="#contact" data-cursor="button">
          Book Test Ride <CalendarDays size={16} />
        </a>
        <button className="mobile-menu" type="button" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.aside
            className="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
          >
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <X />
            </button>
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
                {link}
              </a>
            ))}
            <a href="#contact" className="cta" onClick={() => setOpen(false)}>
              Book Test Ride
            </a>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function SectionTitle({ eyebrow, title, copy }) {
  return (
    <div className="section-title" data-reveal>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const onMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rx = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <article ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={`tilt-card ${className}`}>
      {children}
    </article>
  );
}

function App() {
  useLenis();
  useRevealAnimations();
  const stats = useMemo(
    () => [
      ["curated motorcycles", 186, "+"],
      ["client satisfaction", 98, "%"],
      ["avg approval time", 24, "h"],
    ],
    [],
  );

  return (
    <div className="site">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <BackgroundFX />

      <main>
        <section id="hero" className="hero">
          <div className="hero-media" data-parallax>
            <img src={heroImage} alt="Black motorcycle staged in a cinematic showroom" fetchPriority="high" />
          </div>
          <div className="hero-vignette" />
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">Private Superbike Atelier</span>
            <h1>
              Machines with presence. Delivery with ceremony.
            </h1>
            <p>
              A curated dealership for riders who expect rare inventory, transparent finance,
              and a handover worthy of the machine.
            </p>
            <div className="hero-actions">
              <a className="cta magnetic" href="#bikes" data-cursor="button">
                Explore Inventory <ArrowUpRight size={17} />
              </a>
              <a className="ghost-link" href="#gallery" data-cursor="view">
                View showroom
              </a>
            </div>
          </motion.div>
          <motion.div
            className="hero-bike-frame"
            initial={{ opacity: 0, x: 70, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            data-cursor="view"
          >
            <img src={heroImage} alt="Black premium motorcycle side profile" />
          </motion.div>
          <div className="floating-spec spec-one" data-reveal>
            <Gauge />
            <span>214 HP</span>
            <small>atelier tuned</small>
          </div>
          <div className="floating-spec spec-two" data-reveal>
            <Zap />
            <span>3.1 SEC</span>
            <small>0-60 mph</small>
          </div>
          <div className="hero-stats">
            {stats.map(([label, value, suffix]) => (
              <div key={label}>
                <strong data-counter={value}>0</strong>
                <b>{suffix}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="bikes" className="section">
          <SectionTitle
            eyebrow="Featured Bikes"
            title="Inventory edited like a private collection."
            copy="Every unit is inspected, paint-corrected, photographed, and presented with service provenance."
          />
          <div className="bike-grid">
            {bikes.map((bike) => (
              <TiltCard key={bike.name}>
                <div className="card-image" data-cursor="view">
                  <img loading="lazy" src={bike.img} alt={bike.name} />
                </div>
                <div className="card-copy">
                  <span>{bike.type}</span>
                  <h3>{bike.name}</h3>
                  <div className="spec-list">
                    {bike.specs.map((spec) => (
                      <em key={spec}>{spec}</em>
                    ))}
                  </div>
                  <div className="card-footer">
                    <strong>{bike.price}</strong>
                    <button type="button" data-cursor="button">
                      Reserve <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="collections" className="section split">
          <SectionTitle
            eyebrow="Bike Collections"
            title="Four ways to arrive."
            copy="From exotic liter bikes to quiet electric torque, the showroom is organized around riding intent."
          />
          <div className="collection-grid">
            {collections.map(([title, copy], index) => (
              <motion.article
                key={title}
                data-reveal
                className="collection-card"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <ChevronDown />
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section why">
          <SectionTitle eyebrow="Why Choose Us" title="A dealership without the dealership noise." />
          <div className="why-grid">
            {[
              ["Concierge sourcing", "We source rare builds, verify history, and negotiate with quiet precision."],
              ["Certified prep", "Fluids, tires, firmware, paint depth, and fasteners are documented before listing."],
              ["Private finance", "Luxury lending partners, residual guidance, and fast approvals in one room."],
            ].map(([title, copy]) => (
              <div className="why-card" key={title} data-reveal>
                <ShieldCheck />
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="stats-band">
          {[
            ["top verified speed", 201, "mph"],
            ["certified inspections", 54, "pt"],
            ["finance partners", 12, ""],
            ["delivery states", 48, ""],
          ].map(([label, value, suffix]) => (
            <div key={label} data-reveal>
              <strong data-counter={value}>0</strong>
              <b>{suffix}</b>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section id="gallery" className="section">
          <SectionTitle eyebrow="Masonry Gallery" title="Showroom light, carbon shadows, redline details." />
          <div className="masonry">
            {gallery.map((item, index) => (
              <figure key={`${item.src}-${index}`} className={item.tall ? "tall" : ""} data-reveal data-cursor="view">
                <img loading="lazy" src={item.src} alt="Premium motorcycle dealership detail" />
              </figure>
            ))}
          </div>
        </section>

        <section className="testimonials" data-cursor="drag">
          <div className="ticker">
            {[...testimonials, ...testimonials].map((quote, index) => (
              <blockquote key={`${quote}-${index}`}>{quote}</blockquote>
            ))}
          </div>
        </section>

        <section id="finance" className="section finance">
          <SectionTitle eyebrow="Finance Plans" title="Performance ownership, tailored monthly." />
          <div className="plans">
            {[
              ["Signature", "$489", "For certified heritage and naked bikes."],
              ["Apex", "$829", "For superbikes, limited editions, and premium protection."],
              ["Founders", "Custom", "Private sourcing, delivery, and multi-bike portfolio terms."],
            ].map(([name, price, copy]) => (
              <div className="plan" key={name} data-reveal>
                <span>{name}</span>
                <h3>{price}</h3>
                <p>{copy}</p>
                <button type="button" data-cursor="button">
                  Calculate <ArrowUpRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="section faq">
          <SectionTitle eyebrow="FAQ" title="Clear answers before the key turns." />
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q} data-reveal>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <SectionTitle
            eyebrow="Contact"
            title="Book a private viewing."
            copy="Tell us what you ride now and what you want next. Our concierge will confirm a slot within one business hour."
          />
          <form className="contact-form" data-reveal>
            <label>
              Name
              <input type="text" placeholder="Alex Morgan" />
            </label>
            <label>
              Email
              <input type="email" placeholder="alex@company.com" />
            </label>
            <label>
              Interested in
              <select defaultValue="Apex V4 Carbon">
                {bikes.map((bike) => (
                  <option key={bike.name}>{bike.name}</option>
                ))}
              </select>
            </label>
            <label>
              Message
              <textarea placeholder="I would like a private test ride this Friday afternoon." />
            </label>
            <button className="cta magnetic" type="submit" data-cursor="button">
              Request Appointment <Sparkles size={16} />
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div>
          <span>NM</span>
          <h2>Nocturne Moto Atelier</h2>
          <p>Curated performance motorcycles, private finance, and ceremonial delivery.</p>
        </div>
        <nav>
          <a href="#bikes">Inventory</a>
          <a href="#finance">Finance</a>
          <a href="#contact">Test rides</a>
        </nav>
      </footer>
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />;
}

function BackgroundFX() {
  return (
    <div className="background-fx" aria-hidden="true">
      <span className="beam beam-one" />
      <span className="beam beam-two" />
      <span className="spotlight" />
      <span className="reflection" />
    </div>
  );
}

export default App;
