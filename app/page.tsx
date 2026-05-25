'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Smartphone, Database, Layers, Zap, Terminal, Box, Mail, ExternalLink, ArrowUpRight, ChevronRight, MapPin, Sun, Moon } from 'lucide-react';

/* ── DATA ─────────────────────────────── */
const SKILLS = [
  { name:'Flutter',          level:95, icon:'🐦', years:'4.5 yrs', color:'#0ea5e9' },
  { name:'Dart',             level:95, icon:'🎯', years:'4.5 yrs', color:'#6366f1' },
  { name:'BLoC / Clean Arch',level:90, icon:'🧱', years:'3 yrs',   color:'#8b5cf6' },
  { name:'Supabase',         level:85, icon:'⚡', years:'2 yrs',   color:'#10b981' },
  { name:'GoRouter',         level:85, icon:'🛣️', years:'2 yrs',   color:'#f59e0b' },
  { name:'GetIt / DI',       level:88, icon:'💉', years:'3 yrs',   color:'#ef4444' },
  { name:'dartz / FP',       level:80, icon:'🔷', years:'2 yrs',   color:'#6366f1' },
  { name:'Next.js',          level:60, icon:'▲',  years:'1 yr',    color:'#374151' },
  { name:'Python / FastAPI', level:55, icon:'🐍', years:'learning',color:'#22c55e' },
];
const PROJECTS = [
  { name:'SocietyLedger', tagline:'Society management & maintenance ledger',
    desc:'Full-stack mobile app for residential societies — dues, expenses, member payments, reporting. Three roles: Super Admin, Society Admin, Member.',
    stack:['Flutter','Supabase','BLoC','Clean Architecture','GoRouter','GetIt','dartz'],
    status:'MVP',statusColor:'#16a34a',statusBg:'rgba(22,163,74,0.1)',
    highlights:['Phone OTP auth via Twilio','Multi-role RBAC','PDF receipt generation','Payment proof uploads','Expense tracking with proof'],
    type:'Mobile App + Landing Page',num:'01',
    grad:'linear-gradient(135deg,#667eea,#764ba2)',
  },
  { name:'IntelliDoc', tagline:'RAG-powered document intelligence',
    desc:'AI app to query your own documents via retrieval-augmented generation. Claude API + Supabase pgvector + FastAPI.',
    stack:['Flutter','Python','FastAPI','Claude API','Supabase pgvector','RAG'],
    status:'In Progress',statusColor:'#ea580c',statusBg:'rgba(234,88,12,0.1)',
    highlights:['Claude API integration','Vector similarity search','Document chunking pipeline','Conversational UI'],
    type:'AI Mobile App',num:'02',
    grad:'linear-gradient(135deg,#f093fb,#f5576c)',
  },
  { name:'FieldLens', tagline:'On-device / cloud visual inspection',
    desc:'TensorFlow Lite on-device inference + cloud fallback. Offline-capable AI for field workers.',
    stack:['Flutter','TensorFlow Lite','FastAPI','Railway','Docker'],
    status:'Planned',statusColor:'#2563eb',statusBg:'rgba(37,99,235,0.1)',
    highlights:['On-device ML inference','Offline-first design','Cloud fallback pipeline','Edge deployment'],
    type:'AI + Mobile',num:'03',
    grad:'linear-gradient(135deg,#4facfe,#00f2fe)',
  },
];
const MARQUEE_ITEMS = ['Flutter','Dart','Supabase','BLoC','Clean Architecture','GoRouter','GetIt','dartz','TensorFlow Lite','Claude API','FastAPI','Python','Next.js','Docker','Railway','Postgres','pgvector','RAG','REST','Twilio'];
const NAV_LINKS = [
  {label:'About',href:'#about'},
  {label:'Skills',href:'#skills'},
  {label:'Projects',href:'#projects'},
  {label:'Contact',href:'#contact'},
];

