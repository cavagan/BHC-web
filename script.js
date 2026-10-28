// Burkehaven Counseling - Interactive Scripts

// Replace the test site key with the free Cloudflare Turnstile key
// from https://dash.cloudflare.com → Turnstile. The key below always passes
// so the form can be previewed before a real widget is created.
const TURNSTILE_SITE_KEY = '1x00000000000000000000AA';

// This static site has no mail server. Leave FORM_ENDPOINT empty and submit
// only confirms on the page. Set it to a Formspree, Web3Forms, or Cloudflare
// Worker URL to deliver messages to connect@burkehavencounseling.com.
const FORM_ENDPOINT = '';

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

  const turnstileHost = document.getElementById('turnstile-widget');
  if (turnstileHost) {
    const mountTurnstile = () => {
      if (!window.turnstile) return false;
      window.turnstile.render('#turnstile-widget', {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'light'
      });
      return true;
    };
    if (!mountTurnstile()) {
      const wait = setInterval(() => {
        if (mountTurnstile()) clearInterval(wait);
      }, 150);
    }
  }

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

      const honeypot = form.querySelector('#company');
      if (honeypot && honeypot.value.trim()) {
        return;
      }

      const tokenField = form.querySelector('[name="cf-turnstile-response"]');
      const captchaError = document.getElementById('captcha-error');
      if (captchaError) captchaError.style.display = 'none';
      if (!tokenField || !tokenField.value) {
        if (captchaError) {
          captchaError.textContent = 'Please complete the human verification.';
          captchaError.style.display = 'block';
        }
        isValid = false;
      }

      if (isValid) {
        const loading = document.getElementById('loading');
        const success = document.getElementById('success-message');
        const payload = {
          name: name.value.trim(),
          email: email.value.trim(),
          phone: (form.querySelector('#phone')?.value || '').trim(),
          message: message.value.trim(),
          turnstileToken: tokenField.value
        };

        form.style.display = 'none';
        loading.classList.add('show');

        const finish = () => {
          loading.classList.remove('show');
          success.classList.add('show');
        };

        if (!FORM_ENDPOINT) {
          setTimeout(finish, 900);
          return;
        }

        fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        }).then((res) => {
          if (!res.ok) throw new Error('Request failed');
          finish();
        }).catch(() => {
          loading.classList.remove('show');
          form.style.display = '';
          if (window.turnstile) window.turnstile.reset();
          if (captchaError) {
            captchaError.textContent = 'We could not send your message. Please call or email us directly.';
            captchaError.style.display = 'block';
          }
        });
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
