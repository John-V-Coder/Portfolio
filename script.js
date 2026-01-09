// Theme toggle
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  // Apply saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    const icon = themeToggle.querySelector('i');
    if (icon) icon.classList.replace('bxs-moon', 'bxs-sun');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');

    if (body.classList.contains('light-theme')) {
      icon.classList.replace('bxs-moon', 'bxs-sun');
      localStorage.setItem('theme', 'light');
    } else {
      icon.classList.replace('bxs-sun', 'bxs-moon');
      localStorage.setItem('theme', 'dark');
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Add active class to current nav link based on URL
const currentLocation = window.location.pathname.split('/').pop() || 'home.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  const linkPath = link.getAttribute('href').split('#')[0];
  if (linkPath === currentLocation || (currentLocation === '' && linkPath === 'home.html')) {
    link.classList.add('active');
  }
});

// Scroll header background effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.style.background = body.classList.contains('light-theme')
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(10, 14, 39, 0.95)';
    header.style.boxShadow = '0 5px 20px rgba(0, 255, 136, 0.1)';
  } else {
    header.style.background = body.classList.contains('light-theme')
      ? 'rgba(255, 255, 255, 0.9)'
      : 'rgba(10, 14, 39, 0.5)';
    header.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(30px)';

      setTimeout(() => {
        entry.target.style.transition = 'all 0.6s ease-out';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
const animatedElements = document.querySelectorAll('.service-card, .portfolio-grid article, .about ul li');
animatedElements.forEach(el => observer.observe(el));

// Button click effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Form submission handler
const contactForm = document.querySelector('form[name="contact"]');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const isLocal = window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1' ||
                    window.location.protocol === 'file:';

    if (isLocal) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        topic: formData.get('topic'),
        message: formData.get('message')
      };

      sessionStorage.setItem('formSubmission', JSON.stringify(data));
      window.location.href = 'thank-you.html';
    }
  });
}

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / 500;
  });
}

// Service cards hover effect with tilt
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scroll-to-top');

if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Typing effect for hero title (if on home page)
const heroTitle = document.querySelector('.hero h1');
if (heroTitle && (window.location.pathname.includes('home.html') || window.location.pathname === '/')) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  let i = 0;

  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  setTimeout(typeWriter, 500);
}

// View counter using CountAPI
const totalCounter = "john-portfolio-total";
const weeklyCounter = "john-portfolio-weekly";

async function updateCounters() {
  try {
    const total = await fetch(`https://api.countapi.xyz/hit/bitpiper/${totalCounter}`)
      .then(res => res.json());

    const week = await fetch(`https://api.countapi.xyz/hit/bitpiper/${weeklyCounter}`)
      .then(res => res.json());

    const totalEl = document.getElementById("total-views");
    const weeklyEl = document.getElementById("weekly-views");

    if (totalEl) totalEl.textContent = total.value;
    if (weeklyEl) weeklyEl.textContent = week.value;
  } catch (err) {
    console.error('Counter update failed:', err);
  }
}

if (document.getElementById("total-views") || document.getElementById("weekly-views")) {
  updateCounters();

  const lastReset = localStorage.getItem("lastReset");
  const now = new Date();

  if (!lastReset || (now - new Date(lastReset)) / (1000 * 60 * 60 * 24) >= 7) {
    fetch(`https://api.countapi.xyz/set/bitpiper/${weeklyCounter}?value=0`);
    localStorage.setItem("lastReset", now.toISOString());
  }
}

// Mobile menu toggle
const menuToggle = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuToggle && navbar) {
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navbar.classList.contains('active')) {
      icon.classList.replace('bx-menu', 'bx-x');
      document.body.style.overflow = 'hidden';
    } else {
      icon.classList.replace('bx-x', 'bx-menu');
      document.body.style.overflow = '';
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.replace('bx-x', 'bx-menu');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
      navbar.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon.classList.contains('bx-x')) {
        icon.classList.replace('bx-x', 'bx-menu');
        document.body.style.overflow = '';
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navbar.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon.classList.contains('bx-x')) {
        icon.classList.replace('bx-x', 'bx-menu');
      }
      document.body.style.overflow = '';
    }
  });
}

// Chatbot widget
const chatWidget = document.getElementById('chatbot-widget');
const chatToggle = document.getElementById('chatbot-toggle');
const chatMessages = document.getElementById('chatbot-messages');
const chatInput = document.getElementById('chatbot-input');
const chatSend = document.getElementById('chatbot-send');

if (chatWidget && chatToggle && chatMessages && chatInput && chatSend) {
  chatToggle.addEventListener('click', () => {
    chatWidget.style.display = 'none';
  });

  function addMessage(msg, isUser) {
    const div = document.createElement('div');
    div.textContent = msg;
    div.className = isUser ? 'user-msg' : 'bot-msg';
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function generateResponse(prompt) {
    try {
      const supabaseUrl = 'https://ymlippnwcakvcwehwncx.supabase.co';
      const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltbGlwcG53Y2FrdmN3ZWh3bmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMTEwMjcsImV4cCI6MjA3NzU4NzAyN30.6n192j9_eVomhjbXN-1yrvxQfOcgjDmibm3G0xyQ_cs';

      const res = await fetch(`${supabaseUrl}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`
        },
        body: JSON.stringify({ prompt })
      });

      let data = null;
      try {
        data = await res.json();
      } catch (e) {
        throw new Error('Invalid JSON from server');
      }

      if (!res.ok) {
        throw new Error((data && data.error) || 'Server error');
      }

      if (!data || typeof data.answer !== 'string') {
        throw new Error('Malformed server response');
      }

      return data.answer;
    } catch (err) {
      console.error(err);
      return `Sorry, I could not fetch a response. ${err.message}`;
    }
  }

  async function handleChat() {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addMessage(msg, true);
    chatInput.value = '';
    const botReply = await generateResponse(msg);
    addMessage(botReply, false);
  }

  chatSend.addEventListener('click', handleChat);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
  });
}
