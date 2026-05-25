'use client';
import { useEffect, useRef, useState } from 'react';
import { Smartphone, Database, Layers, Zap, Terminal, Box, Mail, ExternalLink, ArrowUpRight, ChevronRight, MapPin } from 'lucide-react';

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
    status: 'MVP', statusColor: '#16a34a', statusBg: '#f0fdf4',
    highlights: ['Phone OTP auth via Twilio', 'Multi-role RBAC', 'PDF receipt generation', 'Payment proof uploads', 'Expense tracking with proof'],
    type: 'Mobile App + Landing Page',
  },
  {
    name: 'IntelliDoc',
    tagline: 'RAG-powered document intelligence',
    desc: 'AI app that lets users query their own documents using retrieval-augmented generation. Built on Claude API + Supabase pgvector + FastAPI backend.',
    stack: ['Flutter', 'Python', 'FastAPI', 'Claude API', 'Supabase pgvector', 'RAG'],
    status: 'In Progress', statusColor: '#ea580c', statusBg: '#fff7ed',
    highlights: ['Claude API integration', 'Vector similarity search', 'Document chunking pipeline', 'Conversational UI'],
    type: 'AI Mobile App',
  },
  {
    name: 'FieldLens',
    tagline: 'Hybrid on-device/cloud visual inspection',
    desc: 'Visual inspection tool using TensorFlow Lite for on-device inference with cloud fallback. Targets field workers needing offline-capable AI analysis.',
    stack: ['Flutter', 'TensorFlow Lite', 'FastAPI', 'Railway', 'Docker'],
    status: 'Planned', statusColor: '#2563eb', statusBg: '#eff6ff',
    highlights: ['On-device ML inference', 'Offline-first design', 'Cloud fallback pipeline', 'Edge deployment'],
    type: 'AI + Mobile',
  },
];

const MARQUEE = ['Flutter','Dart','Supabase','BLoC','Clean Architecture','GoRouter','GetIt','dartz','TensorFlow Lite','Claude API','FastAPI','Python','Next.js','Docker','Railway','Postgres','pgvector','RAG','REST','Twilio'];
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
      if(dot.current) dot.current.style.transform=`translate(${mx-5}px,${my-5}px)`;
      if(ring.current) ring.current.style.transform=`translate(${rx-16}px,${ry-16}px)`;
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
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 48px',height:'64px',background:sc?'rgba(250,250,248,0.92)':'transparent',backdropFilter:sc?'blur(16px)':'none',borderBottom:sc?'1px solid var(--border)':'1px solid transparent',transition:'all 0.4s ease'}}>
      <div style={{fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:'18px',letterSpacing:'-0.02em',color:'var(--text)'}}>
        AG<span style={{color:'var(--accent)'}}>.</span>
      </div>
      <div style={{display:'flex',gap:'32px'}}>
        {NAV.map(n=>(
          <a key={n} href={`#${n.toLowerCase()}`} style={{fontSize:'11px',letterSpacing:'0.08em',color:'var(--text-muted)',textDecoration:'none',textTransform:'uppercase',transition:'color 0.2s',fontFamily:'JetBrains Mono'}}
            onMouseEnter={e=>(e.currentTarget.style.color='var(--accent)')}
            onMouseLeave={e=>(e.currentTarget.style.color='var(--text-muted)')}>{n}</a>
        ))}
      </div>
      <a href="#contact" style={{fontSize:'11px',letterSpacing:'0.06em',padding:'8px 20px',border:'1.5px solid var(--accent)',color:'var(--accent)',textDecoration:'none',borderRadius:'8px',transition:'all 0.2s',fontFamily:'Bricolage Grotesque',fontWeight:600,background:'transparent'}}
        onMouseEnter={e=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.color='#fff';}}
        onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--accent)';}}>Hire Me</a>
    </nav>
  );
}

