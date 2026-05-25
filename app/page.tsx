'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Smartphone, Database, Layers, Zap,
  Terminal, Box, Mail, ExternalLink, ArrowUpRight,
  ChevronRight, MapPin
} from 'lucide-react';

const SKILLS = [
  { name: 'Flutter', level: 95, icon: '🐦', years: '4.5 yrs' },
  { name: 'Supabase', level: 85, icon: '⚡', years: '2 yrs' },
  { name: 'BLoC / Clean Arch', level: 90, icon: '🧱', years: '3 yrs' },
  { name: 'Dart', level: 95, icon: '🎯', years: '4.5 yrs' },
  { name: 'GoRouter', level: 85, icon: '🛣️', years: '2 yrs' },
  { name: 'GetIt / DI', level: 88, icon: '💉', years: '3 yrs' },
  { name: 'dartz / FP', level: 80, icon: '🔷', years: '2 yrs' },
  { name: 'Next.js', level: 60, icon: '▲', years: '1 yr' },
  { name: 'Python / FastAPI', level: 55, icon: '🐍', years: 'learning' },
];

const PROJECTS = [
  {
    name: 'SocietyLedger',
    tagline: 'Society management & maintenance ledger app',
    desc: 'Full-stack mobile app for residential societies to manage maintenance dues, expenses, member payments, and reporting. Three roles: Super Admin, Society Admin, Member.',
    stack: ['Flutter', 'Supabase', 'BLoC', 'Clean Architecture', 'GoRouter', 'GetIt', 'dartz'],
    status: 'MVP', statusColor: '#22d3a0',
    highlights: ['Phone OTP auth via Twilio', 'Multi-role RBAC', 'PDF receipt generation', 'Payment proof uploads', 'Expense tracking with proof'],
    type: 'Mobile App + Landing Page',
  },
  {
    name: 'IntelliDoc',
    tagline: 'RAG-powered document intelligence',
    desc: 'AI app that lets users query their own documents using retrieval-augmented generation. Built on Claude API + Supabase pgvector + FastAPI backend.',
    stack: ['Flutter', 'Python', 'FastAPI', 'Claude API', 'Supabase pgvector', 'RAG'],
    status: 'In Progress', statusColor: '#f59e0b',
    highlights: ['Claude API integration', 'Vector similarity search', 'Document chunking pipeline', 'Conversational UI'],
    type: 'AI Mobile App',
  },
  {
    name: 'FieldLens',
    tagline: 'Hybrid on-device/cloud visual inspection',
    desc: 'Visual inspection tool using TensorFlow Lite for on-device inference with cloud fallback. Targets field workers needing offline-capable AI analysis.',
    stack: ['Flutter', 'TensorFlow Lite', 'FastAPI', 'Railway', 'Docker'],
    status: 'Planned', statusColor: '#6366f1',
    highlights: ['On-device ML inference', 'Offline-first design', 'Cloud fallback pipeline', 'Edge deployment'],
    type: 'AI + Mobile',
  },
];

const STACK_MARQUEE = ['Flutter','Dart','Supabase','BLoC','Clean Architecture','GoRouter','GetIt','dartz','TensorFlow Lite','Claude API','FastAPI','Python','Next.js','Docker','Railway','Postgres','pgvector','RAG','REST','Twilio'];
const NAV = ['About','Skills','Projects','Contact'];

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let mx=0,my=0,rx=0,ry=0;
    const move=(e:MouseEvent)=>{mx=e.clientX;my=e.clientY;};
    window.addEventListener('mousemove',move);
    let raf:number;
    const loop=()=>{
      rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
      if(dot.current) dot.current.style.transform=`translate(${mx-6}px,${my-6}px)`;
      if(ring.current) ring.current.style.transform=`translate(${rx-18}px,${ry-18}px)`;
      raf=requestAnimationFrame(loop);
    };
    raf=requestAnimationFrame(loop);
    return()=>{window.removeEventListener('mousemove',move);cancelAnimationFrame(raf);};
  },[]);
  return(<><div ref={dot} className="cursor"/><div ref={ring} className="cursor-ring"/></>);
}

