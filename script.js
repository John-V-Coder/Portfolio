// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = menuToggle.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.add('bx-menu');
            icon.classList.remove('bx-x');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            menuToggle.querySelector('i').classList.add('bx-menu');
            menuToggle.querySelector('i').classList.remove('bx-x');
        });
    });

    // Enhanced form handling for Netlify
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Clear form on page load if coming from thank you page
        if (sessionStorage.getItem('formSubmitted')) {
            contactForm.reset();
            sessionStorage.removeItem('formSubmitted');
        }
        
        contactForm.addEventListener('submit', function(e) {
            // Basic validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                    
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 3000);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }
            
            // Store submission state for thank you page
            sessionStorage.setItem('formSubmitted', 'true');
        });
    }
    
    // Thank you page specific code
    if (window.location.pathname.includes('thank-you')) {
        // You can add any thank you page specific JavaScript here
        console.log('Thank you page loaded');
    }
    
    // Add scroll event listener for header styling
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '';
            header.style.background = '';
        }
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.portfolio-card, .skill-category, .contact-info, .about-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize elements for animation
    const animatedElements = document.querySelectorAll('.portfolio-card, .skill-category, .contact-info, .about-image');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize Typed.js if available for potential future use
    if (typeof Typed !== 'undefined') {
        // You could use Typed.js for a typing animation in the hero section
        // Example: 
        // const typed = new Typed('.typed-element', { strings: [], typeSpeed: 50 });
    }
});