/**
 * Wish Upon a Starre - Core Frontend Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveNavLink();
  initCharacterFilter();
});

/**
 * Mobile Navigation Menu Handler
 */
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('menu-open-icon');
  const closeIcon = document.getElementById('menu-close-icon');

  if (!menuButton || !mobileMenu) return;

  const toggleMenu = () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    
    if (isExpanded) {
      // Closing menu
      mobileMenu.classList.add('hidden');
      openIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
    } else {
      // Opening menu
      mobileMenu.classList.remove('hidden');
      openIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Focus first item
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  };

  menuButton.addEventListener('click', toggleMenu);

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    if (isExpanded && !mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
      toggleMenu();
    }
  });

  // Close menu when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) { // lg breakpoint
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        menuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }
  });

  // Handle keyboard escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      toggleMenu();
      menuButton.focus();
    }
  });
}

/**
 * Highlight the active link in the navigation menu based on current pathname
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  // Update desktop links
  const navLinks = document.querySelectorAll('.desktop-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('text-purple-700', 'font-semibold', 'border-b-2', 'border-purple-600');
      link.classList.remove('text-indigo-950', 'hover:text-purple-700');
    }
  });

  // Update mobile links
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('bg-purple-50', 'text-purple-700', 'font-semibold');
      link.classList.remove('text-indigo-950', 'hover:bg-gray-50');
    }
  });
}

/**
 * Filter character cards on the 'Our Characters' page
 */
function initCharacterFilter() {
  const filterButtons = document.querySelectorAll('#character-filters button, .filter-btn');
  const characterCards = document.querySelectorAll('#characters-grid article, .character-card');

  if (filterButtons.length === 0 || characterCards.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-filter') || button.getAttribute('data-category');

      // Update active button styling
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-brand-purple', 'bg-purple-700', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'text-brand-primary', 'hover:bg-brand-lilac');
      });
      button.classList.add('bg-brand-purple', 'text-white', 'shadow-md');
      button.classList.remove('bg-white', 'text-brand-primary', 'hover:bg-brand-lilac');

      // Filter cards with smooth transitions
      characterCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
          // Smooth fade in
          card.style.transition = 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          setTimeout(() => {
            card.classList.remove('opacity-0', 'scale-95');
            card.classList.add('opacity-100', 'scale-100');
          }, 10);
        } else {
          // Smooth fade out
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.classList.add('opacity-0', 'scale-95');
          card.classList.remove('opacity-100', 'scale-100');
          // Hide from layout after transition completes
          setTimeout(() => {
            const activeBtn = document.querySelector('#character-filters button.bg-brand-purple');
            const activeCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
            if (activeCategory !== 'all' && card.getAttribute('data-category') !== activeCategory) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}
