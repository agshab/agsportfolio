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

// ====================================
// PROJECT POST MODAL FUNCTIONALITY
// ====================================

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.close');
  const modalTitle = document.getElementById('modalTitle');
  const modalSummary = document.getElementById('modalSummary');
  const modalDescription = document.getElementById('modalDescription');
  const modalRole = document.getElementById('modalRole');
  const modalResults = document.getElementById('modalResults');
  const modalChallenges = document.getElementById('modalChallenges');
  const modalProcess = document.getElementById('modalProcess');
  const extraLink = document.getElementById('extraLink');
  const modalImage = document.getElementById('modalImage');

  document.querySelectorAll('.btn.btn-secondary').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();

      const projectContent = button.closest('.project-content');
      const projectPost = button.closest('project');
      if (!projectContent || !projectPost) return;

      const extraLinkUrl = projectPost.getAttribute('data-extra-link');
      const projectImage = projectPost.querySelector('.project-post-image');

      modalTitle.textContent = projectContent.querySelector('.project-title').textContent;
      modalSummary.textContent = projectContent.querySelector('.project-summary').textContent;
      modalDescription.textContent = projectContent.querySelector('.project-description').textContent;
      modalRole.textContent = projectContent.querySelector('.project-role').textContent;
      modalResults.textContent = projectContent.querySelector('.project-results').textContent;
      modalChallenges.textContent = projectContent.querySelector('.project-challenges').textContent;
      modalProcess.textContent = projectContent.querySelector('.project-process').textContent;

      extraLink.href = extraLinkUrl;
      modalImage.src = projectImage.src;
      modalImage.alt = projectImage.alt;

      modal.style.display = 'block';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// ====================================
// BLOG POST MODAL FUNCTIONALITY
// ====================================

document.addEventListener('DOMContentLoaded', () => {
  const blogModal = document.getElementById('blogModal');
  if (!blogModal) return; // Safety check

  const closeBtn = blogModal.querySelector('.close');
  const blogModalImage = document.getElementById('blogModalImage');
  const blogModalTitle = document.getElementById('blogModalTitle');
  const blogModalAuthor = document.getElementById('blogModalAuthor');
  const blogModalDate = document.getElementById('blogModalDate');
  const blogModalExcerpt = document.getElementById('blogModalExcerpt');
  const blogExtraLink = document.getElementById('blogExtraLink');

  document.querySelectorAll('.blog-post .btn.btn-secondary').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();

      const blogPost = button.closest('.blog-post');
      const blogImage = blogPost.querySelector('.blog-post-image');

      blogModalTitle.textContent = blogPost.querySelector('.blog-post-title').textContent;
      blogModalAuthor.textContent = blogPost.querySelector('.blog-post-author').textContent;
      blogModalDate.textContent = blogPost.querySelector('.blog-post-date').textContent;
      blogModalExcerpt.textContent = blogPost.querySelector('.blog-post-excerpt').textContent;

      blogExtraLink.href = button.getAttribute('href');

      blogModalImage.src = blogImage.src;
      blogModalImage.alt = blogImage.alt;

      blogModal.style.display = 'block';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      blogModal.style.display = 'none';
    });
  }

  window.addEventListener('click', event => {
    if (event.target === blogModal) {
      blogModal.style.display = 'none';
    }
  });
});

// ====================================
// Typing Animation for Role Titles
// ====================================
document.addEventListener("DOMContentLoaded", () => {
  const roles = [
    "Web Developer",
    "Software Developer",
    "Creative Digital Marketing Specialist",
    "Tech Specialist",
    "UX Designer"
  ];

  const typingSpeed = 150;
  const erasingSpeed = 100;
  const delayBetween = 1500;

  let roleIndex = 0;
  let charIndex = 0;
  const typingText = document.getElementById("typing-text");

  // Helper function to capitalize first letter of each word
  function capitalizeWords(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
  }

  function type() {
    if (charIndex < roles[roleIndex].length) {
      const currentText = roles[roleIndex].substring(0, charIndex + 1);
      typingText.textContent = capitalizeWords(currentText);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, delayBetween);
    }
  }

  function erase() {
    if (charIndex > 0) {
      const currentText = roles[roleIndex].substring(0, charIndex - 1);
      typingText.textContent = capitalizeWords(currentText);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, typingSpeed);
    }
  }

  if (roles.length && typingText) {
    setTimeout(type, typingSpeed);
  }
});
