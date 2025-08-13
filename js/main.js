// DOM 
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');

    // Mobile Menu Toggle - Simple and reliable
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            console.log('Hamburger clicked!'); // Debug line
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on links
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    } else {
        console.log('Nav elements not found!'); // Debug line
    }

    // Smooth Scrolling
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
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

    // Header background change on scroll
    window.addEventListener('scroll', function() {
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

    // Simple animations for hero elements
    setTimeout(function() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');
        const heroActions = document.querySelector('.hero-actions');

        if (heroTitle) heroTitle.style.opacity = '1';
        if (heroSubtitle) heroSubtitle.style.opacity = '1';
        if (heroDescription) heroDescription.style.opacity = '1';
        if (heroActions) heroActions.style.opacity = '1';
    }, 500);
});
