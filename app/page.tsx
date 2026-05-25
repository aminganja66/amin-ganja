'use client';
import { useEffect, useRef, useState } from 'react';
import { Smartphone, Database, Layers, Zap, Terminal, Box, Mail, ExternalLink, ArrowUpRight, ChevronRight, MapPin } from 'lucide-react';

/* ── DATA ──────────────────────────────────────── */
const SKILLS = [
  { name:'Flutter', level:95, icon:'🐦', years:'4.5 yrs', color:'#0284c7' },
  { name:'Dart', level:95, icon:'🎯', years:'4.5 yrs', color:'#2563eb' },
  { name:'BLoC / Clean Arch', level:90, icon:'🧱', years:'3 yrs', color:'#7c3aed' },
  { name:'Supabase', level:85, icon:'⚡', years:'2 yrs', color:'#059669' },
  { name:'GoRouter', level:85, icon:'🛣️', years:'2 yrs', color:'#d97706' },
  { name:'GetIt / DI', level:88, icon:'💉', years:'3 yrs', color:'#dc2626' },
  { name:'dartz / FP', level:80, icon:'🔷', years:'2 yrs', color:'#6366f1' },
  { name:'Next.js', level:60, icon:'▲', years:'1 yr', color:'#374151' },
  { name:'Python / FastAPI', level:55, icon:'🐍', years:'learning', color:'#16a34a' },
];

const PROJECTS = [
  {
    name:'SocietyLedger', tagline:'Society management & maintenance ledger',
    desc:'Full-stack mobile app for residential societies — maintenance dues, expenses, member payments, reporting. Roles: Super Admin, Society Admin, Member.',
    stack:['Flutter','Supabase','BLoC','Clean Architecture','GoRouter','GetIt','dartz'],
    status:'MVP', statusColor:'#16a34a', statusBg:'#f0fdf4',
    highlights:['Phone OTP auth via Twilio','Multi-role RBAC','PDF receipt generation','Payment proof uploads','Expense tracking with proof'],
    type:'Mobile App + Landing Page', grad:'linear-gradient(135deg,#667eea,#764ba2)',
  },
  {
    name:'IntelliDoc', tagline:'RAG-powered document intelligence',
    desc:'AI app to query your own documents using retrieval-augmented generation. Claude API + Supabase pgvector + FastAPI backend.',
    stack:['Flutter','Python','FastAPI','Claude API','Supabase pgvector','RAG'],
    status:'In Progress', statusColor:'#ea580c', statusBg:'#fff7ed',
    highlights:['Claude API integration','Vector similarity search','Document chunking pipeline','Conversational UI'],
    type:'AI Mobile App', grad:'linear-gradient(135deg,#f093fb,#f5576c)',
  },
  {
    name:'FieldLens', tagline:'Hybrid on-device / cloud visual inspection',
    desc:'Visual inspection with TensorFlow Lite on-device inference + cloud fallback. Offline-capable AI for field workers.',
    stack:['Flutter','TensorFlow Lite','FastAPI','Railway','Docker'],
    status:'Planned', statusColor:'#2563eb', statusBg:'#eff6ff',
    highlights:['On-device ML inference','Offline-first design','Cloud fallback pipeline','Edge deployment'],
    type:'AI + Mobile', grad:'linear-gradient(135deg,#4facfe,#00f2fe)',
  },
];

const MARQUEE = ['Flutter','Dart','Supabase','BLoC','Clean Architecture','GoRouter','GetIt','dartz','TensorFlow Lite','Claude API','FastAPI','Python','Next.js','Docker','Railway','Postgres','pgvector','RAG','REST','Twilio'];
const NAV = ['About','Skills','Projects','Contact'];

/* ── CURSOR ────────────────────────────────────── */
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

