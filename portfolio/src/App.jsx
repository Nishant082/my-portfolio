import React, { useState, useMemo, useRef, useEffect } from 'react';
import './App.css';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, ChevronUp, ExternalLink, Briefcase, GraduationCap, Code2, Sparkles } from 'lucide-react';
import aiBotImg from './assets/aiBot_.png';
import aslImg from './assets/aslImg.png';
import lstmImg from './assets/rnnImg.png';

// --- GENERATIVE BACKGROUND ---
const generateStars = (count) => {
  let stars = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    stars += `${x}px ${y}px #FFF${i < count - 1 ? "," : ""}`;
  }
  return stars;
};

const StarBackground = () => {
  const starsSmall = useMemo(() => generateStars(700), []);
  const starsMedium = useMemo(() => generateStars(200), []);
  const starsBig = useMemo(() => generateStars(100), []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303]">
      <div className="absolute top-0 left-0 w-[1px] h-[1px] bg-transparent animate-[animStar_50s_linear_infinite]" style={{ boxShadow: starsSmall }} />
      <div className="absolute top-[2000px] left-0 w-[1px] h-[1px] bg-transparent animate-[animStar_50s_linear_infinite]" style={{ boxShadow: starsSmall }} />
      <div className="absolute top-0 left-0 w-[2px] h-[2px] bg-transparent animate-[animStar_100s_linear_infinite]" style={{ boxShadow: starsMedium }} />
      <div className="absolute top-[2000px] left-0 w-[2px] h-[2px] bg-transparent animate-[animStar_100s_linear_infinite]" style={{ boxShadow: starsMedium }} />
      <div className="absolute top-0 left-0 w-[3px] h-[3px] bg-transparent animate-[animStar_150s_linear_infinite]" style={{ boxShadow: starsBig }} />
      <div className="absolute top-[2000px] left-0 w-[3px] h-[3px] bg-transparent animate-[animStar_150s_linear_infinite]" style={{ boxShadow: starsBig }} />
    </div>
  );
};

// --- STYLE CONSTANTS ---
const METALLIC_GRADIENT = "bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500 font-extrabold";
const GLASS_CARD = "bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl border border-white/10 shadow-2xl hover:border-white/30 transition-all duration-500";
const SECTION_SPACING = "py-16 md:py-32"; 

// --- ANIMATIONS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// --- SUB-COMPONENTS ---

const SectionHeader = ({ title, subtitle }) => (
  <motion.div variants={itemVariants} className="text-center mb-12 md:mb-20">
    <span className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.5em] text-gray-500 uppercase block mb-4">— {subtitle} —</span>
    <h2 className={`text-3xl md:text-5xl uppercase tracking-tighter ${METALLIC_GRADIENT}`}>{title}</h2>
  </motion.div>
);

