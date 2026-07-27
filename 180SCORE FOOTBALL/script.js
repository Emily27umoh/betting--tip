// HAMBURGER / DRAWER 
const hamburgerBtn = document.getElementById('hamburgerBtn');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');

function openDrawer(){
  drawer.classList.add('open');
  drawerOverlay.classList.add('show');
  hamburgerBtn.classList.add('open');
}
function closeDrawer(){
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('show');
  hamburgerBtn.classList.remove('open');
}
hamburgerBtn.addEventListener('click', () => {
  drawer.classList.contains('open') ? closeDrawer() : openDrawer();
});
drawerOverlay.addEventListener('click', closeDrawer);

// Nav link active state (drawer, sidebar, bottom nav all share data-nav / nav-item) 

document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') e.preventDefault();

    const group = link.closest('.drawer, .sidebar, .bottom-nav');
    group.querySelectorAll('[data-nav]').forEach(el => el.classList.remove('active'));
    link.classList.add('active');

    const label = link.textContent.trim();
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.classList.toggle('active', el.textContent.trim() === label);
    });
    closeDrawer();
  });
});

// SEARCH TOGGLE 
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
searchBtn.addEventListener('click', () => {
  searchInput.classList.toggle('open');
  if (searchInput.classList.contains('open')) searchInput.focus();
});
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  document.querySelectorAll('.match-card').forEach(card => {
    const teams = card.dataset.teams || '';
    card.style.display = teams.includes(q) ? '' : 'none';
  });
});


// DATES STRIP (swipe/drag only) 
const datesViewport = document.getElementById('datesViewport');
const datesTrack = document.getElementById('datesTrack');

const dayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
const totalDays = 22; 
const startOffset = -14;

for (let i = startOffset; i < startOffset + totalDays; i++){
  const d = new Date(today);
  d.setDate(today.getDate() + i);
  const btn = document.createElement('button');
  btn.className = 'date-btn' + (i === 0 ? ' today' : '');
  btn.innerHTML = `${dayNames[d.getDay()]}<span>${String(d.getDate()).padStart(1,'0')} ${d.toLocaleString('en-US',{month:'short'}).toLowerCase()}</span>`;
  datesTrack.appendChild(btn);
}

let isDown = false, startX = 0, scrollStart = 0, currentX = 0, dragged = false;

function getX(e){ return e.touches ? e.touches[0].clientX : e.clientX; }

function dragStart(e){
  isDown = true; dragged = false;
  datesViewport.classList.add('dragging');
  startX = getX(e);
  scrollStart = currentX;
}
function dragMove(e){
  if (!isDown) return;
  const x = getX(e);
  const delta = x - startX;
  if (Math.abs(delta) > 4) dragged = true;
  let next = scrollStart + delta;
  const maxScroll = 0;
  const minScroll = -(datesTrack.scrollWidth - datesViewport.clientWidth);
  if (next > maxScroll) next = maxScroll * 0.4 + next * 0.0; 
  if (next < minScroll) next = minScroll + (next - minScroll) * 0.2; 
  currentX = next;
  datesTrack.style.transform = `translateX(${currentX}px)`;
}
function dragEnd(){
  if (!isDown) return;
  isDown = false;
  datesViewport.classList.remove('dragging');
  const minScroll = -(datesTrack.scrollWidth - datesViewport.clientWidth);
  if (currentX > 0) currentX = 0;
  if (currentX < minScroll) currentX = minScroll;
  datesTrack.style.transition = 'transform .3s ease';
  datesTrack.style.transform = `translateX(${currentX}px)`;
  setTimeout(() => { datesTrack.style.transition = ''; }, 300);
}

datesViewport.addEventListener('mousedown', dragStart);
window.addEventListener('mousemove', dragMove);
window.addEventListener('mouseup', dragEnd);

datesViewport.addEventListener('touchstart', dragStart, { passive:true });
datesViewport.addEventListener('touchmove', dragMove, { passive:true });
datesViewport.addEventListener('touchend', dragEnd);


// Prevent the drag from being interpreted as a click-scroll; center "today" on load 
window.addEventListener('load', () => {
  const todayBtn = datesTrack.querySelector('.today');
  if (todayBtn){
    const offset = todayBtn.offsetLeft - datesViewport.clientWidth / 1 + todayBtn.clientWidth / 2;
    const minScroll = -(datesTrack.scrollWidth - datesViewport.clientWidth);
    currentX = Math.max(minScroll, Math.min(0, -offset));
    datesTrack.style.transform = `translateX(${currentX}px)`;
  }
});

//  FAVORITE STAR TOGGLE ------ 
document.querySelectorAll('[data-fav]').forEach(btn => {
  btn.addEventListener('click', () => btn.classList.toggle('active'));
});



