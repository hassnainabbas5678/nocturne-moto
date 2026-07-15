import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { ArrowDownRight, ArrowUpRight, Menu, MoveRight, Phone, X } from "lucide-react";

const image = (id, width = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const motorcycles = [
  { no: "01", name: "V4 STRADALE", kind: "Track-bred / 2024", price: "$31,900", power: "214 HP", engine: "1,103 CC", photo: image("photo-1591637333184-19aa84b3e01f") },
  { no: "02", name: "R NINET / 719", kind: "Heritage / 2023", price: "$18,450", power: "109 HP", engine: "1,170 CC", photo: image("photo-1568772585407-9361f9bf3a87") },
  { no: "03", name: "LOWLINE 114", kind: "Grand touring / 2022", price: "$24,200", power: "94 HP", engine: "1,868 CC", photo: image("photo-1609630875171-b1321377ee65") },
];

const nav = ["Inventory", "Studio", "Ownership", "Contact"];

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let frame;
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const listener = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", listener, { passive: true });
    listener();
    return () => window.removeEventListener("scroll", listener);
  }, []);
  return <>
    <header className={`header ${solid ? "header-solid" : ""}`}>
      <a href="#top" className="mark" aria-label="Nocturne Moto home"><i>NM</i><span>NOCTURNE<br />MOTO</span></a>
      <nav aria-label="Primary navigation">{nav.map(item => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav>
      <a className="header-call" href="tel:+12125550199"><Phone size={15} /> +1 212 555 0199</a>
      <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu /></button>
    </header>
    <AnimatePresence>{open && <motion.div className="menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button>
      <p>NOCTURNE / NAVIGATION</p>
      {nav.map((item, index) => <motion.a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * .08 }}>{item}<ArrowUpRight /></motion.a>)}
      <small>NEW YORK / EST. 2009</small>
    </motion.div>}</AnimatePresence>
  </>;
}

function App() {
  useSmoothScroll();
  const [submitted, setSubmitted] = useState(false);
  return <div id="top">
    <Header />
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src="/images/nocturne-hero.png" alt="Graphite superbike in the Nocturne Moto studio" fetchPriority="high" />
        <div className="hero-shadow" />
        <div className="hero-copy">
          <span className="kicker">INDEPENDENT MOTORCYCLE HOUSE / NYC</span>
          <h1 id="hero-title">MOVE<br /><em>WITH</em> INTENT.</h1>
          <p>Rare motorcycles, evaluated with the same appetite for detail that built them.</p>
          <a href="#inventory" className="line-action">Enter inventory <ArrowDownRight /></a>
        </div>
        <div className="hero-index"><b>01</b><span>03</span><i /></div>
        <div className="hero-caption"><span>THE 2024 EDIT</span><small>Curated machinery for the road ahead</small></div>
      </section>

      <section id="inventory" className="inventory section-pad">
        <div className="section-head"><span className="kicker">SELECTED MACHINES / 06 IN RESIDENCE</span><h2>A QUIETLY<br />LOUD <em>COLLECTION.</em></h2><p>Every motorcycle enters by invitation, then earns its place on the floor through a 54-point atelier inspection.</p></div>
        <div className="bike-list">
          {motorcycles.map((bike, index) => <motion.article className="bike-row" key={bike.name} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .55, delay: index * .08 }}>
            <div className="bike-number">{bike.no}</div><div className="bike-photo"><img src={bike.photo} alt={bike.name} loading="lazy" /></div>
            <div className="bike-name"><small>{bike.kind}</small><h3>{bike.name}</h3></div>
            <dl><div><dt>POWER</dt><dd>{bike.power}</dd></div><div><dt>ENGINE</dt><dd>{bike.engine}</dd></div></dl>
            <div className="bike-price"><strong>{bike.price}</strong><a href="#contact" aria-label={`Enquire about ${bike.name}`}><ArrowUpRight /></a></div>
          </motion.article>)}
        </div>
        <a href="#contact" className="all-link">View all available motorcycles <MoveRight /></a>
      </section>

      <section id="studio" className="manifesto">
        <div className="manifesto-image"><img src={image("photo-1558981403-c5f9899a28bc", 1800)} alt="Motorcycle detail in a dark studio" loading="lazy" /></div>
        <div className="manifesto-copy"><span className="kicker">THE NOCTURNE METHOD / 54 POINTS</span><h2>THE MACHINE<br />IS THE <em>EVENT.</em></h2><p>Not rows of inventory. Not a transaction line. We work with riders who know the feeling of a perfect downshift—and expect the rest of the experience to keep up.</p><div className="method"><span>01 / PROVENANCE</span><span>02 / PREPARATION</span><span>03 / HANDOVER</span></div></div>
      </section>

      <section id="ownership" className="ownership section-pad"><div><span className="kicker">OWNERSHIP / MADE PERSONAL</span><h2>THE KEYS ARE<br />ONLY THE <em>START.</em></h2></div><div className="ownership-items"><article><b>01</b><h3>Private sourcing</h3><p>A worldwide search, a clear report, no noise. We handle the chasing, shipping, and due diligence.</p></article><article><b>02</b><h3>Finance, clearly</h3><p>Tailored terms through specialist partners. No showroom theatre and no surprise at the signature.</p></article><article><b>03</b><h3>Delivered differently</h3><p>Set up around you—from suspension baseline to an introductory ride that makes sense for the machine.</p></article></div></section>

      <section id="contact" className="contact">
        <div className="contact-intro"><span className="kicker">PRIVATE APPOINTMENTS / MON–SAT</span><h2>MAKE AN<br /><em>ENTRANCE.</em></h2><p>Tell us the machine you are considering. We’ll reply personally within one business day.</p><a href="tel:+12125550199">+1 212 555 0199</a></div>
        <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          <label>Your name<input required name="name" autoComplete="name" /></label><label>Email address<input required type="email" name="email" autoComplete="email" /></label><label className="full">Interested in<select name="interest" defaultValue=""><option value="" disabled>Select a machine</option>{motorcycles.map(b => <option key={b.name}>{b.name}</option>)}<option>Something not listed</option></select></label><label className="full">What are you looking for?<textarea name="message" rows="4" placeholder="A private viewing, test ride, or a conversation about sourcing…" /></label>
          <button type="submit">{submitted ? "Request received / thank you" : <>Request an appointment <ArrowUpRight /></>}</button>
          {submitted && <p className="form-note" role="status">Your request has been prepared. Our atelier will be in touch shortly.</p>}
        </form>
      </section>
    </main>
    <footer><a href="#top" className="mark"><i>NM</i><span>NOCTURNE<br />MOTO</span></a><p>NEW YORK / USA<br />© 2026 NOCTURNE MOTO</p><div><a href="#inventory">Inventory</a><a href="#contact">Appointments</a><a href="mailto:hello@nocturnemoto.com">Email the atelier</a></div></footer>
  </div>;
}

export default App;
