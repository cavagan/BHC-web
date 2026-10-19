// Burkehaven Counseling - Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Contact form validation and submit
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      form.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
      form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));

      // Name
      const name = form.querySelector('#name');
      if (!name.value.trim()) {
        showError(name, 'Please enter your name');
        isValid = false;
      }

      // Email
      const email = form.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        showError(email, 'Please enter your email');
        isValid = false;
      } else if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }

      // Message
      const message = form.querySelector('#message');
      if (!message.value.trim() || message.value.trim().length < 10) {
        showError(message, 'Please enter a message of at least 10 characters');
        isValid = false;
      }

      if (isValid) {
        // Show loading
        const loading = document.getElementById('loading');
        const success = document.getElementById('success-message');
        form.style.display = 'none';
        loading.classList.add('show');

        // Simulate submit
        setTimeout(() => {
          loading.classList.remove('show');
          success.classList.add('show');
        }, 1500);
      }
    });
  }
});

function showError(input, message) {
  input.classList.add('error');
  const errorEl = input.nextElementSibling;
  if (errorEl && errorEl.classList.contains('error-message')) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
}