const ProjectDetail = ({ title, stack, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 group">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-all"
      >
        <div className="flex items-center gap-3">
          {/* Using Semibold (600) instead of Black (900) for smoothness */}
          <span className="font-semibold text-gray-300 text-sm uppercase tracking-widest transition-colors group-hover:text-white">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-[10px] text-gray-500 font-mono tracking-tighter uppercase">{stack}</span>
          <ChevronDown size={14} className={`text-gray-600 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="overflow-hidden"
          >
            <ul className="p-5 space-y-3 text-xs text-gray-400 font-light border-x border-b border-white/5 rounded-b-xl bg-black/10 leading-relaxed">
              {items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExperienceCard = ({ company, role, date, projects }) => {
  // Set to false so it's closed by default
  const [isExpanded, setIsExpanded] = useState(false); 
  return (
    <motion.div variants={itemVariants} className="relative pl-8 pb-12 border-l border-white/10 last:border-0">
      <div className="absolute left-[-5.5px] top-0 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      <div className={`${GLASS_CARD} rounded-3xl overflow-hidden`}>
        <div 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="p-8 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Briefcase size={14} className="text-gray-500" />
              <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{date}</span>
            </div>
            {/* Reduced from font-black to font-bold for a cleaner look */}
            <h3 className="text-2xl font-bold text-white tracking-tight uppercase">{company}</h3>
            <p className="text-gray-400 text-xs font-medium tracking-tight mt-1">{role}</p>
          </div>
          <div className={`p-3 rounded-full border border-white/10 transition-transform duration-500 ${isExpanded ? 'rotate-180 bg-white text-black' : 'text-white'}`}>
            <ChevronDown size={20} />
          </div>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="px-8 pb-8 pt-2">
                <div className="h-px bg-gradient-to-r from-white/10 to-transparent mb-6" />
                {projects.map((proj, idx) => <ProjectDetail key={idx} {...proj} />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Nav = () => (
  <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl">
    <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full px-6 md:px-8 py-3 md:py-4 flex justify-between items-center shadow-2xl">
      <span className="font-black text-white tracking-tighter cursor-pointer text-sm md:text-base" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>NR.</span>
      <div className="flex space-x-4 md:space-x-8 text-[8px] md:text-[9px] font-bold tracking-[0.15em] md:tracking-[0.2em] text-gray-400 uppercase">
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#experience" className="hover:text-white transition-colors">Work</a>
        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
      </div>
      <a href="mailto:nishantrajaram7@gmail.com" className="bg-white text-black text-[8px] md:text-[9px] font-black px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:scale-105 transition-all uppercase tracking-widest flex-shrink-0">Connect</a>
    </div>
  </motion.nav>
);

const Hero = () => (
  <section className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center overflow-hidden">
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent" />
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="z-10 w-full">
      <motion.h1 variants={itemVariants} className={`text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] leading-[0.9] mb-8 md:mb-12 ${METALLIC_GRADIENT}`}>
        NISHANT R
      </motion.h1>
      <motion.p variants={itemVariants} className="max-w-sm md:max-w-xl mx-auto text-gray-500 text-sm md:text-xl font-light italic mb-12 md:mb-16 tracking-wide leading-relaxed">
        Software Developer specializing in Python, Generative AI, and Backend Architecture.
      </motion.p>
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
        <a href="#about" className="group flex items-center justify-center gap-3 bg-white text-black px-8 md:px-10 py-3 md:py-4 rounded-full font-black text-[9px] md:text-[10px] tracking-widest hover:bg-gray-200 transition-all">
          EXPLORE CAREER <ChevronDown size={12} className="group-hover:translate-y-1 transition-transform" />
        </a>
        <a href="https://drive.google.com/file/d/1GEdGNMquR0Cdsmd9e25wflu-gK0ySeNX/view?usp=sharing" target="_blank" className="flex items-center justify-center gap-3 border border-white/20 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-black text-[9px] md:text-[10px] tracking-widest hover:bg-white/5 transition-all">
          RESUME <ExternalLink size={12} />
        </a>
      </motion.div>
    </motion.div>
  </section>
);

const About = () => (
  <section id="about" className={`${SECTION_SPACING} scroll-mt-20 container mx-auto px-6`}>
    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">
      <motion.div variants={itemVariants} className="relative aspect-square max-w-[300px] md:max-w-md mx-auto md:mx-0 order-2 md:order-1">
        <div className="absolute inset-0 border border-white/5 rounded-[30px] md:rounded-[40px] rotate-6" />
        <div className="absolute inset-0 border border-white/10 rounded-[30px] md:rounded-[40px] -rotate-3 transition-transform duration-1000" />
        <div className="relative h-full w-full rounded-[30px] md:rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/20">
          <img src="2img.png" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="space-y-6 md:space-y-8 order-1 md:order-2 text-center md:text-left">
        <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter ${METALLIC_GRADIENT}`}>My Profile</h2>
        <p className="text-gray-400 text-base md:text-xl font-light leading-relaxed">
          Based in Bangalore, I solve complex problems through <span className="text-white">intelligent automation</span>. I build systems that don't just work they perform :) 
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`${GLASS_CARD} p-5 md:p-6 rounded-2xl`}>
            <Code2 className="text-white mb-3 md:mb-4 mx-auto md:mx-0" size={20} />
            <h4 className="text-white font-bold text-xs md:text-sm mb-1 text-center md:text-left">Backend</h4>
            <p className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-tighter font-mono italic text-center md:text-left">Python • Flask • FastAPI • SQL • Postgres</p>
          </div>
          <div className={`${GLASS_CARD} p-5 md:p-6 rounded-2xl`}>
            <Sparkles className="text-white mb-3 md:mb-4 mx-auto md:mx-0" size={20} />
            <h4 className="text-white font-bold text-xs md:text-sm mb-1 text-center md:text-left">AI/ML</h4>
            <p className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-tighter font-mono italic text-center md:text-left">LLMs • RAG • API Integration • Gen AI</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