function Nav() {
  const [sc,setSc]=useState(false);
  useEffect(()=>{const fn=()=>setSc(window.scrollY>40);window.addEventListener('scroll',fn);return()=>window.removeEventListener('scroll',fn);},[]);
  return(
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 48px',height:'64px',background:sc?'rgba(10,10,15,0.92)':'transparent',backdropFilter:sc?'blur(16px)':'none',borderBottom:sc?'1px solid var(--border)':'1px solid transparent',transition:'all 0.4s ease'}}>
      <div style={{fontFamily:'Syne',fontWeight:800,fontSize:'18px',letterSpacing:'-0.02em'}}>
        <span style={{color:'var(--accent)'}}>AM</span><span style={{color:'var(--text-dim)'}}> /</span>
      </div>
      <div style={{display:'flex',gap:'32px'}}>
        {NAV.map(n=>(
          <a key={n} href={`#${n.toLowerCase()}`} style={{fontSize:'11px',letterSpacing:'0.1em',color:'var(--text-muted)',textDecoration:'none',textTransform:'uppercase',transition:'color 0.2s'}}
            onMouseEnter={e=>(e.currentTarget.style.color='var(--text)')}
            onMouseLeave={e=>(e.currentTarget.style.color='var(--text-muted)')}>{n}</a>
        ))}
      </div>
      <a href="#contact" style={{fontSize:'11px',letterSpacing:'0.08em',padding:'8px 20px',border:'1px solid var(--border)',color:'var(--text-muted)',textDecoration:'none',borderRadius:'4px',transition:'all 0.2s',textTransform:'uppercase'}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)';}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text-muted)';}}>Hire Me</a>
    </nav>
  );
}

