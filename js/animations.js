// Advanced Animation Controller
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupHoverAnimations();
        this.bindEvents();
    }

    // Scroll-based animations
    setupScrollAnimations() {
        const scrollElements = document.querySelectorAll('[data-animate]');

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        scrollElements.forEach(el => {
            scrollObserver.observe(el);
        });

        this.observers.set('scroll', scrollObserver);
    }

    // Parallax effects for floating elements
    setupParallaxEffects() {
        if (this.isReducedMotion) return;

        const floatingElements = document.querySelectorAll('.floating-element');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            floatingElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Enhanced hover animations
    setupHoverAnimations() {
        const hoverElements = document.querySelectorAll('.hover-effect');

        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });
        });
    }

    // Create ripple effect on hover
    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Trigger specific animations
    triggerAnimation(element) {
        const animationType = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || 0;

        setTimeout(() => {
            switch (animationType) {
                case 'fadeInUp':
                    element.classList.add('fade-in-up');
                    break;
                case 'slideInLeft':
                    element.classList.add('slide-in-left');
                    break;
                case 'slideInRight':
                    element.classList.add('slide-in-right');
                    break;
                case 'stagger':
                    this.triggerStaggerAnimation(element);
                    break;
                default:
                    element.classList.add('animate-on-scroll', 'visible');
            }
        }, delay);
    }

    // Stagger animation for multiple elements
    triggerStaggerAnimation(container) {
        const children = container.children;

        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('fade-in-up');
            }, index * 100);
        });
    }

    // Bind global events
    bindEvents() {
        // Smooth scroll to top on logo click
        const logo = document.querySelector('.nav-brand');
        if (logo) {
            logo.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Enhanced button animations
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (!this.isReducedMotion) {
                    this.createClickAnimation(e);
                }
            });
        });
    }

    // Click animation for buttons
    createClickAnimation(e) {
        const button = e.currentTarget;
        button.style.transform = 'scale(0.95)';

        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
        this.animations.clear();
    }
}

// Typing animation for hero text
class TypingAnimation {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    start() {
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Loading animations
class LoadingAnimations {
    static showSkeletons() {
        const skeletonElements = document.querySelectorAll('.skeleton');
        skeletonElements.forEach(el => {
            el.classList.add('loading-shimmer');
        });
    }

    static hideSkeletons() {
        const skeletonElements = document.querySelectorAll('.skeleton');
        skeletonElements.forEach(el => {
            el.classList.remove('loading-shimmer');
            el.style.opacity = '0';
            setTimeout(() => {
                el.style.display = 'none';
            }, 300);
        });
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const animationController = new AnimationController();

    // Add animation attributes to elements
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.setAttribute('data-animate', index % 2 === 0 ? 'slideInLeft' : 'slideInRight');
        item.setAttribute('data-delay', index * 200);
    });

    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        skillsGrid.setAttribute('data-animate', 'stagger');
    }

    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsGrid.setAttribute('data-animate', 'stagger');
    }

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .project-card, .skill-category, .stat-card');
    interactiveElements.forEach(el => {
        el.classList.add('hover-effect');
    });
});

// Export for potential external use
window.AnimationController = AnimationController;
window.TypingAnimation = TypingAnimation;
window.LoadingAnimations = LoadingAnimations;
