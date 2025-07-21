// ====================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ====================================
document.querySelectorAll('.navbar-link').forEach(link => {
  const currentUrl = window.location.href.replace(/\/$/, '');
  const linkUrl = link.href.replace(/\/$/, '');

  if (linkUrl === currentUrl) {
    link.classList.add('navbar-link-current');
  }
});



// ====================================
// NAV TOGGLE FUNCTIONALITY
// ====================================
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.querySelector('.navbar-toggle');
  const navLinks = document.querySelector('.navbar-links');
  const hamburgerIcon = hamburgerButton.querySelector('i'); // This now correctly targets the Font Awesome <i> tag

  // Safety check: ensure all elements exist before adding listeners
  if (!hamburgerButton || !navLinks || !hamburgerIcon) {
    console.error('Navigation elements (button, links, or icon) not found!');
    return;
  }

  hamburgerButton.addEventListener('click', () => {
    
    // Toggle the 'active' class on the navigation links container
    const isMenuOpen = navLinks.classList.toggle('active');

    // Update aria-expanded attribute based on the menu's new state
    hamburgerButton.setAttribute('aria-expanded', isMenuOpen);

    // Toggle Font Awesome icon between 'fa-bars' (hamburger) and 'fa-times' (close)
    if (isMenuOpen) {
      hamburgerIcon.classList.remove('fa-bars');
      hamburgerIcon.classList.add('fa-times');
    } else {
      hamburgerIcon.classList.remove('fa-times');
      hamburgerIcon.classList.add('fa-bars');
    }
  });

  // Optional: Close mobile menu when a nav link is clicked (improves UX)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // Check if the menu is currently open AND if it's a mobile screen size (< 768px)
      if (navLinks.classList.contains('active') && window.innerWidth < 768) {
        navLinks.classList.remove('active'); // Hide the menu
        hamburgerButton.setAttribute('aria-expanded', 'false'); // Set aria-expanded to false
        hamburgerIcon.classList.remove('fa-times'); // Change icon back to bars
        hamburgerIcon.classList.add('fa-bars');
      }
    });
  });
});