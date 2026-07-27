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