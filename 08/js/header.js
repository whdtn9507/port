const header=document.querySelector('.header'),button=document.querySelector('.menuBtn'),nav=document.querySelector('.header nav');
const setHeader=()=>header?.classList.toggle('solid',scrollY>32);setHeader();addEventListener('scroll',setHeader,{passive:true});
button?.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',open);button.textContent=open?'닫기':'메뉴'});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');button?.setAttribute('aria-expanded','false');if(button)button.textContent='메뉴'}));
document.querySelectorAll('[data-modal]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.modal)?.showModal()));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close')?.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()})});
