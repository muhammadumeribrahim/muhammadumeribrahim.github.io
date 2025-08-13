// DOM Elements
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Mobile Menu Toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header ? header.offsetHeight : 70;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    if (header) {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const headerHeight = header ? header.offsetHeight : 70;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add stagger animation for skill categories
            if (entry.target.classList.contains('skills-grid')) {
                const skillCategories = entry.target.querySelectorAll('.skill-category');
                skillCategories.forEach((category, index) => {
                    setTimeout(() => {
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            // Add stagger animation for project cards
            if (entry.target.classList.contains('projects-grid')) {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .section-entrance, .skills-grid, .projects-grid, .timeline-item');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Set initial state for skill categories and project cards
    const skillCategories = document.querySelectorAll('.skill-category');
    const projectCards = document.querySelectorAll('.project-card');
    
    skillCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'all 0.6s ease';
    });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
});

// Contact Form Enhancement
const contactMethods = document.querySelectorAll('.contact-method');

contactMethods.forEach(method => {
    method.addEventListener('mouseenter', () => {
        method.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    method.addEventListener('mouseleave', () => {
        method.style.transform = 'translateY(0) scale(1)';
    });
});

// Performance Optimization
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Preload critical animations
    const criticalElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-actions');
    criticalElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
    });
    
    // Remove will-change after animations complete
    setTimeout(() => {
        criticalElements.forEach(el => {
            el.style.willChange = 'auto';
        });
    }, 2000);
});

// Error Handling for Missing Elements
const handleMissingElements = () => {
    if (!header) console.warn('Header element not found');
    if (navLinks.length === 0) console.warn('Navigation links not found');
    if (sections.length === 0) console.warn('Sections not found');
    if (!navToggle) console.warn('Nav toggle not found');
    if (!navMenu) console.warn('Nav menu not found');
};

handleMissingElements();
