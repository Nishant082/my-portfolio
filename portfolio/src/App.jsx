import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, ChevronUp, ExternalLink, Briefcase, GraduationCap, Code2, Sparkles } from 'lucide-react';

// --- STYLE CONSTANTS ---
const METALLIC_GRADIENT = "bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500 font-extrabold";
const GLASS_CARD = "bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl border border-white/10 shadow-2xl hover:border-white/30 transition-all duration-500";
const SECTION_SPACING = "py-24 md:py-32"; // Standardized uniform spacing

// --- ANIMATIONS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.3 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

// --- SUB-COMPONENTS ---

const SectionHeader = ({ title, subtitle }) => (
  <motion.div variants={itemVariants} className="text-center mb-20">
    <span className="text-[10px] font-bold tracking-[0.5em] text-gray-500 uppercase block mb-4">— {subtitle} —</span>
    <h2 className={`text-4xl md:text-5xl uppercase tracking-tighter ${METALLIC_GRADIENT}`}>{title}</h2>
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
          {/* Refined: font-bold, text-sm, and gray color for a classy look */}
          <span className="font-bold text-gray-300 text-sm uppercase tracking-wider transition-colors group-hover:text-white">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-[9px] text-gray-600 font-mono tracking-tighter uppercase">{stack}</span>
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
            <ul className="p-5 space-y-3 text-xs text-gray-400 font-light border-x border-b border-white/5 rounded-b-xl bg-black/20">
              {items.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExperienceCard = ({ company, role, date, projects, index }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); 
  return (
    <motion.div variants={itemVariants} className={`relative pl-8 pb-12 border-l border-white/10 last:border-0`}>
      <div className="absolute left-[-5.5px] top-0 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      <div className={`${GLASS_CARD} rounded-3xl overflow-hidden`}>
        <div 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="p-8 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Briefcase size={14} className="text-gray-500" />
              <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{date}</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{company}</h3>
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

// --- MAIN SECTIONS ---

const Nav = () => (
  <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
    <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 flex justify-between items-center shadow-2xl">
      <span className="font-black text-white tracking-tighter cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>NR.</span>
      <div className="hidden md:flex space-x-8 text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#experience" className="hover:text-white transition-colors">Experience</a>
        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
      </div>
      <a href="mailto:nishantrajaram7@gmail.com" className="bg-white text-black text-[9px] font-black px-4 py-2 rounded-full hover:scale-105 transition-all uppercase tracking-widest">Connect</a>
    </div>
  </motion.nav>
);

const Hero = () => (
  <section className="h-[80vh] flex flex-col items-center justify-center relative px-6 text-center">
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 1.5 }}
      className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent"
    />
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="z-10">
      <motion.span variants={itemVariants} className="text-[10px] font-bold tracking-[0.6em] text-gray-500 uppercase mb-6 block"></motion.span>
      <motion.h1 variants={itemVariants} className={`text-7xl md:text-[11rem] leading-[0.8] mb-8 ${METALLIC_GRADIENT}`}>
        NISHANT R
      </motion.h1>
      <motion.p variants={itemVariants} className="max-w-xl mx-auto text-gray-500 text-lg md:text-xl font-light italic mb-12">
        Software Developer specializing in Python, Generative AI, and Backend Architecture.
      </motion.p>
      <motion.div variants={itemVariants} className="flex justify-center">
        <a href="#experience" className="group flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-black text-[10px] tracking-widest hover:bg-gray-200 transition-all">
          EXPLORE CAREER <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </motion.div>
  </section>
);

const About = () => (
  <section id="about" className={`${SECTION_SPACING} scroll-mt-20 container mx-auto px-6`}>
    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
      <motion.div variants={itemVariants} className="relative aspect-square max-w-md mx-auto md:mx-0">
        <div className="absolute inset-0 border border-white/5 rounded-[40px] rotate-6" />
        <div className="absolute inset-0 border border-white/10 rounded-[40px] -rotate-3 transition-transform duration-1000" />
        <div className="relative h-full w-full rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/20">
          <img src="2img.png" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="space-y-8">
        <h2 className={`text-5xl font-black uppercase tracking-tighter ${METALLIC_GRADIENT}`}>My Profile</h2>
        <p className="text-gray-400 text-xl font-light leading-relaxed">
          Based in Bangalore, I solve complex problems through <span className="text-white">intelligent automation</span>. I build systems that don't just work—they perform.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className={`${GLASS_CARD} p-6 rounded-2xl`}>
            <Code2 className="text-white mb-4" size={20} />
            <h4 className="text-white font-bold text-sm mb-1">Backend</h4>
            <p className="text-gray-500 text-[10px] uppercase tracking-tighter font-mono italic">Python • Flask • FastAPI •  SQL • Postgres</p>
          </div>
          <div className={`${GLASS_CARD} p-6 rounded-2xl`}>
            <Sparkles className="text-white mb-4" size={20} />
            <h4 className="text-white font-bold text-sm mb-1">AI/ML</h4>
            <p className="text-gray-500 text-[10px] uppercase tracking-tighter font-mono italic">LLMs • RAG • API Integration • Gen AI</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

const Experience = () => {
  const history = [
    {
      company: "XARPIE LABS",
      role: "Software Developer — GenAI & ML Engineering",
      date: "JULY 2025 — PRES",
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
        { title: "Shootopia - Real-time Shooting Game", stack: "OpenCV • Python • UDP • GUI(Tkinter)", items: ["Real-time IR laser tracking with <5ms latency.", "Achieved 60fps performance for gaming interaction."] },
        { title: "Solitaire Candy World", stack: "Python • K-Means Clustering • Cubic Spline Interpolation", items: ["Analyzed card position patterns using clustering and interpolation.", "Reduced manual design effort by 70%."] }
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
    { cat: "API Integration", title: "Chatbot", desc: "PDF & Image processor using Gemini API.", link: "https://github.com/Nishant082/chatbot" },
    { cat: "ML / 3D", title: "Gesture", desc: "3D Interaction environment with Three.js.", link: "https://github.com/Nishant082/ASL-learning" },
    { cat: "Neural Networks", title: "LSTM Music", desc: "Music generation trained on MIDI files.", link: "https://github.com/Nishant082/LSTM-NN" }
  ];

  return (
    <section id="projects" className={`${SECTION_SPACING} scroll-mt-20 bg-white/[0.01] border-y border-white/5`}>
      <div className="container mx-auto px-6">
        <SectionHeader title="Crafted Works" subtitle="Portfolio" />
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((p, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -10 }} className={`${GLASS_CARD} p-10 rounded-[32px] group relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em]">{p.cat}</span>
              <h4 className="text-2xl font-black mt-4 mb-4 uppercase text-white tracking-tighter">{p.title}</h4>
              <p className="text-gray-500 text-sm font-light mb-10 leading-relaxed italic">"{p.desc}"</p>
              <a href={p.link} target="_blank" className="flex items-center gap-2 text-[10px] font-bold text-white group-hover:gap-4 transition-all uppercase tracking-widest">
                Source Code <ExternalLink size={12} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => (
  <section id="education" className={`${SECTION_SPACING} container mx-auto px-6`}>
    <SectionHeader title="Academic Base" subtitle="Education" />
    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <motion.div variants={itemVariants} className={`${GLASS_CARD} p-10 rounded-[32px]`}>
        <div className="flex justify-between items-start mb-6">
          <GraduationCap className="text-white" size={32} />
          <span className="text-xs font-mono text-white bg-white/10 px-3 py-1 rounded-full">8.65 CGPA</span>
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tighter uppercase mb-2">RNS Institute of Technology</h3>
        <p className="text-gray-400 italic font-light">B.E. Computer Science (AI/ML Specialization)</p>
      </motion.div>
      <motion.div variants={itemVariants} className={`${GLASS_CARD} p-10 rounded-[32px]`}>
        <div className="flex justify-between items-start mb-6">
          <GraduationCap className="text-white/40" size={32} />
          <div className="flex flex-col items-end gap-1 font-mono text-gray-500 text-[10px] uppercase">
            <span>Grade 12: 80%</span>
            <span>Grade 10: 87%</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white/70 tracking-tighter uppercase mb-2">Sri Sri RaviShankar Vidya Mandir</h3>
        <p className="text-gray-500 font-medium italic text-sm">Primary & Secondary Education</p>
      </motion.div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="py-24 border-t border-white/5 bg-black relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    <div className="container mx-auto px-6 text-center">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className={`text-6xl md:text-9xl font-black mb-12 tracking-tighter ${METALLIC_GRADIENT}`}>LET'S BUILD.</h2>
        <a href="mailto:nishantrajaram7@gmail.com" className="text-xl md:text-2xl font-light text-gray-400 hover:text-white transition-all border-b border-white/10 pb-2">
          nishantrajaram7@gmail.com
        </a>
        <div className="flex justify-center gap-10 mt-20 text-[10px] font-bold text-gray-600 tracking-[0.4em] uppercase">
          <a href="https://in.linkedin.com/in/nishant-r-218351254" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/Nishant082/" target="_blank" className="hover:text-white transition-colors">GitHub</a>
        </div>
        <p className="mt-12 text-[9px] text-gray-800 tracking-[0.8em] font-black uppercase">© 2026 NISHANT R. ALL RIGHTS RESERVED.</p>
      </motion.div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <Nav />
      <motion.main initial="hidden" animate="visible">
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