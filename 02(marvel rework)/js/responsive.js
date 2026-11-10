document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.topnav');
  const drop = document.querySelector('.dropdown');
  const dropButton = drop?.querySelector('.dropbtn');
  const closeMenu = () => { nav?.classList.remove('is-open'); menu?.setAttribute('aria-expanded', 'false'); if(menu) menu.textContent='메뉴'; };
  const closeDrop = () => { drop?.classList.remove('is-open'); dropButton?.setAttribute('aria-expanded','false'); };
  menu?.addEventListener('click', () => { const open=nav.classList.toggle('is-open'); menu.setAttribute('aria-expanded',String(open)); menu.textContent=open?'닫기':'메뉴'; });
  dropButton?.addEventListener('click', () => { const open=drop.classList.toggle('is-open'); dropButton.setAttribute('aria-expanded',String(open)); });
  document.addEventListener('click', e => { if(drop && !drop.contains(e.target)) closeDrop(); });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if(e.key==='Escape'){ if(drop?.classList.contains('is-open')){closeDrop();dropButton.focus();}else if(nav?.classList.contains('is-open')){closeMenu();menu.focus();} } });
  const wide = matchMedia('(min-width:1001px)'); wide.addEventListener('change', () => { closeMenu(); closeDrop(); });

  const slides = [...document.querySelectorAll('.slideitem')]; let index=0;
  function showSlide(next){ index=(next+slides.length)%slides.length; slides.forEach((s,i)=>s.hidden=i!==index); const status=document.querySelector('.slide-status'); if(status)status.textContent=`${index+1} / ${slides.length}`; }
  document.querySelector('.slide-prev')?.addEventListener('click',()=>showSlide(index-1));
  document.querySelector('.slide-next')?.addEventListener('click',()=>showSlide(index+1));
  const rail=document.querySelector('.swiper-wrapper');
  const scrollComics = dir => rail?.scrollBy({left:dir*rail.clientWidth*.8,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  document.querySelector('.comic-next')?.addEventListener('click',()=>scrollComics(1));
  document.querySelector('.comic-prev')?.addEventListener('click',()=>scrollComics(-1));
  if(rail)rail.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();scrollComics(e.key==='ArrowRight'?1:-1);}});

  let activeModal=null, previousFocus=null;
  const closeModal=()=>{if(!activeModal)return;activeModal.style.display='none';activeModal.querySelector('iframe')?.removeAttribute('src');activeModal=null;document.body.style.overflow='';document.querySelector('header').inert=false;document.querySelector('footer').inert=false;document.querySelectorAll('#wrap>.btn_open').forEach(el=>el.inert=false);previousFocus?.focus();};
  document.querySelectorAll('.btn_open').forEach(link=>link.addEventListener('click', e=>{
    e.preventDefault(); const modal=document.querySelector(link.getAttribute('href')); if(!modal)return;
    previousFocus=link;activeModal=modal;modal.style.display='flex';document.body.style.overflow='hidden';
    document.querySelector('header').inert=true;document.querySelector('footer').inert=true;document.querySelectorAll('#wrap>.btn_open').forEach(el=>el.inert=true);
    const frame=modal.querySelector('iframe');if(frame?.dataset.src)frame.src=frame.dataset.src;
    modal.querySelector('.btn_close')?.focus();
  }));
  document.querySelectorAll('.pop_wrap').forEach(modal=>{
    modal.querySelector('.btn_close')?.addEventListener('click',closeModal);
    modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
    modal.addEventListener('keydown',e=>{
      if(e.key==='Escape'){e.preventDefault();closeModal();}
      if(e.key==='Tab'){const nodes=[...modal.querySelectorAll('iframe,button,[href],[tabindex="0"]')];const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
    });
  });
});