/* ── THEME HOOK ───────────────────────── */
function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    setDark(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);
  const toggle = useCallback(() => {
    setDark(d => {
      const next = !d;
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);
  return { dark, toggle };
}

/* ── TOGGLE SWITCH ────────────────────── */
function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button onClick={toggle} aria-label="Toggle theme" style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'8px'}}>
      <Sun size={13} style={{color: dark ? 'var(--text-dim)' : 'var(--gold)',transition:'color .3s'}}/>
      <div className={`toggle-track${dark ? ' on' : ''}`}>
        <div className="toggle-knob">
          {dark ? <Moon size={11} color="#fff"/> : <Sun size={11} color="var(--gold)"/>}
        </div>
      </div>
      <Moon size={13} style={{color: dark ? 'var(--g1)' : 'var(--text-dim)',transition:'color .3s'}}/>
    </button>
  );
}

/* ── CURSOR ───────────────────────────── */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let mx=0,my=0,rx=0,ry=0;
    const mv=(e:MouseEvent)=>{mx=e.clientX;my=e.clientY;};
    window.addEventListener('mousemove',mv);
    let raf:number;
    const loop=()=>{
      rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;
      if(dot.current) dot.current.style.transform=`translate(${mx-5}px,${my-5}px)`;
      if(ring.current) ring.current.style.transform=`translate(${rx-17}px,${ry-17}px)`;
      raf=requestAnimationFrame(loop);
    };
    raf=requestAnimationFrame(loop);
    return()=>{window.removeEventListener('mousemove',mv);cancelAnimationFrame(raf);};
  },[]);
  return(<><div ref={dot} className="cursor"/><div ref={ring} className="cursor-ring"/></>);
}