function Hero() {
  const [typed,setTyped]=useState('');
  const full='Flutter Developer & AI-Augmented Builder';
  useEffect(()=>{let i=0;const t=setInterval(()=>{setTyped(full.slice(0,++i));if(i>=full.length)clearInterval(t);},40);return()=>clearInterval(t);},[]);

  return(
    <section id="about" className="dot-grid" style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',padding:'80px 48px 60px',position:'relative',overflow:'hidden'}}>
      {/* Soft blobs */}
      <div style={{position:'absolute',top:'15%',right:'10%',width:'500px',height:'500px',background:'radial-gradient(circle,rgba(37,99,235,0.06) 0%,transparent 65%)',borderRadius:'50%',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:'15%',left:'5%',width:'360px',height:'360px',background:'radial-gradient(circle,rgba(22,163,74,0.05) 0%,transparent 65%)',borderRadius:'50%',pointerEvents:'none'}}/>

      {/* Floating card decoration */}
      <div className="animate-float" style={{position:'absolute',top:'22%',right:'8%',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'16px',padding:'20px 24px',boxShadow:'0 8px 32px rgba(0,0,0,0.06)',pointerEvents:'none',minWidth:'200px'}}>
        <div style={{fontSize:'10px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'8px',fontFamily:'JetBrains Mono'}}>Currently Building</div>
        <div style={{fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'15px',color:'var(--text)'}}>SocietyLedger</div>
        <div style={{fontSize:'11px',color:'var(--text-muted)',marginTop:'4px'}}>Flutter + Supabase</div>
        <div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'12px'}}>
          <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--green)',display:'inline-block'}}/>
          <span style={{fontSize:'10px',color:'var(--green)',fontFamily:'JetBrains Mono'}}>MVP shipped</span>
        </div>
      </div>

      <div style={{maxWidth:'760px',position:'relative'}}>
        {/* Badge */}
        <div className="animate-fade-up delay-100" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 14px',border:'1px solid rgba(22,163,74,0.25)',borderRadius:'100px',marginBottom:'36px',background:'var(--green-light)'}}>
          <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--green)',display:'inline-block'}}/>
          <span style={{fontSize:'11px',color:'var(--green)',letterSpacing:'0.06em',fontFamily:'JetBrains Mono'}}>Open to Remote Opportunities</span>
        </div>

        {/* Name */}
        <h1 className="animate-fade-up delay-200" style={{fontSize:'clamp(52px,8vw,96px)',fontWeight:800,lineHeight:0.95,letterSpacing:'-0.04em',marginBottom:'16px'}}>
          Amin
        </h1>
        <h1 className="animate-fade-up delay-300" style={{fontSize:'clamp(52px,8vw,96px)',fontWeight:800,lineHeight:0.95,letterSpacing:'-0.04em',marginBottom:'36px',color:'var(--text-muted)'}}>
          Ganja<span style={{color:'var(--accent)'}}>.</span>
        </h1>

        {/* Typewriter */}
        <div className="animate-fade-up delay-400" style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'28px',padding:'12px 18px',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'10px',width:'fit-content'}}>
          <span style={{color:'var(--accent)',fontFamily:'JetBrains Mono',fontSize:'13px',fontWeight:500}}>$</span>
          <span style={{fontFamily:'JetBrains Mono',fontSize:'13px',color:'var(--text-muted)'}}>{typed}</span>
          <span style={{width:'2px',height:'14px',background:'var(--accent)',display:'inline-block',animation:'blink 1s infinite'}}/>
        </div>

        <p className="animate-fade-up delay-500" style={{fontSize:'16px',lineHeight:1.85,color:'var(--text-muted)',maxWidth:'540px',marginBottom:'44px',fontFamily:'JetBrains Mono',fontWeight:300}}>
          4.5 years crafting mobile apps with Flutter. I build products end-to-end —
          from DB schema to pixel-perfect UI — solo, fast, AI-augmented.
          Based in <span style={{color:'var(--text)',fontWeight:500}}>Ahmedabad, India</span>.
        </p>

        <div className="animate-fade-up delay-600" style={{display:'flex',gap:'14px',flexWrap:'wrap',marginBottom:'60px'}}>
          <a href="#projects" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'14px 28px',background:'var(--accent)',color:'#fff',textDecoration:'none',borderRadius:'10px',fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'14px',transition:'all 0.2s',boxShadow:'0 4px 16px rgba(37,99,235,0.25)'}}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--accent2)';e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(37,99,235,0.3)';}}
            onMouseLeave={e=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 16px rgba(37,99,235,0.25)';}}>
            View Projects <ArrowUpRight size={15}/>
          </a>
          <a href="#contact" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'14px 28px',border:'1.5px solid var(--border2)',color:'var(--text-muted)',textDecoration:'none',borderRadius:'10px',fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'14px',transition:'all 0.2s',background:'var(--surface)'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border2)';e.currentTarget.style.color='var(--text-muted)';}}>
            Get In Touch
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up delay-600" style={{display:'flex',gap:'0',borderTop:'1px solid var(--border)',paddingTop:'36px',flexWrap:'wrap'}}>
          {[{label:'Experience',value:'4.5 Years'},{label:'Projects',value:'10+'},{label:'Stack',value:'Flutter + Supabase'},{label:'Mode',value:'Remote Only'}].map((m,i)=>(
            <div key={m.label} style={{paddingRight:'36px',paddingLeft:i>0?'36px':'0',borderLeft:i>0?'1px solid var(--border)':'none'}}>
              <div style={{fontSize:'10px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'5px',fontFamily:'JetBrains Mono'}}>{m.label}</div>
              <div style={{fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'15px',color:'var(--text)'}}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeBanner() {
  const doubled=[...MARQUEE,...MARQUEE];
  return(
    <div style={{borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',padding:'14px 0',overflow:'hidden',background:'var(--bg2)'}}>
      <div className="animate-marquee" style={{display:'flex',whiteSpace:'nowrap',width:'max-content'}}>
        {doubled.map((s,i)=>(
          <span key={i} style={{padding:'0 20px',fontSize:'11px',color:i%7===0?'var(--accent)':'var(--text-dim)',letterSpacing:'0.1em',textTransform:'uppercase',borderRight:'1px solid var(--border)',fontFamily:'JetBrains Mono'}}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return(
    <section id="skills" style={{padding:'100px 48px',background:'var(--surface)'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'64px',flexWrap:'wrap',gap:'24px'}}>
          <div>
            <div className="section-label">Tech Stack</div>
            <h2 style={{fontSize:'clamp(32px,4vw,52px)',fontWeight:800,letterSpacing:'-0.03em',lineHeight:1.1}}>
              Skills & <span className="serif" style={{fontStyle:'italic',color:'var(--text-muted)'}}>Expertise</span>
            </h2>
          </div>
          <div style={{padding:'12px 20px',background:'var(--accent-light)',border:'1px solid rgba(37,99,235,0.15)',borderRadius:'10px'}}>
            <div style={{fontSize:'10px',color:'var(--accent)',textTransform:'uppercase',letterSpacing:'0.08em',fontFamily:'JetBrains Mono',marginBottom:'2px'}}>Workflow</div>
            <div style={{fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'13px',color:'var(--accent)'}}>AI-Augmented Development</div>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))',gap:'16px'}}>
          {SKILLS.map(s=>(
            <div key={s.name} className="card" style={{padding:'24px',cursor:'default'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'18px'}}>
                <div>
                  <div style={{fontSize:'24px',marginBottom:'10px'}}>{s.icon}</div>
                  <div style={{fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'16px',color:'var(--text)'}}>{s.name}</div>
                  <div style={{fontSize:'11px',color:'var(--text-dim)',fontFamily:'JetBrains Mono',marginTop:'3px'}}>{s.years}</div>
                </div>
                <div style={{fontFamily:'Bricolage Grotesque',fontSize:'28px',fontWeight:800,color:'var(--accent)',lineHeight:1}}>
                  {s.level}<span style={{fontSize:'14px',color:'var(--text-dim)',fontWeight:400}}>%</span>
                </div>
              </div>
              <div style={{height:'3px',background:'var(--bg2)',borderRadius:'2px',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${s.level}%`,background:'linear-gradient(90deg,var(--accent),#60a5fa)',borderRadius:'2px',transition:'width 1s ease'}}/>
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
    <section id="projects" style={{padding:'100px 48px',background:'var(--bg)'}} className="dot-grid">
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{marginBottom:'64px'}}>
          <div className="section-label">Portfolio</div>
          <h2 style={{fontSize:'clamp(32px,4vw,52px)',fontWeight:800,letterSpacing:'-0.03em',lineHeight:1.1}}>
            Featured <span className="serif" style={{fontStyle:'italic',color:'var(--text-muted)'}}>Projects</span>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:'8px',marginBottom:'40px',flexWrap:'wrap'}}>
          {PROJECTS.map((proj,i)=>(
            <button key={proj.name} onClick={()=>setActive(i)} style={{padding:'10px 22px',borderRadius:'8px',border:`1.5px solid ${active===i?'var(--accent)':'var(--border)'}`,background:active===i?'var(--accent-light)':'var(--surface)',cursor:'pointer',fontFamily:'Bricolage Grotesque',fontWeight:600,fontSize:'14px',color:active===i?'var(--accent)':'var(--text-muted)',transition:'all 0.2s'}}>{proj.name}</button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'start'}}>
          <div className="card" style={{padding:'36px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
              <span style={{fontSize:'11px',letterSpacing:'0.06em',textTransform:'uppercase',padding:'4px 12px',borderRadius:'100px',border:`1px solid ${p.statusColor}40`,color:p.statusColor,background:p.statusBg,fontFamily:'JetBrains Mono'}}>{p.status}</span>
              <span style={{fontSize:'11px',color:'var(--text-dim)',fontFamily:'JetBrains Mono'}}>{p.type}</span>
            </div>
            <h3 style={{fontFamily:'Bricolage Grotesque',fontSize:'34px',fontWeight:800,letterSpacing:'-0.02em',marginBottom:'8px',color:'var(--text)'}}>{p.name}</h3>
            <p style={{fontFamily:'JetBrains Mono',fontSize:'12px',color:'var(--accent)',marginBottom:'18px',fontWeight:500}}>{p.tagline}</p>
            <p style={{fontSize:'13px',lineHeight:1.9,color:'var(--text-muted)',marginBottom:'28px',fontFamily:'JetBrains Mono',fontWeight:300}}>{p.desc}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {p.stack.map(s=><span key={s} className="tag">{s}</span>)}
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div className="card" style={{padding:'28px'}}>
              <div style={{fontSize:'11px',color:'var(--text-dim)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'20px',fontFamily:'JetBrains Mono'}}>Key Features</div>
              <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
                {p.highlights.map((h,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                    <ChevronRight size={14} style={{color:'var(--accent)',marginTop:'3px',flexShrink:0}}/>
                    <span style={{fontSize:'13px',color:'var(--text-muted)',lineHeight:1.6,fontFamily:'JetBrains Mono',fontWeight:300}}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{padding:'24px'}}>
              <div style={{fontSize:'11px',color:'var(--text-dim)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'14px',fontFamily:'JetBrains Mono'}}>Architecture</div>
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
    <section style={{padding:'100px 48px',background:'var(--surface)',borderTop:'1px solid var(--border)'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'72px',alignItems:'center'}}>
        <div>
          <div className="section-label">About Me</div>
          <h2 style={{fontSize:'clamp(28px,3.5vw,44px)',fontWeight:800,letterSpacing:'-0.03em',lineHeight:1.2,marginBottom:'28px'}}>
            Solo builder.<br/>
            <span className="serif" style={{fontStyle:'italic',color:'var(--text-muted)'}}>AI-augmented.</span><br/>
            Full-stack mobile.
          </h2>
          {["I'm a Flutter developer with 4.5 years of experience building production-grade mobile apps. I work independently, owning every layer — from Supabase schema design to BLoC state management to pixel-perfect Flutter UI.",
            "My workflow is AI-Augmented: I use Claude Code as my primary tool, which lets me ship full-stack products solo at a pace that used to require a whole team.",
            "Currently building SocietyLedger while exploring the Flutter + AI frontier — RAG pipelines, on-device ML with TensorFlow Lite, and LLM API integration."
          ].map((t,i)=>(
            <p key={i} style={{fontSize:'13px',lineHeight:1.9,color:'var(--text-muted)',marginBottom:'16px',fontFamily:'JetBrains Mono',fontWeight:300}}>{t}</p>
          ))}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {[
            {icon:<MapPin size={15}/>,label:'Location',value:'Ahmedabad, Gujarat, India'},
            {icon:<Smartphone size={15}/>,label:'Primary Platform',value:'Flutter Mobile (iOS + Android)'},
            {icon:<Database size={15}/>,label:'Backend',value:'Supabase (Postgres + Auth + Storage)'},
            {icon:<Layers size={15}/>,label:'Architecture',value:'Clean Architecture + BLoC'},
            {icon:<Zap size={15}/>,label:'Dev Style',value:'AI-Augmented Development'},
            {icon:<Terminal size={15}/>,label:'Dev Tools',value:'Claude Code, VS Code, Android Studio'},
            {icon:<Box size={15}/>,label:'Availability',value:'Remote Full-Time · Mon–Fri · Day Shift'},
          ].map(item=>(
            <div key={item.label} className="card" style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 18px'}}>
              <span style={{color:'var(--accent)',flexShrink:0,display:'flex'}}>{item.icon}</span>
              <div>
                <div style={{fontSize:'10px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'2px',fontFamily:'JetBrains Mono'}}>{item.label}</div>
                <div style={{fontSize:'13px',color:'var(--text)',fontFamily:'Bricolage Grotesque',fontWeight:600}}>{item.value}</div>
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
    <section id="contact" style={{padding:'100px 48px',background:'var(--bg2)',borderTop:'1px solid var(--border)'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',textAlign:'center'}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
          <div className="section-label">Let's Work Together</div>
        </div>
        <h2 style={{fontSize:'clamp(36px,5vw,60px)',fontWeight:800,letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:'20px'}}>
          Available for<br/><span className="serif" style={{fontStyle:'italic',color:'var(--accent)'}}>Remote Roles</span>
        </h2>
        <p style={{fontSize:'14px',lineHeight:1.9,color:'var(--text-muted)',marginBottom:'44px',fontFamily:'JetBrains Mono',fontWeight:300}}>
          Looking for a senior Flutter developer who owns the full product stack?
          Open to remote, full-time roles · day shift · Mon–Fri.
        </p>
        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="mailto:amin@example.com" style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'15px 34px',background:'var(--accent)',color:'#fff',textDecoration:'none',borderRadius:'10px',fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'14px',transition:'all 0.2s',boxShadow:'0 4px 16px rgba(37,99,235,0.2)'}}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--accent2)';e.currentTarget.style.transform='translateY(-2px)';}}
            onMouseLeave={e=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.transform='translateY(0)';}}>
            <Mail size={16}/> Send Email
          </a>
          <a href="https://linkedin.com/in/amin-ganja" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'15px 34px',border:'1.5px solid var(--border2)',color:'var(--text-muted)',textDecoration:'none',borderRadius:'10px',fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'14px',transition:'all 0.2s',background:'var(--surface)'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border2)';e.currentTarget.style.color='var(--text-muted)';}}>
            <ExternalLink size={16}/> LinkedIn
          </a>
        </div>

        <div style={{marginTop:'72px',paddingTop:'36px',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
          <div style={{fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:'16px',color:'var(--text)'}}>AG<span style={{color:'var(--accent)'}}>.</span></div>
          <div style={{fontSize:'11px',color:'var(--text-dim)',fontFamily:'JetBrains Mono'}}>© 2026 · Built with Next.js + Claude Code</div>
          <div style={{fontSize:'11px',color:'var(--text-dim)',fontFamily:'JetBrains Mono'}}>Ahmedabad, IN</div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return(
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
