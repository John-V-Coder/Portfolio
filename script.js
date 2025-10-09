// Update copyright year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Mobile menu toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    const icon = menuIcon.querySelector('i');
    if (navbar.classList.contains('active')) {
      icon.classList.replace('bx-menu', 'bx-x');
    } else {
      icon.classList.replace('bx-x', 'bx-menu');
    }
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      const icon = menuIcon.querySelector('i');
      icon.classList.replace('bx-x', 'bx-menu');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
      navbar.classList.remove('active');
      const icon = menuIcon.querySelector('i');
      if (icon) {
        icon.classList.replace('bx-x', 'bx-menu');
      }
    }
  });
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  body.classList.add('light-theme');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.classList.replace('bxs-moon', 'bxs-sun');
    }
  }
}

if (themeToggle) {
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

// Form submission handler (if contact form exists)
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Form submitted! (Add your backend logic here)');
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

// Typing effect for hero title (if on home page)
const heroTitle = document.querySelector('.hero h1');
if (heroTitle && window.location.pathname.includes('home.html') || window.location.pathname === '/') {
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
  
  // Start typing after a short delay
  setTimeout(typeWriter, 500);
}
// View counter using CountAPI
  const totalCounter = "john-portfolio-total"; // total unique key
  const weeklyCounter = "john-portfolio-weekly"; // weekly unique key

  async function updateCounters() {
    // Update and fetch total count
    const total = await fetch(`https://api.countapi.xyz/hit/bitpiper/${totalCounter}`)
      .then(res => res.json());
    
    // Update and fetch weekly count
    const week = await fetch(`https://api.countapi.xyz/hit/bitpiper/${weeklyCounter}`)
      .then(res => res.json());

    document.getElementById("total-views").textContent = total.value;
    document.getElementById("weekly-views").textContent = week.value;
  }

  updateCounters();

  // Reset weekly counter every 7 days automatically
  const lastReset = localStorage.getItem("lastReset");
  const now = new Date();

  if (!lastReset || (now - new Date(lastReset)) / (1000 * 60 * 60 * 24) >= 7) {
    fetch(`https://api.countapi.xyz/set/bitpiper/${weeklyCounter}?value=0`);
    localStorage.setItem("lastReset", now.toISOString());
  }

// Chatbot widget
const chatWidget = document.getElementById('chatbot-widget');
const chatToggle = document.getElementById('chatbot-toggle');
const chatMessages = document.getElementById('chatbot-messages');
const chatInput = document.getElementById('chatbot-input');
const chatSend = document.getElementById('chatbot-send');

if (chatWidget && chatToggle && chatMessages && chatInput && chatSend) {

  // Toggle chatbot visibility
  chatToggle.addEventListener('click', () => {
    chatWidget.style.display = 'none';
  });

  // Add message to chat
  function addMessage(msg, isUser) {
    const div = document.createElement('div');
    div.textContent = msg;
    div.className = isUser ? 'user-msg' : 'bot-msg';
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Call Netlify serverless function
  async function generateResponse(prompt) {
    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Server error');
      }
      
      return data.answer;
    } catch (err) {
      console.error(err);
      return `Sorry, I could not fetch a response. ${err.message}`;
    }
  }

  // Handle user input
  async function handleChat() {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addMessage(msg, true);
    chatInput.value = '';
    const botReply = await generateResponse(msg);
    addMessage(botReply, false);
  }

  // Event listeners
  chatSend.addEventListener('click', handleChat);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
  });
}