function Hero() {
  const [typed,setTyped]=useState('');
  const full='Flutter Developer & AI-Augmented Builder';
  useEffect(()=>{let i=0;const t=setInterval(()=>{setTyped(full.slice(0,++i));if(i>=full.length)clearInterval(t);},38);return()=>clearInterval(t);},[]);
  return(
    <section id="about" className="grid-bg" style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 48px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'20%',right:'15%',width:'480px',height:'480px',background:'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',borderRadius:'50%',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:'10%',left:'5%',width:'320px',height:'320px',background:'radial-gradient(circle, rgba(34,211,160,0.06) 0%, transparent 70%)',borderRadius:'50%',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:'12%',right:'8%',width:'200px',height:'200px',border:'1px solid rgba(99,102,241,0.15)',borderTopColor:'rgba(99,102,241,0.5)',borderRadius:'50%',pointerEvents:'none'}} className="animate-spin-slow"/>
      <div style={{maxWidth:'800px',position:'relative'}}>
        <div className="animate-fade-up delay-100" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 14px',border:'1px solid rgba(34,211,160,0.3)',borderRadius:'4px',marginBottom:'32px',background:'rgba(34,211,160,0.06)'}}>
          <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--green)',display:'inline-block'}}/>
          <span style={{fontSize:'11px',color:'var(--green)',letterSpacing:'0.08em',textTransform:'uppercase'}}>Open to Remote Opportunities</span>
        </div>
        <h1 className="animate-fade-up delay-200" style={{fontSize:'clamp(48px,7vw,88px)',fontWeight:800,lineHeight:1.0,letterSpacing:'-0.03em',marginBottom:'8px'}}>Amin</h1>
        <h1 className="animate-fade-up delay-300" style={{fontSize:'clamp(48px,7vw,88px)',fontWeight:800,lineHeight:1.0,letterSpacing:'-0.03em',marginBottom:'32px',color:'var(--text-dim)'}}>Momin<span style={{color:'var(--accent)'}}>.</span></h1>
        <div className="animate-fade-up delay-400" style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'32px',minHeight:'28px'}}>
          <span style={{color:'var(--accent)',fontFamily:'DM Mono',fontSize:'14px'}}>$ </span>
          <span style={{fontFamily:'DM Mono',fontSize:'14px',color:'var(--text-muted)'}}>{typed}</span>
          <span style={{width:'2px',height:'16px',background:'var(--accent)',display:'inline-block',animation:'blink 1s infinite'}}/>
        </div>
        <p className="animate-fade-up delay-500" style={{fontSize:'16px',lineHeight:1.8,color:'var(--text-muted)',maxWidth:'560px',marginBottom:'48px',fontFamily:'DM Mono'}}>
          4.5 years crafting mobile experiences with Flutter. I build products end-to-end — from database schema to pixel-perfect UI — solo, fast, and powered by AI tooling. Based in <span style={{color:'var(--text)'}}>Ahmedabad, India</span>.
        </p>
        <div className="animate-fade-up delay-600" style={{display:'flex',gap:'16px',flexWrap:'wrap'}}>
          <a href="#projects" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'14px 28px',background:'var(--accent)',color:'#fff',textDecoration:'none',borderRadius:'4px',fontFamily:'Syne',fontWeight:600,fontSize:'13px',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--accent2)';e.currentTarget.style.transform='translateY(-2px)';}}
            onMouseLeave={e=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.transform='translateY(0)';}}
          >View Projects <ArrowUpRight size={14}/></a>
          <a href="#contact" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'14px 28px',border:'1px solid var(--border)',color:'var(--text-muted)',textDecoration:'none',borderRadius:'4px',fontFamily:'Syne',fontWeight:600,fontSize:'13px',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--text)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text-muted)';}}>Get In Touch</a>
        </div>
        <div className="animate-fade-up delay-600" style={{display:'flex',gap:'32px',marginTop:'64px',paddingTop:'32px',borderTop:'1px solid var(--border)',flexWrap:'wrap'}}>
          {[{label:'Experience',value:'4.5 Years'},{label:'Projects',value:'10+'},{label:'Primary Stack',value:'Flutter + Supabase'},{label:'Work Mode',value:'Remote Only'}].map(m=>(
            <div key={m.label}>
              <div style={{fontSize:'11px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'4px'}}>{m.label}</div>
              <div style={{fontFamily:'Syne',fontWeight:700,fontSize:'14px',color:'var(--text)'}}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeBanner() {
  const doubled=[...STACK_MARQUEE,...STACK_MARQUEE];
  return(
    <div style={{borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',padding:'18px 0',overflow:'hidden',background:'var(--surface)'}}>
      <div className="animate-marquee" style={{display:'flex',whiteSpace:'nowrap',width:'max-content'}}>
        {doubled.map((s,i)=>(
          <span key={i} style={{padding:'0 24px',fontSize:'11px',color:i%5===0?'var(--accent)':'var(--text-dim)',letterSpacing:'0.12em',textTransform:'uppercase',borderRight:'1px solid var(--border)'}}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return(
    <section id="skills" style={{padding:'120px 48px',background:'var(--surface)'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'72px'}}>
          <div>
            <div style={{fontSize:'11px',color:'var(--accent)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'12px'}}>— Tech Stack</div>
            <h2 style={{fontSize:'clamp(32px,4vw,52px)',fontWeight:800,letterSpacing:'-0.02em',lineHeight:1.1}}>Skills &<br/><span style={{color:'var(--text-dim)'}}>Expertise</span></h2>
          </div>
          <div style={{fontFamily:'DM Mono',fontSize:'11px',color:'var(--text-dim)',textAlign:'right'}}>
            <div>AI-Augmented</div><div>Development</div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'1px',background:'var(--border)'}}>
          {SKILLS.map(s=>(
            <div key={s.name} className="card-hover" style={{background:'var(--surface)',padding:'28px',border:'1px solid transparent',cursor:'default'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'20px'}}>
                <div>
                  <div style={{fontSize:'22px',marginBottom:'8px'}}>{s.icon}</div>
                  <div style={{fontFamily:'Syne',fontWeight:700,fontSize:'15px'}}>{s.name}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontFamily:'DM Mono',fontSize:'24px',fontWeight:300,color:'var(--accent)'}}>{s.level}<span style={{fontSize:'12px',color:'var(--text-dim)'}}>%</span></div>
                  <div style={{fontSize:'10px',color:'var(--text-dim)',letterSpacing:'0.08em'}}>{s.years}</div>
                </div>
              </div>
              <div style={{height:'2px',background:'var(--border)',borderRadius:'1px',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${s.level}%`,background:'linear-gradient(90deg,var(--accent),var(--green))',borderRadius:'1px'}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [active,setActive]=useState(0);
  const p=PROJECTS[active];
  return(
    <section id="projects" style={{padding:'120px 48px',background:'var(--bg)'}} className="grid-bg">
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{marginBottom:'72px'}}>
          <div style={{fontSize:'11px',color:'var(--accent)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'12px'}}>— Portfolio</div>
          <h2 style={{fontSize:'clamp(32px,4vw,52px)',fontWeight:800,letterSpacing:'-0.02em',lineHeight:1.1}}>Featured<br/><span style={{color:'var(--text-dim)'}}>Projects</span></h2>
        </div>
        <div style={{display:'flex',gap:'0',marginBottom:'48px',borderBottom:'1px solid var(--border)'}}>
          {PROJECTS.map((proj,i)=>(
            <button key={proj.name} onClick={()=>setActive(i)} style={{padding:'14px 28px',background:'none',border:'none',cursor:'pointer',fontFamily:'Syne',fontWeight:600,fontSize:'13px',color:active===i?'var(--text)':'var(--text-dim)',borderBottom:active===i?'2px solid var(--accent)':'2px solid transparent',marginBottom:'-1px',transition:'all 0.2s'}}>{proj.name}</button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'start'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
              <span style={{fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',padding:'4px 10px',borderRadius:'4px',border:`1px solid ${p.statusColor}33`,color:p.statusColor,background:`${p.statusColor}11`}}>{p.status}</span>
              <span style={{fontSize:'11px',color:'var(--text-dim)'}}>{p.type}</span>
            </div>
            <h3 style={{fontFamily:'Syne',fontSize:'36px',fontWeight:800,letterSpacing:'-0.02em',marginBottom:'8px'}}>{p.name}</h3>
            <p style={{fontFamily:'DM Mono',fontSize:'13px',color:'var(--accent)',marginBottom:'20px'}}>{p.tagline}</p>
            <p style={{fontSize:'14px',lineHeight:1.8,color:'var(--text-muted)',marginBottom:'32px'}}>{p.desc}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {p.stack.map(s=><span key={s} className="tag">{s}</span>)}
            </div>
          </div>
          <div style={{background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'8px',padding:'32px'}}>
            <div style={{fontSize:'11px',color:'var(--text-dim)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'24px'}}>Key Features</div>
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              {p.highlights.map((h,i)=>(
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'12px'}}>
                  <ChevronRight size={14} style={{color:'var(--accent)',marginTop:'3px',flexShrink:0}}/>
                  <span style={{fontSize:'13px',color:'var(--text-muted)',lineHeight:1.6}}>{h}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop:'32px',paddingTop:'24px',borderTop:'1px solid var(--border)'}}>
              <div style={{fontSize:'11px',color:'var(--text-dim)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'16px'}}>Architecture</div>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                {['BLoC','Clean Arch','Repository Pattern','DI w/ GetIt'].map(a=>(
                  <span key={a} className="tag" style={{fontSize:'10px'}}>{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return(
    <section style={{padding:'120px 48px',background:'var(--surface)',borderTop:'1px solid var(--border)'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'80px',alignItems:'center'}}>
        <div>
          <div style={{fontSize:'11px',color:'var(--accent)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'12px'}}>— About Me</div>
          <h2 style={{fontSize:'clamp(28px,3.5vw,44px)',fontWeight:800,letterSpacing:'-0.02em',lineHeight:1.2,marginBottom:'28px'}}>
            Solo builder.<br/><span style={{color:'var(--text-dim)'}}>AI-augmented.</span><br/>Full-stack mobile.
          </h2>
          {["I'm a Flutter developer with 4.5 years of experience building production-grade mobile apps. I work independently, owning every layer — from Supabase schema design to BLoC state management to pixel-perfect Flutter UI.",
            "My workflow is AI-Augmented: I use Claude Code as my primary development tool, which lets me ship full-stack products solo at a pace that used to require a full team.",
            "Currently building SocietyLedger while exploring Flutter + AI — RAG pipelines, on-device ML with TensorFlow Lite, and LLM API integration."
          ].map((t,i)=>(
            <p key={i} style={{fontSize:'14px',lineHeight:1.8,color:'var(--text-muted)',marginBottom:'16px'}}>{t}</p>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          {[
            {icon:<MapPin size={16}/>,label:'Location',value:'Ahmedabad, Gujarat, India'},
            {icon:<Smartphone size={16}/>,label:'Primary Platform',value:'Flutter Mobile (iOS + Android)'},
            {icon:<Database size={16}/>,label:'Backend',value:'Supabase (Postgres + Auth + Storage)'},
            {icon:<Layers size={16}/>,label:'Architecture',value:'Clean Architecture + BLoC'},
            {icon:<Zap size={16}/>,label:'Dev Style',value:'AI-Augmented Development'},
            {icon:<Terminal size={16}/>,label:'Dev Tools',value:'Claude Code, VS Code, Android Studio'},
            {icon:<Box size={16}/>,label:'Availability',value:'Remote Full-Time, Mon–Fri, Day Shift'},
          ].map(item=>(
            <div key={item.label} className="card-hover" style={{display:'flex',alignItems:'center',gap:'16px',padding:'16px 20px',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'6px'}}>
              <span style={{color:'var(--accent)',flexShrink:0}}>{item.icon}</span>
              <div>
                <div style={{fontSize:'10px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'2px'}}>{item.label}</div>
                <div style={{fontSize:'13px',color:'var(--text)'}}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return(
    <section id="contact" style={{padding:'120px 48px',background:'var(--bg)'}} className="grid-bg">
      <div style={{maxWidth:'700px',margin:'0 auto',textAlign:'center'}}>
        <div style={{fontSize:'11px',color:'var(--accent)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'16px'}}>— Let's Work Together</div>
        <h2 style={{fontSize:'clamp(36px,5vw,64px)',fontWeight:800,letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:'24px'}}>
          Available for<br/><span style={{color:'var(--accent)'}}>Remote Roles</span>
        </h2>
        <p style={{fontSize:'15px',lineHeight:1.8,color:'var(--text-muted)',marginBottom:'48px'}}>
          Looking for a senior Flutter developer who can own a product end-to-end? I'm open to remote, full-time opportunities with day-shift scheduling.
        </p>
        <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="mailto:amin@example.com" style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'16px 36px',background:'var(--accent)',color:'#fff',textDecoration:'none',borderRadius:'4px',fontFamily:'Syne',fontWeight:700,fontSize:'14px',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--accent2)';e.currentTarget.style.transform='translateY(-2px)';}}
            onMouseLeave={e=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.transform='translateY(0)';}}
          ><Mail size={16}/> Send Email</a>
          <a href="https://linkedin.com/in/amin-momin" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'16px 36px',border:'1px solid var(--border)',color:'var(--text-muted)',textDecoration:'none',borderRadius:'4px',fontFamily:'Syne',fontWeight:700,fontSize:'14px',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--text)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text-muted)';}}>
            <ExternalLink size={16}/> LinkedIn
          </a>
        </div>
        <div style={{marginTop:'80px',paddingTop:'48px',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontFamily:'Syne',fontWeight:800,fontSize:'16px'}}><span style={{color:'var(--accent)'}}>AM</span><span style={{color:'var(--text-dim)'}}> /</span></div>
          <div style={{fontSize:'11px',color:'var(--text-dim)'}}>© 2026 · Built with Next.js + Claude Code</div>
          <div style={{fontSize:'11px',color:'var(--text-dim)'}}>Ahmedabad, IN</div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Cursor/>
      <Nav/>
      <Hero/>
      <MarqueeBanner/>
      <Skills/>
      <Projects/>
      <About/>
      <Contact/>
    </>
  );
}