/* ── NAV ───────────────────────────────────────── */
function Nav() {
  const [sc,setSc]=useState(false);
  useEffect(()=>{const fn=()=>setSc(window.scrollY>60);window.addEventListener('scroll',fn);return()=>window.removeEventListener('scroll',fn);},[]);
  return(
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',height:'64px',padding:'0 48px',background:sc?'rgba(248,246,241,0.9)':'transparent',backdropFilter:sc?'blur(20px)':'none',borderBottom:sc?'1px solid var(--border)':'1px solid transparent',transition:'all 0.4s ease'}}>
      <div style={{fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:'20px',letterSpacing:'-0.03em'}}>
        <span className="grad-text">AG</span><span style={{color:'var(--text-dim)'}}>.</span>
      </div>
      <div className="nav-links" style={{display:'flex',gap:'32px'}}>
        {NAV.map(n=>(
          <a key={n} href={`#${n.toLowerCase()}`} style={{fontSize:'11px',letterSpacing:'0.08em',color:'var(--text-muted)',textDecoration:'none',textTransform:'uppercase',transition:'color 0.2s',fontFamily:'JetBrains Mono'}}
            onMouseEnter={e=>(e.currentTarget.style.color='var(--grad1)')}
            onMouseLeave={e=>(e.currentTarget.style.color='var(--text-muted)')}>{n}</a>
        ))}
      </div>
      <a href="#contact" className="animate-grad nav-hire" style={{fontSize:'12px',padding:'8px 22px',borderRadius:'100px',fontFamily:'Bricolage Grotesque',fontWeight:700,textDecoration:'none',color:'#fff',background:'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)',backgroundSize:'200% 200%',transition:'all 0.3s',boxShadow:'0 4px 15px rgba(99,102,241,0.3)'}}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='0 8px 25px rgba(99,102,241,0.4)';}}
      onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 15px rgba(99,102,241,0.3)';}}>Hire Me</a>
    </nav>
  );
}

