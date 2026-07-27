 document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // close all other items (accordion behavior)
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item){
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', String(!isOpen));
    });
  });

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

