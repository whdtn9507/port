/* No wheel/touch interception, scroll snapping, jQuery or Slick runtime. */
document.addEventListener('DOMContentLoaded',()=>{
 const header=document.querySelector('.header'),menu=document.querySelector('.menuBtn'),nav=header?.querySelector('nav');
 const closeMenu=()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='메뉴'};
 const updateHeader=()=>header?.classList.toggle('solid',scrollY>32||document.body.classList.contains('sub-page'));
 updateHeader();addEventListener('scroll',updateHeader,{passive:true});
 menu?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menu.setAttribute('aria-expanded',String(!!open));menu.textContent=open?'닫기':'메뉴'});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('click',e=>{if(header&&!header.contains(e.target))closeMenu()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){closeMenu();menu?.focus()}});
 matchMedia('(min-width:1001px)').addEventListener('change',closeMenu);
 const slides=[...document.querySelectorAll('.zSlide')],status=document.querySelector('.slideStatus');let current=0;
 const show=()=>{slides.forEach((s,i)=>{s.hidden=i!==current;s.setAttribute('aria-label',`${i+1} / ${slides.length}`)});if(status)status.textContent=`${current+1} / ${slides.length}`};
 if(slides.length){show();document.querySelector('.slidePrev')?.addEventListener('click',()=>{current=(current+slides.length-1)%slides.length;show()});document.querySelector('.slideNext')?.addEventListener('click',()=>{current=(current+1)%slides.length;show()})}
 const tabs=[...document.querySelectorAll('.tabList button')];
 const selectTab=index=>tabs.forEach((t,i)=>{const on=i===index;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;const panel=document.getElementById(t.getAttribute('aria-controls'));if(panel)panel.hidden=!on});
 tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectTab(i));t.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();selectTab(n);tabs[n].focus()})});if(tabs.length)selectTab(0);
 let opener=null;
 document.querySelectorAll('[data-modal]').forEach(button=>button.addEventListener('click',()=>{const d=document.getElementById(button.dataset.modal);if(d){opener=button;d.showModal()}}));
 document.querySelectorAll('dialog').forEach(d=>{d.querySelectorAll('.close,.btn_close').forEach(b=>b.addEventListener('click',()=>d.close()));d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}});d.addEventListener('close',()=>opener?.focus())});
});