const Experience = () => {
  const history = [
    {
      company: "Peterson Technology Partners",
      role: "Junior Software Developer — Conversational AI",
      date: "FEB 2026 — PRESENT",
      projects: [
        { title: "Building Conversational Flows", stack: "Internal Apps and Tools", items: ["Designed and implemented conversational flows using internal tools.", "Enhanced user experience through intuitive dialogue design and seamless integration with backend systems.","Worked with linking APIs seamlessly to ensure smooth data flow and conversation continuity."] },
      ]
    },
    {
      company: "XARPIE LABS",
      role: "Software Developer — GenAI & ML Engineering",
      date: "JULY 2025 — FEB 2026",
      projects: [
        { title: "Mantrika AI - AI HR", stack: "Python • Flask • OpenAI • SQLite", items: ["Engineered AI candidate profiling using GPT-4 API.", "Integrated GitHub REST API for automated code analysis.","Linked API calls using Flask and stored details in SQLite database."] },
        { title: "Professor of Practice Platform", stack: "Python • FastAPI • React • Postgres", items: ["Developed vetting platform connecting industry professionals with academia.", "Built RESTful APIs and document upload systems.","Implemented role-based access control and multi-factor authentication (OTP & Google OAuth)."] },
        { title: "AI Dashboard Platform", stack: "Python • Streamlit • ML", items: ["Developed interactive visualization for construction metrics.", "Integrated geospatial mapping and Ensemble Learning for profit prediction."] }
      ]
    },
    {
      company: "SUPERHUGE STUDIOS",
      role: "Project Intern — Developer",
      date: "NOV 2024 — MAY 2025",
      projects: [
        { title: "Shootopia - Real-time Shooting Game", stack: "OpenCV • Python • UDP • GUI(Tkinter)", items: ["Developed a real-time IR laser tracking with <10ms latency.", "Achieved 60fps performance for gaming interaction.","Sent IR laser positions (normalized to screen) to Unity frontend via UDP sockets."] },
        { title: "Solitaire Candy World", stack: "Python • K-Means Clustering • Cubic Spline Interpolation", items: ["Created a tool to generate card position patterns (returned positions as JSON).", "Analyzed and created new card position patterns using clustering and interpolation.", "Reduced manual design effort by 70%."] }
      ]
    }
  ];

  return (
    <section id="experience" className={`${SECTION_SPACING} scroll-mt-20 container mx-auto px-6`}>
      <SectionHeader title="Career Path" subtitle="Work History" />
      <div className="max-w-4xl mx-auto">
        {history.map((item, i) => <ExperienceCard key={i} index={i} {...item} />)}
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      cat: "API Integration",
      title: "Chatbot",
      desc: "PDF & Image processor using Gemini API.",
      link: "https://github.com/Nishant082/chatbot",
      image: aiBotImg
    },
    {
      cat: "ML / 3D",
      title: "Gesture",
      desc: "3D interaction environment with Three.js.",
      link: "https://github.com/Nishant082/ASL-learning",
      image: aslImg
    },
    {
      cat: "Neural Networks",
      title: "LSTM Music",
      desc: "Music generation trained on MIDI files.",
      link: "https://github.com/Nishant082/LSTM-NN",
      image: lstmImg
    }
  ];

  return (
    <section id="projects" className={`${SECTION_SPACING} scroll-mt-20 bg-white/[0.01] border-y border-white/5`}>
      <div className="container mx-auto px-6">
        <SectionHeader title="Crafted Works" subtitle="Portfolio" />
        <div className="crafted-container max-w-6xl mx-auto">
          {projects.map((p, i) => (
            <motion.div key={i} variants={itemVariants}>
              <CraftedCard {...p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CraftedCard = ({ cat, title, desc, link, image }) => {
  const cardRef = useRef(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const leaveDelayRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const updateBounds = () => {
      setBounds({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight
      });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => {
      window.removeEventListener("resize", updateBounds);
      if (leaveDelayRef.current) clearTimeout(leaveDelayRef.current);
    };
  }, []);

  const mousePX = bounds.width ? mouse.x / bounds.width : 0;
  const mousePY = bounds.height ? mouse.y / bounds.height : 0;

  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`
  };

  const cardBgStyle = {
    transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
    backgroundImage: `url(${image})`
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left - bounds.width / 2,
      y: e.clientY - rect.top - bounds.height / 2
    });
  };

  const handleMouseEnter = () => {
    if (leaveDelayRef.current) clearTimeout(leaveDelayRef.current);
  };

  const handleMouseLeave = () => {
    leaveDelayRef.current = setTimeout(() => {
      setMouse({ x: 0, y: 0 });
    }, 1000);
  };

  return (
    <div
      className="crafted-card-wrap"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="crafted-card" style={cardStyle}>
        <div className="crafted-card-bg" style={cardBgStyle} />
        <div className="crafted-card-info">
          <span className="crafted-card-cat">{cat}</span>
          <h4>{title}</h4>
          <p>{desc}</p>
          <a href={link} target="_blank" rel="noreferrer">
            Source Code <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};

const Education = () => (
  <section id="education" className={`${SECTION_SPACING} container mx-auto px-6`}>
    <SectionHeader title="Academic Base" subtitle="Education" />
    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
      <motion.div variants={itemVariants} className={`${GLASS_CARD} p-8 md:p-10 rounded-[24px] md:rounded-[32px]`}>
        <div className="flex justify-between items-start mb-6">
          <GraduationCap className="text-white" size={28} />
          <span className="text-[10px] md:text-xs font-mono text-white bg-white/10 px-3 py-1 rounded-full">8.65 CGPA</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tighter uppercase mb-2 text-center md:text-left">RNS Institute of Technology</h3>
        <p className="text-gray-400 italic font-light text-xs md:text-sm text-center md:text-left">B.E. Computer Science (AI/ML Specialization)</p>
      </motion.div>
      <motion.div variants={itemVariants} className={`${GLASS_CARD} p-8 md:p-10 rounded-[24px] md:rounded-[32px]`}>
        <div className="flex justify-between items-start mb-6 text-center md:text-left">
          <GraduationCap className="text-white/40" size={28} />
          <div className="flex flex-col items-end gap-1 font-mono text-gray-500 text-[9px] md:text-[10px] uppercase">
            <span>Grade 12: 80%</span>
            <span>Grade 10: 87%</span>
          </div>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white/70 tracking-tighter uppercase mb-2 text-center md:text-left">Sri Sri RaviShankar Vidya Mandir</h3>
        <p className="text-gray-500 font-medium italic text-sm text-center md:text-left">Primary & Secondary Education</p>
      </motion.div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="py-16 md:py-24 border-t border-white/5 bg-black relative overflow-hidden">
    <div className="container mx-auto px-6 text-center">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className={`text-4xl md:text-9xl font-black mb-8 md:mb-12 tracking-tighter ${METALLIC_GRADIENT}`}>LET'S BUILD.</h2>
        <a href="mailto:nishantrajaram7@gmail.com" className="text-base md:text-2xl font-light text-gray-400 hover:text-white transition-all border-b border-white/10 pb-2">
          nishantrajaram7@gmail.com
        </a>
        <div className="flex justify-center gap-6 md:gap-10 mt-12 md:mt-20 text-[8px] md:text-[10px] font-bold text-gray-600 tracking-[0.3em] md:tracking-[0.4em] uppercase">
          <a href="https://in.linkedin.com/in/nishant-r-218351254" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/Nishant082/" target="_blank" className="hover:text-white transition-colors">GitHub</a>
        </div>
        <p className="mt-12 text-[8px] text-gray-800 tracking-[0.5em] md:tracking-[0.8em] font-black uppercase">© 2026 NISHANT R. ALL RIGHTS RESERVED.</p>
      </motion.div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-white selection:text-black overflow-x-hidden relative">
      <StarBackground />
      <Nav />
      <motion.main initial="hidden" animate="visible" className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Footer />
      </motion.main>
    </div>
  );
}
