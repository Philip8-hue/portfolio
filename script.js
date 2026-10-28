const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const themeButton=document.getElementById('theme-toggle');
function setTheme(light){document.documentElement.classList.toggle('light',light);themeButton.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme');themeButton.setAttribute('aria-pressed',String(light));try{localStorage.setItem('nullsyntax-theme',light?'light':'dark')}catch{}}
try{if(localStorage.getItem('nullsyntax-theme')==='light')setTheme(true)}catch{}
themeButton.addEventListener('click',()=>setTheme(!document.documentElement.classList.contains('light')));
document.getElementById('copy-email').addEventListener('click',async()=>{const status=document.getElementById('copy-status');try{await navigator.clipboard.writeText('ajalaphilip2007@gmail.com');status.textContent='Email address copied'}catch{status.textContent='ajalaphilip2007@gmail.com'}});
document.querySelectorAll('details').forEach(detail=>{detail.addEventListener('toggle',()=>{if(detail.open&&!reduced.matches)detail.querySelector('.detail-body').animate([{opacity:0,transform:'translateY(-7px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'ease-out'})})});
const links=[...document.querySelectorAll('nav a')];
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>{if(link.getAttribute('href')===`#${entry.target.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})}})},{rootMargin:'-10% 0px -60% 0px'});
document.querySelectorAll('#work,#about,#experience,#contact').forEach(section=>observer.observe(section));

// Motion enhances the page; no content is hidden while waiting for script execution.
if(!reduced.matches){
 const ease='cubic-bezier(.22,1,.36,1)';
 const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.prepend(progress);
 let scrollFrame=0;
 function updateProgress(){scrollFrame=0;const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,scrollY/max)):0})`}
 function queueProgress(){if(!scrollFrame)scrollFrame=requestAnimationFrame(updateProgress)}
 addEventListener('scroll',queueProgress,{passive:true});addEventListener('resize',queueProgress);updateProgress();
 const reveal=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.animate([{opacity:.15,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,easing:ease});reveal.unobserve(entry.target)})},{threshold:.12});
 document.querySelectorAll('.project-visual,.compact-project,.toolbox,.contact').forEach(el=>reveal.observe(el));
 const animations=[];
 document.querySelectorAll('.identity-main h1,.identity-main h2,.identity-description,.opening h2,.opening > p:not(.section-label)').forEach((el,index)=>animations.push(el.animate([{opacity:0,transform:'translateY(14px)',filter:'blur(3px)'},{opacity:1,transform:'translateY(0)',filter:'blur(0)'}],{duration:750,delay:index*70,easing:ease,fill:'backwards'})));
 document.querySelectorAll('details').forEach(detail=>{
  const summary=detail.querySelector('summary'),body=detail.querySelector('.detail-body');let active=null;
  summary.addEventListener('click',event=>{
   if(reduced.matches)return;event.preventDefault();if(active){active.cancel();active=null}
   const closing=detail.open;
   if(!closing)detail.open=true;
   const natural=body.getBoundingClientRect().height;
   body.style.overflow='hidden';
   active=body.animate(closing?[{height:`${natural}px`,opacity:1},{height:'0px',opacity:0}]:[{height:'0px',opacity:0},{height:`${natural}px`,opacity:1}],{duration:320,easing:ease});
   active.onfinish=()=>{if(closing)detail.open=false;body.style.removeProperty('overflow');active=null;updateProgress()};
  });
 });
 reduced.addEventListener('change',event=>{if(event.matches){reveal.disconnect();animations.forEach(a=>a.cancel());progress.remove();document.getAnimations().forEach(a=>a.finish())}},{once:true});
}
