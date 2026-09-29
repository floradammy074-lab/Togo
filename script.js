function face(skin,hair,bg,extra){return '<svg viewBox="0 0 44 44" width="100%" height="100%"><rect width="44" height="44" fill="'+bg+'"/><path d="M6 44c2-10 9-13 16-13s14 3 16 13z" fill="#2d3a55"/><circle cx="22" cy="21" r="9" fill="'+skin+'"/><path d="M12.5 20c0-8 5-11 10-11s9 3 9 10c-2-4-5-5-9-5s-7 2-10 6z" fill="'+hair+'"/>'+(extra||'')+'<circle cx="18.5" cy="21" r="1" fill="#222"/><circle cx="25.5" cy="21" r="1" fill="#222"/><path d="M19 25.5q3 2 6 0" stroke="#7a3b2a" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>'}
const glasses='<g fill="none" stroke="#222" stroke-width="1"><circle cx="18.5" cy="21" r="2.6"/><circle cx="25.5" cy="21" r="2.6"/></g>';
const beard='<path d="M14 24q8 12 16 0q-2 8-8 8t-8-8z" fill="#3a2418"/>';
document.getElementById('me').innerHTML=face('#e9b98a','#2b1a10','#f4d35e',glasses);
var nav=document.querySelector('nav'),blob=nav.querySelector('.blob'),items=nav.querySelectorAll('div:not(.fab):not(.sp)');
function place(t){blob.style.width=t.offsetWidth+'px';blob.style.transform='translateX('+t.offsetLeft+'px)'}
items.forEach(function(t){t.addEventListener('click',function(){nav.querySelectorAll('div.active').forEach(function(a){a.classList.remove('active')});void t.offsetWidth;t.classList.add('active');place(t)})});
function sync(){place(nav.querySelector('div.active'))}
sync();window.addEventListener('resize',sync);

/* Transfer flow */
(function(){
var $=function(i){return document.getElementById(i)},bal=56989.30,fmt=function(n){return '$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})};
var ts=$('tscr'),ps=$('pscr'),amt=$('amt'),bank=$('bank'),acn=$('acn'),nm=$('acname'),send=$('send'),err=$('terr'),timers=[];
function setBal(){document.querySelector('.bal').textContent=fmt(bal);$('avail').textContent=fmt(bal)}
function val(){var a=parseFloat(amt.value),ok=a>0&&bank.value&&/^\d{10}$/.test(acn.value)&&nm.value.trim().length>1;
 err.textContent=a>bal?'Insufficient balance for this transfer':'';send.disabled=!(ok&&a<=bal)}
amt.addEventListener('input',function(){amt.value=amt.value.replace(/[^\d.]/g,'').replace(/(\..*)\./g,'$1').replace(/(\.\d\d).+/,'$1');val()});
acn.addEventListener('input',function(){acn.value=acn.value.replace(/\D/g,'');val()});
[bank,nm].forEach(function(e){e.addEventListener('input',val)});
$('tbtn').addEventListener('click',function(){setBal();ts.classList.add('open')});
$('tback').addEventListener('click',function(){ts.classList.remove('open')});

/* helpers for the pending / success screens */
function setMsg(t){var m=$('pmsg');m.classList.add('sw');setTimeout(function(){m.textContent=t;m.classList.remove('sw')},250)}
function countUp(el,to,ms){var t0=null;function f(t){if(t0===null)t0=t;var p=Math.min((t-t0)/ms,1),e=1-Math.pow(1-p,3);el.textContent=fmt(to*e);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}

var msgs=['Securing connection','Verifying account details','Confirming with '+'bank','Finalising transfer'];
send.addEventListener('click',function(){
 var a=parseFloat(amt.value),b=bank.value,name=nm.value.trim(),ac=acn.value;
 $('pamt').textContent=fmt(a);$('pdn').textContent=name;$('pdb').textContent=b;$('pda').textContent='•••• '+ac.slice(-4);
 ps.classList.remove('fin');void ps.offsetWidth;ps.classList.add('open','run');
 msgs[2]='Confirming with '+b;$('pmsg').textContent=msgs[0];
 [1,2,3].forEach(function(i){timers.push(setTimeout(function(){setMsg(msgs[i])},i*2500))});
 timers.push(setTimeout(function(){
  bal-=a;setBal();
  $('damt').textContent=fmt(0);$('dn').textContent=name;$('db').textContent=b;$('da').textContent='•••• '+ac.slice(-4);
  $('dr').textContent='TRX'+Math.floor(1e9+Math.random()*9e9);
  ps.classList.remove('run');ps.classList.add('fin');
  setTimeout(function(){countUp($('damt'),a,900)},1650);
  var t=document.createElement('div');t.className='tx new';
  t.innerHTML='<div class="logo" style="background:#eef0ff"><svg width="20" height="20" viewBox="0 0 24 24" fill="#2b34e6"><path d="M20.5 3.5L4.6 9.6l5.8 3.9z"/><path d="M20.5 3.5l-6.2 15.8-3.9-5.8z" opacity=".6"/></svg></div><div class="m"><b></b><span>Transfer to '+b+'</span></div><div class="r"><b class="rd">-'+fmt(a)+'</b><span>Just now</span></div>';
  t.querySelector('.m b').textContent=name;
  document.querySelector('.sheet .day').after(t);
 },10000));
});
$('dbtn').addEventListener('click',function(){
 ps.classList.remove('open');ts.classList.remove('open');
 setTimeout(function(){ps.classList.remove('fin');amt.value=acn.value=nm.value='';bank.selectedIndex=0;val()},650);
});
setBal();
})();