/* ── HERO ──────────────────────────────────────── */
function Hero() {
  const [typed,setTyped]=useState('');
  const [scrollY,setScrollY]=useState(0);
  const heroRef=useRef<HTMLElement>(null);
  const full='Flutter Developer & AI-Augmented Builder';

  useEffect(()=>{
    let i=0;
    const t=setInterval(()=>{setTyped(full.slice(0,++i));if(i>=full.length)clearInterval(t);},42);
    return()=>clearInterval(t);
  },[]);

  // Parallax
  useEffect(()=>{
    const fn=()=>setScrollY(window.scrollY);
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[]);

  return(
    <section ref={heroRef} id="about" style={{minHeight:'100vh',width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:'100px 48px 60px',position:'relative',overflow:'hidden',background:'var(--bg)'}} className="hero-pad">

      {/* Parallax gradient blobs */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}>
        <div className="animate-blob" style={{position:'absolute',top:`calc(5% + ${scrollY*0.08}px)`,right:'-5%',width:'55vw',height:'55vw',maxWidth:'700px',maxHeight:'700px',background:'linear-gradient(135deg,rgba(99,102,241,0.18),rgba(139,92,246,0.12),rgba(236,72,153,0.08))',filter:'blur(60px)',transform:`translateY(${scrollY*0.08}px)`}}/>
        <div className="animate-blob-delay" style={{position:'absolute',bottom:`calc(-10% - ${scrollY*0.05}px)`,left:'-8%',width:'50vw',height:'50vw',maxWidth:'600px',maxHeight:'600px',background:'linear-gradient(135deg,rgba(245,158,11,0.1),rgba(236,72,153,0.08),rgba(99,102,241,0.06))',filter:'blur(70px)',transform:`translateY(${-scrollY*0.05}px)`}}/>
        <div style={{position:'absolute',top:'40%',left:'30%',width:'30vw',height:'30vw',maxWidth:'400px',maxHeight:'400px',background:'radial-gradient(circle,rgba(139,92,246,0.08),transparent 60%)',filter:'blur(40px)',transform:`translateY(${scrollY*0.03}px)`}}/>
      </div>

      {/* Spinning ring parallax */}
      <div style={{position:'absolute',top:'8%',right:'6%',width:'clamp(120px,18vw,260px)',height:'clamp(120px,18vw,260px)',border:'1px dashed rgba(99,102,241,0.2)',borderRadius:'50%',pointerEvents:'none',transform:`translateY(${scrollY*0.12}px) rotate(${scrollY*0.05}deg)`}}/>
      <div style={{position:'absolute',top:'12%',right:'9%',width:'clamp(80px,12vw,180px)',height:'clamp(80px,12vw,180px)',border:'1px solid rgba(236,72,153,0.15)',borderRadius:'50%',pointerEvents:'none',transform:`translateY(${scrollY*0.18}px) rotate(${-scrollY*0.08}deg)`}}/>

      {/* Floating card */}
      <div className="animate-float float-card" style={{position:'absolute',top:'18%',right:'6%',background:'rgba(255,255,255,0.85)',backdropFilter:'blur(20px)',border:'1px solid rgba(99,102,241,0.2)',borderRadius:'20px',padding:'20px 24px',boxShadow:'0 16px 48px rgba(99,102,241,0.1)',pointerEvents:'none',minWidth:'200px',transform:`translateY(calc(-10px + ${scrollY*-0.06}px))`}}>
        <div style={{fontSize:'10px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'8px',fontFamily:'JetBrains Mono'}}>Currently Building</div>
        <div style={{fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:'16px',marginBottom:'4px'}} className="grad-text">SocietyLedger</div>
        <div style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'JetBrains Mono'}}>Flutter + Supabase</div>
        <div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'12px',paddingTop:'12px',borderTop:'1px solid rgba(99,102,241,0.1)'}}>
          <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#16a34a',display:'inline-block'}}/>
          <span style={{fontSize:'10px',color:'#16a34a',fontFamily:'JetBrains Mono'}}>MVP shipped</span>
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth:'820px',position:'relative',zIndex:1,width:'100%'}}>
        {/* Badge */}
        <div className="animate-fade-up delay-100" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'7px 16px',borderRadius:'100px',marginBottom:'36px',background:'rgba(22,163,74,0.08)',border:'1px solid rgba(22,163,74,0.2)'}}>
          <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'var(--green)',display:'inline-block',boxShadow:'0 0 0 3px rgba(22,163,74,0.2)'}}/>
          <span style={{fontSize:'12px',color:'var(--green)',letterSpacing:'0.04em',fontFamily:'JetBrains Mono',fontWeight:500}}>Open to Remote Opportunities</span>
        </div>

        <h1 className="animate-fade-up delay-200 big" style={{fontSize:'clamp(52px,9vw,104px)',fontWeight:800,lineHeight:0.92,letterSpacing:'-0.04em',marginBottom:'12px'}}>
          Amin
        </h1>
        <h1 className="animate-fade-up delay-300 big grad-text" style={{fontSize:'clamp(52px,9vw,104px)',fontWeight:800,lineHeight:0.92,letterSpacing:'-0.04em',marginBottom:'40px',display:'block'}}>
          Ganja.
        </h1>

        {/* Terminal */}
        <div className="animate-fade-up delay-400" style={{display:'inline-flex',alignItems:'center',gap:'10px',marginBottom:'28px',padding:'12px 20px',background:'rgba(255,255,255,0.7)',backdropFilter:'blur(12px)',border:'1px solid var(--border)',borderRadius:'12px',maxWidth:'100%',overflow:'hidden'}}>
          <div style={{display:'flex',gap:'5px',flexShrink:0}}>
            <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#ff5f57'}}/>
            <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#febc2e'}}/>
            <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#28c840'}}/>
          </div>
          <span style={{color:'var(--grad1)',fontFamily:'JetBrains Mono',fontSize:'13px',fontWeight:500,flexShrink:0}}>$</span>
          <span style={{fontFamily:'JetBrains Mono',fontSize:'13px',color:'var(--text-muted)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{typed}</span>
          <span style={{width:'2px',height:'14px',background:'var(--grad1)',display:'inline-block',animation:'blink 1s infinite',flexShrink:0}}/>
        </div>

        <p className="animate-fade-up delay-500" style={{fontSize:'15px',lineHeight:1.9,color:'var(--text-muted)',maxWidth:'520px',marginBottom:'44px',fontFamily:'JetBrains Mono',fontWeight:300}}>
          4.5 years crafting mobile apps with Flutter. I build products end-to-end — DB schema to pixel-perfect UI — solo, fast, AI-powered. Based in{' '}
          <span style={{color:'var(--text)',fontWeight:500}}>Ahmedabad, India</span>.
        </p>

        <div className="animate-fade-up delay-600 hero-btns" style={{display:'flex',gap:'14px',flexWrap:'wrap',marginBottom:'56px'}}>
          <a href="#projects" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'14px 30px',background:'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)',backgroundSize:'200% 200%',color:'#fff',textDecoration:'none',borderRadius:'12px',fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'14px',transition:'all 0.3s',boxShadow:'0 4px 20px rgba(99,102,241,0.3)'}} className="animate-grad"
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 10px 30px rgba(99,102,241,0.4)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 20px rgba(99,102,241,0.3)';}}>
            View Projects <ArrowUpRight size={15}/>
          </a>
          <a href="#contact" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'14px 30px',border:'1.5px solid var(--border2)',color:'var(--text-muted)',textDecoration:'none',borderRadius:'12px',fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'14px',transition:'all 0.2s',background:'rgba(255,255,255,0.7)',backdropFilter:'blur(8px)'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--grad1)';e.currentTarget.style.color='var(--grad1)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border2)';e.currentTarget.style.color='var(--text-muted)';}}>
            Get In Touch
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up delay-700 hero-stats" style={{display:'flex',flexWrap:'wrap',paddingTop:'32px',borderTop:'1px solid var(--border)',gap:'0'}}>
          {[{label:'Experience',value:'4.5 Years'},{label:'Projects',value:'10+'},{label:'Stack',value:'Flutter + Supabase'},{label:'Mode',value:'Remote Only'}].map((m,i)=>(
            <div key={m.label} className={`hero-stat${i>0?' hero-stat':''}`} style={{paddingRight:'32px',paddingLeft:i>0?'32px':'0',borderLeft:i>0?'1px solid var(--border)':'none'}}>
              <div style={{fontSize:'10px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'5px',fontFamily:'JetBrains Mono'}}>{m.label}</div>
              <div style={{fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:'15px'}} className="grad-text-blue">{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── MARQUEE ───────────────────────────────────── */
function MarqueeBanner() {
  const doubled=[...MARQUEE,...MARQUEE];
  return(
    <div style={{borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',padding:'14px 0',overflow:'hidden',background:'linear-gradient(90deg,rgba(99,102,241,0.04),rgba(139,92,246,0.04),rgba(236,72,153,0.04))'}}>
      <div className="animate-marquee" style={{display:'flex',whiteSpace:'nowrap',width:'max-content'}}>
        {doubled.map((s,i)=>(
          <span key={i} style={{padding:'0 22px',fontSize:'11px',color:i%6===0?'var(--grad1)':i%6===2?'var(--grad2)':i%6===4?'var(--grad3)':'var(--text-dim)',letterSpacing:'0.1em',textTransform:'uppercase',borderRight:'1px solid var(--border)',fontFamily:'JetBrains Mono'}}>{s}</span>
        ))}
      </div>
    </div>
  );
}

/* ── SKILLS ────────────────────────────────────── */
function Skills() {
  const [scrollY,setScrollY]=useState(0);
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{
    const fn=()=>{
      if(ref.current){const r=ref.current.getBoundingClientRect();setScrollY(-r.top*0.04);}
    };
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[]);

  return(
    <section ref={ref} id="skills" className="section-pad" style={{padding:'100px 48px',background:'var(--surface)',position:'relative',overflow:'hidden'}}>
      {/* Parallax bg blobs */}
      <div style={{position:'absolute',top:`calc(-10% + ${scrollY}px)`,right:'-10%',width:'50vw',height:'50vw',maxWidth:'500px',background:'linear-gradient(135deg,rgba(99,102,241,0.07),rgba(139,92,246,0.05))',borderRadius:'50%',filter:'blur(50px)',pointerEvents:'none'}}/>

      <div style={{maxWidth:'1100px',margin:'0 auto',position:'relative',zIndex:1}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'60px',flexWrap:'wrap',gap:'24px'}}>
          <div>
            <div className="section-label">Tech Stack</div>
            <h2 style={{fontSize:'clamp(30px,4vw,52px)',fontWeight:800,letterSpacing:'-0.03em',lineHeight:1.1}}>
              Skills &amp; <span className="serif grad-text" style={{fontStyle:'italic'}}>Expertise</span>
            </h2>
          </div>
          <div style={{padding:'14px 22px',background:'linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.06))',border:'1px solid rgba(99,102,241,0.2)',borderRadius:'14px'}}>
            <div style={{fontSize:'10px',background:'linear-gradient(90deg,var(--grad1),var(--grad2))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',textTransform:'uppercase',letterSpacing:'0.08em',fontFamily:'JetBrains Mono',marginBottom:'3px'}}>Workflow</div>
            <div style={{fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:'14px'}} className="grad-text">AI-Augmented Dev</div>
          </div>
        </div>

        <div className="skills-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))',gap:'16px'}}>
          {SKILLS.map(s=>(
            <div key={s.name} className="card-grad" style={{padding:'24px',cursor:'default'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'18px'}}>
                <div>
                  <div style={{fontSize:'26px',marginBottom:'10px'}}>{s.icon}</div>
                  <div style={{fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'16px',color:'var(--text)'}}>{s.name}</div>
                  <div style={{fontSize:'11px',color:'var(--text-dim)',fontFamily:'JetBrains Mono',marginTop:'3px'}}>{s.years}</div>
                </div>
                <div style={{fontFamily:'Bricolage Grotesque',fontSize:'30px',fontWeight:800,lineHeight:1,color:s.color}}>
                  {s.level}<span style={{fontSize:'13px',color:'var(--text-dim)',fontWeight:400}}>%</span>
                </div>
              </div>
              <div style={{height:'4px',background:'rgba(0,0,0,0.06)',borderRadius:'4px',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${s.level}%`,background:`linear-gradient(90deg,${s.color},${s.color}88)`,borderRadius:'4px'}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS ──────────────────────────────────── */
function Projects() {
  const [active,setActive]=useState(0);
  const [scrollY,setScrollY]=useState(0);
  const ref=useRef<HTMLElement>(null);
  const p=PROJECTS[active];

  useEffect(()=>{
    const fn=()=>{if(ref.current){const r=ref.current.getBoundingClientRect();setScrollY(-r.top*0.03);}};
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[]);

  return(
    <section ref={ref} id="projects" className="section-pad" style={{padding:'100px 48px',background:'var(--bg)',position:'relative',overflow:'hidden'}}>
      {/* Parallax bg */}
      <div style={{position:'absolute',bottom:`calc(-20% + ${scrollY}px)`,left:'-5%',width:'55vw',height:'55vw',maxWidth:'600px',background:'linear-gradient(135deg,rgba(245,158,11,0.07),rgba(236,72,153,0.05),rgba(99,102,241,0.04))',borderRadius:'50%',filter:'blur(60px)',pointerEvents:'none'}}/>

      <div style={{maxWidth:'1100px',margin:'0 auto',position:'relative',zIndex:1}}>
        <div style={{marginBottom:'60px'}}>
          <div className="section-label">Portfolio</div>
          <h2 style={{fontSize:'clamp(30px,4vw,52px)',fontWeight:800,letterSpacing:'-0.03em',lineHeight:1.1}}>
            Featured <span className="serif grad-text" style={{fontStyle:'italic'}}>Projects</span>
          </h2>
        </div>

        <div className="proj-tabs" style={{display:'flex',gap:'10px',marginBottom:'36px',flexWrap:'wrap'}}>
          {PROJECTS.map((proj,i)=>(
            <button key={proj.name} onClick={()=>setActive(i)} style={{padding:'10px 22px',borderRadius:'100px',border:'none',cursor:'pointer',fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'13px',transition:'all 0.2s',background:active===i?'transparent':'rgba(0,0,0,0.04)',color:active===i?'#fff':'var(--text-muted)',backgroundImage:active===i?proj.grad:'none',boxShadow:active===i?'0 4px 16px rgba(99,102,241,0.25)':'none',transform:active===i?'translateY(-1px)':'none'}}>{proj.name}</button>
          ))}
        </div>

        <div className="two-col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',alignItems:'start'}}>
          <div className="card-grad" style={{padding:'36px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
              <span style={{fontSize:'11px',letterSpacing:'0.06em',textTransform:'uppercase',padding:'4px 14px',borderRadius:'100px',border:`1px solid ${p.statusColor}40`,color:p.statusColor,background:p.statusBg,fontFamily:'JetBrains Mono'}}>{p.status}</span>
              <span style={{fontSize:'11px',color:'var(--text-dim)',fontFamily:'JetBrains Mono'}}>{p.type}</span>
            </div>
            <div style={{width:'48px',height:'5px',borderRadius:'3px',background:p.grad,marginBottom:'18px'}}/>
            <h3 style={{fontFamily:'Bricolage Grotesque',fontSize:'clamp(26px,3vw,36px)',fontWeight:800,letterSpacing:'-0.02em',marginBottom:'8px',color:'var(--text)'}}>{p.name}</h3>
            <p style={{fontFamily:'JetBrains Mono',fontSize:'12px',color:'var(--text-muted)',marginBottom:'18px',fontWeight:500}}>{p.tagline}</p>
            <p style={{fontSize:'13px',lineHeight:1.9,color:'var(--text-muted)',marginBottom:'28px',fontFamily:'JetBrains Mono',fontWeight:300}}>{p.desc}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {p.stack.map(s=><span key={s} className="tag">{s}</span>)}
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div className="card-grad" style={{padding:'28px'}}>
              <div style={{fontSize:'11px',color:'var(--text-dim)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'20px',fontFamily:'JetBrains Mono'}}>Key Features</div>
              <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
                {p.highlights.map((h,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                    <ChevronRight size={14} style={{color:'var(--grad1)',marginTop:'3px',flexShrink:0}}/>
                    <span style={{fontSize:'13px',color:'var(--text-muted)',lineHeight:1.7,fontFamily:'JetBrains Mono',fontWeight:300}}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-grad" style={{padding:'24px'}}>
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

/* ── ABOUT ─────────────────────────────────────── */
function About() {
  const [scrollY,setScrollY]=useState(0);
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{
    const fn=()=>{if(ref.current){const r=ref.current.getBoundingClientRect();setScrollY(-r.top*0.04);}};
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[]);

  return(
    <section ref={ref} className="section-pad" style={{padding:'100px 48px',background:'var(--surface)',borderTop:'1px solid var(--border)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:`calc(10% + ${scrollY}px)`,right:'-8%',width:'45vw',height:'45vw',maxWidth:'500px',background:'linear-gradient(135deg,rgba(99,102,241,0.06),rgba(236,72,153,0.04))',borderRadius:'50%',filter:'blur(50px)',pointerEvents:'none'}}/>
      <div style={{maxWidth:'1100px',margin:'0 auto',position:'relative',zIndex:1}}>
        <div className="two-col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'72px',alignItems:'center'}}>
          <div>
            <div className="section-label">About Me</div>
            <h2 style={{fontSize:'clamp(26px,3.5vw,44px)',fontWeight:800,letterSpacing:'-0.03em',lineHeight:1.2,marginBottom:'28px'}}>
              Solo builder.<br/>
              <span className="serif grad-text" style={{fontStyle:'italic'}}>AI-augmented.</span><br/>
              Full-stack mobile.
            </h2>
            {["I'm a Flutter developer with 4.5 years of experience building production-grade mobile apps. I work independently, owning every layer — from Supabase schema design to BLoC state management to pixel-perfect Flutter UI.",
              "My workflow is AI-Augmented: I use Claude Code as my primary tool, which lets me ship full-stack products solo at a pace that used to require a whole team.",
              "Currently building SocietyLedger while exploring Flutter + AI — RAG pipelines, on-device ML with TensorFlow Lite, and LLM API integration."
            ].map((t,i)=>(
              <p key={i} style={{fontSize:'13px',lineHeight:1.9,color:'var(--text-muted)',marginBottom:'16px',fontFamily:'JetBrains Mono',fontWeight:300}}>{t}</p>
            ))}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {[
              {icon:<MapPin size={15}/>,label:'Location',value:'Ahmedabad, Gujarat, India'},
              {icon:<Smartphone size={15}/>,label:'Platform',value:'Flutter Mobile (iOS + Android)'},
              {icon:<Database size={15}/>,label:'Backend',value:'Supabase — Postgres + Auth + Storage'},
              {icon:<Layers size={15}/>,label:'Architecture',value:'Clean Architecture + BLoC'},
              {icon:<Zap size={15}/>,label:'Dev Style',value:'AI-Augmented Development'},
              {icon:<Terminal size={15}/>,label:'Tools',value:'Claude Code · VS Code · Android Studio'},
              {icon:<Box size={15}/>,label:'Availability',value:'Remote Full-Time · Mon–Fri · Day Shift'},
            ].map((item,i)=>(
              <div key={i} className="card-grad" style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 18px'}}>
                <span style={{background:'linear-gradient(135deg,var(--grad1),var(--grad2))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',flexShrink:0,display:'flex'}}>{item.icon}</span>
                <div>
                  <div style={{fontSize:'10px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'2px',fontFamily:'JetBrains Mono'}}>{item.label}</div>
                  <div style={{fontSize:'13px',color:'var(--text)',fontFamily:'Bricolage Grotesque',fontWeight:700}}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ───────────────────────────────────── */
function Contact() {
  const [scrollY,setScrollY]=useState(0);
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{
    const fn=()=>{if(ref.current){const r=ref.current.getBoundingClientRect();setScrollY(-r.top*0.05);}};
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[]);

  return(
    <section ref={ref} id="contact" className="section-pad" style={{padding:'100px 48px',position:'relative',overflow:'hidden',background:'var(--bg)'}}>
      {/* Big gradient circle */}
      <div style={{position:'absolute',top:`calc(-30% + ${scrollY}px)`,left:'50%',transform:'translateX(-50%)',width:'80vw',height:'80vw',maxWidth:'900px',maxHeight:'900px',background:'linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.07),rgba(236,72,153,0.05),rgba(245,158,11,0.04))',borderRadius:'50%',filter:'blur(80px)',pointerEvents:'none'}}/>

      <div style={{maxWidth:'700px',margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
          <div className="section-label">Let's Work Together</div>
        </div>
        <h2 style={{fontSize:'clamp(34px,5vw,64px)',fontWeight:800,letterSpacing:'-0.03em',lineHeight:1.05,marginBottom:'20px'}}>
          Available for<br/><span className="serif grad-text" style={{fontStyle:'italic'}}>Remote Roles</span>
        </h2>
        <p style={{fontSize:'14px',lineHeight:1.9,color:'var(--text-muted)',marginBottom:'44px',fontFamily:'JetBrains Mono',fontWeight:300}}>
          Looking for a senior Flutter developer who owns the full product stack?<br/>
          Remote · full-time · day shift · Mon–Fri.
        </p>

        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="mailto:amin@example.com" style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'15px 34px',background:'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)',backgroundSize:'200% 200%',color:'#fff',textDecoration:'none',borderRadius:'12px',fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'14px',transition:'all 0.3s',boxShadow:'0 4px 20px rgba(99,102,241,0.3)'}} className="animate-grad"
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 10px 32px rgba(99,102,241,0.4)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 20px rgba(99,102,241,0.3)';}}>
            <Mail size={16}/> Send Email
          </a>
          <a href="https://linkedin.com/in/amin-ganja" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'15px 34px',border:'1.5px solid var(--border2)',color:'var(--text-muted)',textDecoration:'none',borderRadius:'12px',fontFamily:'Bricolage Grotesque',fontWeight:700,fontSize:'14px',transition:'all 0.2s',background:'rgba(255,255,255,0.7)',backdropFilter:'blur(8px)'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--grad1)';e.currentTarget.style.color='var(--grad1)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border2)';e.currentTarget.style.color='var(--text-muted)';}}>
            <ExternalLink size={16}/> LinkedIn
          </a>
        </div>

        <div style={{marginTop:'72px',paddingTop:'36px',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
          <div style={{fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:'18px'}} className="grad-text">AG.</div>
          <div style={{fontSize:'11px',color:'var(--text-dim)',fontFamily:'JetBrains Mono'}}>© 2026 · Next.js + Claude Code</div>
          <div style={{fontSize:'11px',color:'var(--text-dim)',fontFamily:'JetBrains Mono'}}>Ahmedabad, IN</div>
        </div>
      </div>
    </section>
  );
}

/* ── PAGE ──────────────────────────────────────── */
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