/* ── NAV ──────────────────────────────── */
function Nav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [sc,setSc]=useState(false);
  useEffect(()=>{const fn=()=>setSc(window.scrollY>60);window.addEventListener('scroll',fn);return()=>window.removeEventListener('scroll',fn);},[]);
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,background:sc?'var(--nav-bg)':'transparent',backdropFilter:sc?'blur(20px)':'none',borderBottom:sc?'1px solid var(--border)':'1px solid transparent',transition:'all .4s ease'}}>
      <div className="nav-inner" style={{maxWidth:'1200px',margin:'0 auto',padding:'0 48px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        {/* Logo */}
        <div style={{fontFamily:'Cormorant Garamond',fontWeight:700,fontSize:'22px',letterSpacing:'-0.02em'}}>
          <span className="gold-text">AG</span><span style={{color:'var(--text-dim)'}}>.</span>
        </div>
        {/* Links */}
        <div className="hide-mob" style={{display:'flex',gap:'36px'}}>
          {NAV_LINKS.map(l=>(
            <a key={l.label} href={l.href} style={{fontSize:'12px',letterSpacing:'.1em',textTransform:'uppercase',color:'var(--text-muted)',textDecoration:'none',fontFamily:'JetBrains Mono',transition:'color .2s'}}
              onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>{l.label}</a>
          ))}
        </div>
        {/* Right: toggle + hire */}
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <ThemeToggle dark={dark} toggle={toggle}/>
          <a href="#contact" className="hide-mob" style={{fontSize:'12px',padding:'9px 22px',borderRadius:'100px',fontFamily:'DM Sans',fontWeight:600,textDecoration:'none',color:'#fff',background:'linear-gradient(135deg,var(--gold),var(--gold2))',boxShadow:'0 4px 16px rgba(201,146,42,0.3)',transition:'all .25s'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(201,146,42,0.4)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 16px rgba(201,146,42,0.3)';}}>Hire Me</a>
        </div>
      </div>
    </nav>
  );
}

/* ── TORUS VISUAL ─────────────────────── */
function TorusHero({ scrollY }: { scrollY: number }) {
  return (
    <div className="torus-wrap" style={{transform:`translateY(${scrollY * 0.12}px)`,flexShrink:0}}>
      {/* Glow aura */}
      <div style={{position:'absolute',inset:'-15%',borderRadius:'50%',background:'radial-gradient(ellipse,var(--torus-glow) 0%,transparent 65%)',filter:'blur(30px)',animation:'glowPulse 3.5s ease-in-out infinite'}}/>
      {/* Outer ring */}
      <div className="torus-scene" style={{position:'absolute',inset:'5%'}}>
        <div style={{position:'absolute',inset:0,borderRadius:'50%',border:'clamp(24px,5.5vw,64px) solid transparent',background:'linear-gradient(135deg, var(--torus-outer) 0%, var(--torus-inner) 60%) border-box',WebkitMask:'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',WebkitMaskComposite:'destination-out',maskComposite:'exclude',filter:'drop-shadow(0 0 24px var(--torus-glow))'}}/>
      </div>
      {/* Inner counter-ring */}
      <div style={{position:'absolute',inset:'22%',animation:'torusRotate 9s linear infinite reverse'}}>
        <div style={{position:'absolute',inset:0,borderRadius:'50%',border:'clamp(12px,2.5vw,28px) solid transparent',background:'linear-gradient(225deg, var(--torus-inner) 0%, var(--g4) 100%) border-box',WebkitMask:'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',WebkitMaskComposite:'destination-out',maskComposite:'exclude',opacity:0.75}}/>
      </div>
      {/* Center dot */}
      <div style={{position:'absolute',inset:'46%',borderRadius:'50%',background:'radial-gradient(circle,var(--torus-inner),var(--torus-outer))',boxShadow:'0 0 20px var(--torus-glow)'}}/>
    </div>
  );
}

/* ── HERO ─────────────────────────────── */
function Hero() {
  const [typed,setTyped]=useState('');
  const [scrollY,setScrollY]=useState(0);
  const full = 'Flutter Developer & AI-Augmented Builder';
  useEffect(()=>{let i=0;const t=setInterval(()=>{setTyped(full.slice(0,++i));if(i>=full.length)clearInterval(t);},40);return()=>clearInterval(t);},[]);
  useEffect(()=>{const fn=()=>setScrollY(window.scrollY);window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn);},[]);

  return(
    <section id="about" className="hero-pad" style={{minHeight:'100vh',width:'100%',padding:'100px 48px 60px',display:'flex',alignItems:'center',position:'relative',overflow:'hidden',background:'var(--bg)'}}>
      {/* Parallax blobs */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}>
        <div className="abl" style={{position:'absolute',top:`-5%`,right:'-8%',width:'60vw',height:'60vw',maxWidth:'680px',background:' linear-gradient(135deg,rgba(99,102,241,.1),rgba(139,92,246,.07),rgba(236,72,153,.05))',filter:'blur(70px)',transform:`translateY(${scrollY*.07}px)`}}/>
        <div className="abl2" style={{position:'absolute',bottom:'-15%',left:'-5%',width:'45vw',height:'45vw',maxWidth:'500px',background:'linear-gradient(135deg,rgba(201,146,42,.07),rgba(245,158,11,.05),rgba(236,72,153,.04))',filter:'blur(60px)',transform:`translateY(${-scrollY*.04}px)`}}/>
      </div>

      {/* Floating card */}
      <div className="afloat hide-mob" style={{position:'absolute',bottom:'12%',left:'calc(50% + 40px)',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'16px',padding:'18px 22px',boxShadow:'0 12px 40px rgba(0,0,0,0.08)',pointerEvents:'none',transform:`translateY(${-scrollY*.06}px)`}}>
        <div className="mono" style={{fontSize:'10px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:'8px'}}>Currently Building</div>
        <div style={{fontFamily:'Cormorant Garamond',fontWeight:700,fontSize:'18px',marginBottom:'2px'}} className="gold-text">SocietyLedger</div>
        <div className="mono" style={{fontSize:'11px',color:'var(--text-muted)'}}>Flutter + Supabase</div>
        <div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'10px',paddingTop:'10px',borderTop:'1px solid var(--border)'}}>
          <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--green)',display:'inline-block'}}/>
          <span className="mono" style={{fontSize:'10px',color:'var(--green)'}}>MVP shipped</span>
        </div>
      </div>

      <div className="hero-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'center',maxWidth:'1200px',margin:'0 auto',width:'100%',position:'relative',zIndex:1}}>
        {/* Left: text */}
        <div>
          {/* Badge */}
          <div className="afu d1" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 16px',borderRadius:'100px',marginBottom:'32px',background:'var(--green-bg)',border:'1px solid rgba(22,163,74,0.2)'}}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--green)',display:'inline-block',boxShadow:'0 0 0 3px var(--green-bg)'}}/>
            <span className="mono" style={{fontSize:'11px',color:'var(--green)',letterSpacing:'.04em'}}>Open to Remote Opportunities</span>
          </div>

          {/* Small gold label */}
          <div className="afu d2 gold-label" style={{marginBottom:'12px'}}>Flutter Developer</div>

          {/* Name */}
          <h1 className="afu d3 hero-name" style={{fontSize:'clamp(60px,8.5vw,108px)',fontWeight:700,lineHeight:.88,letterSpacing:'-0.03em',marginBottom:'4px'}}>Amin</h1>
          <h1 className="afu d4 hero-name gold-text" style={{fontSize:'clamp(60px,8.5vw,108px)',fontWeight:700,lineHeight:.88,letterSpacing:'-0.03em',marginBottom:'36px',display:'block'}}>Ganja.</h1>

          {/* Terminal */}
          <div className="afu d5" style={{display:'inline-flex',alignItems:'center',gap:'10px',marginBottom:'24px',padding:'11px 18px',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'10px',maxWidth:'100%',overflow:'hidden'}}>
            <div style={{display:'flex',gap:'4px',flexShrink:0}}>
              <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#ff5f57'}}/>
              <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#febc2e'}}/>
              <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#28c840'}}/>
            </div>
            <span className="mono" style={{color:'var(--gold)',fontSize:'13px',flexShrink:0}}>$</span>
            <span className="mono" style={{fontSize:'12px',color:'var(--text-muted)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{typed}</span>
            <span style={{width:'2px',height:'13px',background:'var(--gold)',display:'inline-block',animation:'blink 1s infinite',flexShrink:0}}/>
          </div>

          <p className="afu d6" style={{fontSize:'14px',lineHeight:1.9,color:'var(--text-muted)',maxWidth:'480px',marginBottom:'40px',fontWeight:300}}>
            4.5 years building mobile experiences with Flutter. Solo, fast, AI-powered.
            Ahmedabad,{' '}<span style={{color:'var(--text)',fontWeight:500}}>India</span>.
          </p>

          <div className="afu d7" style={{display:'flex',gap:'12px',flexWrap:'wrap',marginBottom:'52px'}}>
            <a href="#projects" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'13px 28px',background:'linear-gradient(135deg,var(--gold),var(--gold2))',color:'#fff',textDecoration:'none',borderRadius:'100px',fontWeight:600,fontSize:'14px',transition:'all .25s',boxShadow:'0 4px 18px rgba(201,146,42,0.35)'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 10px 28px rgba(201,146,42,0.45)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 18px rgba(201,146,42,0.35)';}}>
              View Projects <ArrowUpRight size={14}/>
            </a>
            <a href="#contact" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'13px 28px',border:'1.5px solid var(--border2)',color:'var(--text-muted)',textDecoration:'none',borderRadius:'100px',fontWeight:600,fontSize:'14px',transition:'all .25s',background:'var(--surface)'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border2)';e.currentTarget.style.color='var(--text-muted)';}}>
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div className="afu d8 stats-row" style={{display:'flex',gap:'0',paddingTop:'28px',borderTop:'1px solid var(--border)',flexWrap:'wrap'}}>
            {[{l:'Experience',v:'4.5 Years'},{l:'Projects',v:'10+'},{l:'Stack',v:'Flutter'},{l:'Mode',v:'Remote'}].map((m,i)=>(
              <div key={i} className={`stat-item`} style={{paddingRight:'28px',paddingLeft:i>0?'28px':'0',borderLeft:i>0?'1px solid var(--border)':'none'}}>
                <div className="mono" style={{fontSize:'9px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:'4px'}}>{m.l}</div>
                <div className="gold-text" style={{fontFamily:'Cormorant Garamond',fontWeight:700,fontSize:'18px'}}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: torus */}
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <TorusHero scrollY={scrollY}/>
        </div>
      </div>
    </section>
  );
}

/* ── MARQUEE ──────────────────────────── */
function Marquee() {
  const doubled=[...MARQUEE_ITEMS,...MARQUEE_ITEMS];
  return(
    <div className="marquee-wrap">
      <div className="marquee-inner">
        {doubled.map((s,i)=>(
          <span key={i} className="mono" style={{padding:'0 20px',fontSize:'11px',letterSpacing:'.12em',textTransform:'uppercase',borderRight:'1px solid var(--border)',color:i%7===0?'var(--gold)':i%7===3?'var(--g1)':'var(--text-dim)'}}>{s}</span>
        ))}
      </div>
    </div>
  );
}

/* ── SKILLS ───────────────────────────── */
function Skills() {
  const [scrollY,setScrollY]=useState(0);
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{
    const fn=()=>{if(ref.current){const r=ref.current.getBoundingClientRect();setScrollY(-r.top*.04);}};
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[]);

  return(
    <section ref={ref} id="skills" className="sec-pad" style={{padding:'100px 48px',background:'var(--bg2)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:0,right:0,left:0,bottom:0,pointerEvents:'none',overflow:'hidden'}}>
        <div style={{position:'absolute',top:`calc(-20% + ${scrollY}px)`,right:'-10%',width:'50vw',height:'50vw',maxWidth:'500px',background:'radial-gradient(ellipse,rgba(201,146,42,.06),transparent 65%)',filter:'blur(50px)'}}/>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',position:'relative',zIndex:1}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'60px',flexWrap:'wrap',gap:'24px'}}>
          <div>
            <div className="gold-label" style={{marginBottom:'12px'}}>— Tech Stack</div>
            <h2 style={{fontSize:'clamp(32px,4.5vw,56px)',fontWeight:600,letterSpacing:'-0.02em',lineHeight:1.05}}>
              Skills &amp; <em style={{fontStyle:'italic',color:'var(--text-muted)'}}>Expertise</em>
            </h2>
          </div>
          <div style={{padding:'14px 20px',background:'var(--gold-bg)',border:'1px solid rgba(201,146,42,0.2)',borderRadius:'12px'}}>
            <div className="mono" style={{fontSize:'9px',color:'var(--gold)',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:'3px'}}>Workflow</div>
            <div className="gold-text" style={{fontFamily:'Cormorant Garamond',fontWeight:700,fontSize:'16px'}}>AI-Augmented Development</div>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'16px'}}>
          {SKILLS.map(s=>(
            <div key={s.name} className="card" style={{padding:'24px',cursor:'default'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'16px'}}>
                <div>
                  <div style={{fontSize:'26px',marginBottom:'8px'}}>{s.icon}</div>
                  <div style={{fontFamily:'Cormorant Garamond',fontWeight:700,fontSize:'18px',color:'var(--text)'}}>{s.name}</div>
                  <div className="mono" style={{fontSize:'10px',color:'var(--text-dim)',marginTop:'2px'}}>{s.years}</div>
                </div>
                <div style={{fontFamily:'Cormorant Garamond',fontSize:'34px',fontWeight:700,lineHeight:1,color:s.color}}>
                  {s.level}<span style={{fontSize:'14px',color:'var(--text-dim)',fontWeight:400,fontFamily:'DM Sans'}}>%</span>
                </div>
              </div>
              <div style={{height:'3px',background:'var(--border)',borderRadius:'2px',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${s.level}%`,background:`linear-gradient(90deg,${s.color},${s.color}99)`,borderRadius:'2px'}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS ─────────────────────────── */
function Projects() {
  const [active,setActive]=useState(0);
  const p=PROJECTS[active];

  return(
    <section id="projects" className="sec-pad" style={{padding:'100px 48px',background:'var(--bg)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',bottom:'-20%',left:'50%',transform:'translateX(-50%)',width:'80vw',height:'60vw',maxWidth:'900px',background:'radial-gradient(ellipse,rgba(99,102,241,.05),rgba(236,72,153,.04),transparent 65%)',filter:'blur(70px)',pointerEvents:'none'}}/>

      <div style={{maxWidth:'1200px',margin:'0 auto',position:'relative',zIndex:1}}>
        <div style={{marginBottom:'56px'}}>
          <div className="gold-label" style={{marginBottom:'12px'}}>— Portfolio</div>
          <h2 style={{fontSize:'clamp(32px,4.5vw,56px)',fontWeight:600,letterSpacing:'-0.02em',lineHeight:1.05}}>
            Featured <em style={{fontStyle:'italic',color:'var(--text-muted)'}}>Projects</em>
          </h2>
        </div>

        {/* Tabs */}
        <div className="proj-tabs" style={{display:'flex',gap:'10px',marginBottom:'36px',flexWrap:'wrap'}}>
          {PROJECTS.map((proj,i)=>(
            <button key={proj.name} onClick={()=>setActive(i)} style={{padding:'10px 24px',borderRadius:'100px',border:'none',cursor:'pointer',fontFamily:'DM Sans',fontWeight:600,fontSize:'13px',transition:'all .25s',background:active===i?'transparent':'var(--surface)',color:active===i?'#fff':'var(--text-muted)',backgroundImage:active===i?proj.grad:'none',boxShadow:active===i?'0 4px 18px rgba(99,102,241,.25)':'none',transform:active===i?'translateY(-1px)':'none'}}>
              <span className="mono" style={{fontSize:'10px',opacity:.7,marginRight:'6px'}}>{proj.num}</span>{proj.name}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="two-col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',alignItems:'start'}}>
          <div className="card" style={{padding:'36px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'18px',flexWrap:'wrap'}}>
              <span className="mono" style={{fontSize:'11px',padding:'4px 12px',borderRadius:'100px',border:`1px solid ${p.statusColor}55`,color:p.statusColor,background:p.statusBg,letterSpacing:'.06em'}}>{p.status}</span>
              <span className="mono" style={{fontSize:'11px',color:'var(--text-dim)'}}>{p.type}</span>
            </div>
            <div style={{width:'40px',height:'4px',borderRadius:'2px',background:p.grad,marginBottom:'16px'}}/>
            <h3 style={{fontFamily:'Cormorant Garamond',fontSize:'clamp(28px,3vw,40px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:'8px',lineHeight:1.1}}>{p.name}</h3>
            <p className="mono" style={{fontSize:'12px',color:'var(--gold)',marginBottom:'16px'}}>{p.tagline}</p>
            <p style={{fontSize:'14px',lineHeight:1.85,color:'var(--text-muted)',marginBottom:'28px',fontWeight:300}}>{p.desc}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>{p.stack.map(s=><span key={s} className="tag">{s}</span>)}</div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div className="card" style={{padding:'28px'}}>
              <div className="mono" style={{fontSize:'10px',color:'var(--text-dim)',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:'20px'}}>Key Features</div>
              {p.highlights.map((h,i)=>(
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px',marginBottom:'14px'}}>
                  <ChevronRight size={14} style={{color:'var(--gold)',marginTop:'3px',flexShrink:0}}/>
                  <span style={{fontSize:'13px',color:'var(--text-muted)',lineHeight:1.7,fontWeight:300}}>{h}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{padding:'22px'}}>
              <div className="mono" style={{fontSize:'10px',color:'var(--text-dim)',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:'14px'}}>Architecture</div>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                {['BLoC','Clean Arch','Repository Pattern','DI w/ GetIt'].map(a=><span key={a} className="tag" style={{fontSize:'10px'}}>{a}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ────────────────────────────── */
function About() {
  return(
    <section className="sec-pad" style={{padding:'100px 48px',background:'var(--bg2)',borderTop:'1px solid var(--border)'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <div className="two-col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'72px',alignItems:'center'}}>
          <div>
            <div className="gold-label" style={{marginBottom:'12px'}}>— About Me</div>
            <h2 style={{fontSize:'clamp(28px,3.5vw,48px)',fontWeight:600,letterSpacing:'-0.02em',lineHeight:1.15,marginBottom:'28px'}}>
              Solo builder.<br/><em style={{color:'var(--text-muted)'}}>AI-augmented.</em><br/>Full-stack mobile.
            </h2>
            {["I'm a Flutter developer with 4.5 years of experience building production-grade mobile apps, owning every layer — from Supabase schema to BLoC state management to pixel-perfect UI.",
              "My workflow is AI-Augmented: Claude Code is my primary tool, letting me ship full-stack products solo at a pace that used to require a whole team.",
              "Currently building SocietyLedger while exploring Flutter + AI — RAG pipelines, on-device ML with TensorFlow Lite, and LLM API integration."
            ].map((t,i)=><p key={i} style={{fontSize:'14px',lineHeight:1.9,color:'var(--text-muted)',marginBottom:'16px',fontWeight:300}}>{t}</p>)}
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {[
              {icon:<MapPin size={14}/>,label:'Location',value:'Ahmedabad, Gujarat, India'},
              {icon:<Smartphone size={14}/>,label:'Platform',value:'Flutter Mobile (iOS + Android)'},
              {icon:<Database size={14}/>,label:'Backend',value:'Supabase — Postgres + Auth + Storage'},
              {icon:<Layers size={14}/>,label:'Architecture',value:'Clean Architecture + BLoC'},
              {icon:<Zap size={14}/>,label:'Dev Style',value:'AI-Augmented Development'},
              {icon:<Terminal size={14}/>,label:'Tools',value:'Claude Code · VS Code · Android Studio'},
              {icon:<Box size={14}/>,label:'Availability',value:'Remote Full-Time · Mon–Fri · Day Shift'},
            ].map((item,i)=>(
              <div key={i} className="card" style={{display:'flex',alignItems:'center',gap:'14px',padding:'13px 18px'}}>
                <span style={{color:'var(--gold)',flexShrink:0,display:'flex'}}>{item.icon}</span>
                <div>
                  <div className="mono" style={{fontSize:'9px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'2px'}}>{item.label}</div>
                  <div style={{fontSize:'13px',fontWeight:600,color:'var(--text)'}}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ──────────────────────────── */
function Contact() {
  const [scrollY,setScrollY]=useState(0);
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{
    const fn=()=>{if(ref.current){const r=ref.current.getBoundingClientRect();setScrollY(-r.top*.05);}};
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[]);

  return(
    <section ref={ref} id="contact" className="sec-pad" style={{padding:'100px 48px',background:'var(--bg)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:`calc(-20% + ${scrollY}px)`,left:'50%',transform:'translateX(-50%)',width:'70vw',height:'70vw',maxWidth:'800px',background:'radial-gradient(ellipse,rgba(201,146,42,.07),rgba(99,102,241,.05),transparent 65%)',filter:'blur(80px)',pointerEvents:'none'}}/>

      <div style={{maxWidth:'680px',margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
        <div className="gold-label" style={{display:'block',textAlign:'center',marginBottom:'16px'}}>— Let's Work Together</div>
        <h2 style={{fontSize:'clamp(36px,5.5vw,68px)',fontWeight:600,letterSpacing:'-0.03em',lineHeight:1.0,marginBottom:'20px'}}>
          Available for<br/><em className="gold-text" style={{fontStyle:'italic'}}>Remote Roles</em>
        </h2>
        <p style={{fontSize:'14px',lineHeight:1.9,color:'var(--text-muted)',marginBottom:'44px',fontWeight:300}}>
          Looking for a senior Flutter developer who owns the full product stack?<br/>
          Remote · full-time · day shift · Mon–Fri.
        </p>

        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="mailto:amin@example.com" style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'14px 32px',background:'linear-gradient(135deg,var(--gold),var(--gold2))',color:'#fff',textDecoration:'none',borderRadius:'100px',fontWeight:600,fontSize:'14px',transition:'all .25s',boxShadow:'0 4px 18px rgba(201,146,42,0.3)'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 10px 28px rgba(201,146,42,0.45)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 18px rgba(201,146,42,0.3)';}}>
            <Mail size={15}/> Send Email
          </a>
          <a href="https://linkedin.com/in/amin-ganja" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'14px 32px',border:'1.5px solid var(--border2)',color:'var(--text-muted)',textDecoration:'none',borderRadius:'100px',fontWeight:600,fontSize:'14px',transition:'all .25s',background:'var(--surface)'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border2)';e.currentTarget.style.color='var(--text-muted)';}}>
            <ExternalLink size={15}/> LinkedIn
          </a>
        </div>

        <div style={{marginTop:'68px',paddingTop:'32px',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
          <div className="gold-text" style={{fontFamily:'Cormorant Garamond',fontWeight:700,fontSize:'20px'}}>AG.</div>
          <div className="mono" style={{fontSize:'11px',color:'var(--text-dim)'}}>© 2026 · Next.js + Claude Code</div>
          <div className="mono" style={{fontSize:'11px',color:'var(--text-dim)'}}>Ahmedabad, IN</div>
        </div>
      </div>
    </section>
  );
}

/* ── PAGE ─────────────────────────────── */
export default function Home() {
  const { dark, toggle } = useTheme();
  return (
    <>
      <Cursor/>
      <Nav dark={dark} toggle={toggle}/>
      <Hero/>
      <Marquee/>
      <Skills/>
      <Projects/>
      <About/>
      <Contact/>
    </>
  );
}
