// Enhanced Portfolio JavaScript - Optimized Performance
class PortfolioApp {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.intersectionObserver = null;
        this.tiltElements = new Map();
        this.rafId = null;
        this.isPageLoaded = false;
        
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupIntersectionObserver();
        this.setupTypewriter();
        this.setupSkillAnimations();
        this.setupImageInteractions();
        this.setupParticleSystem();
        this.setupThemeToggle();
        this.setupScrollToTop();
        this.setupContactForm();
        this.setupPerformanceOptimizations();
    }

    // Enhanced Loading Screen
    setupLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        
        if (loadingScreen) {
            // Simulate loading progress
            const loader = loadingScreen.querySelector('.loader');
            const loadingText = loadingScreen.querySelector('.loading-text');
            
            const messages = [
                'Loading Portfolio...',
                'Initializing Components...',
                'Almost Ready...'
            ];
            
            let messageIndex = 0;
            const messageInterval = setInterval(() => {
                if (loadingText && messageIndex < messages.length) {
                    loadingText.textContent = messages[messageIndex];
                    messageIndex++;
                } else {
                    clearInterval(messageInterval);
                }
            }, 500);

            window.addEventListener('load', () => {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        this.isPageLoaded = true;
                        this.startAnimations();
                    }, 500);
                }, 1500);
            });
        }
    }

    // Enhanced Navigation
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Optimized scroll handler with throttling
        let isScrolling = false;
        const handleScroll = () => {
            if (!isScrolling) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Active section highlighting
        const sections = document.querySelectorAll('section[id]');
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });

        sections.forEach(section => navObserver.observe(section));

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });
    }

    // Optimized Intersection Observer for animations
    setupIntersectionObserver() {
        const animatedElements = document.querySelectorAll('.glass-card, .skill-category, .project-card, .activity-card, .certification-card');
        
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up', 'visible');
                    // Unobserve after animation to improve performance
                    this.intersectionObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        });

        animatedElements.forEach(element => {
            this.intersectionObserver.observe(element);
        });
    }

    // Enhanced Typewriter Effect
    setupTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;

        const texts = [
            'Cyber Security Student',
            'Security Researcher', 
            'Penetration Tester',
            'Ctf Player',
            'Android Developer',
            'Web Developer'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        const typewriterEffect = () => {
            const currentText = texts[textIndex];
            
            if (!isDeleting && charIndex < currentText.length) {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typewriterEffect, 100);
            } else if (isDeleting && charIndex > 0) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typewriterEffect, 50);
            } else if (!isDeleting && charIndex === currentText.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    typewriterEffect();
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typewriterEffect, 500);
            }
        };

        // Start typewriter effect after page load
        setTimeout(typewriterEffect, 2000);
    }    // Enhanced Skill Animations with Intersection Observer
    setupSkillAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillProgress = entry.target;
                    const skillItem = skillProgress.closest('.skill-item');
                    const percentage = skillItem ? skillItem.querySelector('.skill-percentage') : null;
                    
                    if (percentage) {
                        const targetWidth = parseInt(percentage.textContent) / 100;
                        
                        // Add animated class for glow effect
                        skillProgress.classList.add('animated');
                        
                        // Animate with CSS transform for better performance
                        setTimeout(() => {
                            skillProgress.style.transform = `scaleX(${targetWidth})`;
                        }, 200);
                        
                        // Remove glow animation after completion
                        setTimeout(() => {
                            skillProgress.classList.remove('animated');
                        }, 2000);
                    } else {
                        // Fallback for data-percentage attribute
                        const dataPercentage = skillProgress.getAttribute('data-percentage');
                        if (dataPercentage) {
                            const targetWidth = parseInt(dataPercentage) / 100;
                            skillProgress.classList.add('animated');
                            setTimeout(() => {
                                skillProgress.style.transform = `scaleX(${targetWidth})`;
                            }, 200);
                            setTimeout(() => {
                                skillProgress.classList.remove('animated');
                            }, 2000);
                        }
                    }
                    
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }// Enhanced Interactive Image Effects with Cursor Proximity
    // Enhanced Profile Card Tilt Effects
    setupImageInteractions() {
        const profileCard = document.getElementById('profile-card');
        
        if (!profileCard) return;

        const handleMouseMove = (e) => {
            const rect = profileCard.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate mouse position relative to card center
            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;
            
            // Calculate if mouse is over the card
            const isHovering = mouseX >= rect.left && mouseX <= rect.right && 
                             mouseY >= rect.top && mouseY <= rect.bottom;
            
            if (isHovering) {
                // Calculate rotation based on mouse position (more aggressive effect)
                const rotateX = (deltaY / rect.height) * -100; // increased intensity
                const rotateY = (deltaX / rect.width) * 100;   // much more aggressive horizontal tilt
                
                // Store mouse position for other effects
                profileCard.style.setProperty('--mouse-x', deltaX + 'px');
                profileCard.style.setProperty('--mouse-y', deltaY + 'px');
                profileCard.style.setProperty('--rotate-x', `${rotateX}deg`);
                profileCard.style.setProperty('--rotate-y', `${rotateY}deg`);
                
                // Add dynamic glow effect based on tilt
                const glowIntensity = Math.min(Math.abs(rotateX) + Math.abs(rotateY), 50) / 50;
                const glowX = (deltaX / rect.width) * 20; // Glow offset based on mouse position
                const glowY = (deltaY / rect.height) * 20;
                
                profileCard.style.setProperty('--glow-intensity', glowIntensity);
                profileCard.style.setProperty('--glow-x', `${glowX}px`);
                profileCard.style.setProperty('--glow-y', `${glowY}px`);
                
                // Add hovering class for CSS effects
                profileCard.classList.add('card-hovering');
            }
        };

        const handleMouseLeave = () => {
            // Reset transformations when mouse leaves
            profileCard.style.setProperty('--rotate-x', '0deg');
            profileCard.style.setProperty('--rotate-y', '0deg');
            profileCard.style.setProperty('--mouse-x', '0px');
            profileCard.style.setProperty('--mouse-y', '0px');
            profileCard.style.setProperty('--glow-intensity', '0');
            profileCard.style.setProperty('--glow-x', '0px');
            profileCard.style.setProperty('--glow-y', '0px');
            profileCard.classList.remove('card-hovering');
        };

        // Add smooth mouse tracking
        profileCard.addEventListener('mousemove', throttle(handleMouseMove, 16));
        profileCard.addEventListener('mouseleave', handleMouseLeave);

        // Add click animation
        profileCard.addEventListener('click', () => {
            profileCard.style.transform = 'scale(0.98)';
            setTimeout(() => {
                profileCard.style.transform = '';
            }, 150);
        });

        // Add entrance animation delay for profile card elements
        const cardElements = profileCard.querySelectorAll('.profile-image-container, .profile-info, .card-decorations');
        cardElements.forEach((element, index) => {
            element.style.animationDelay = `${2 + (index * 0.2)}s`;
            element.style.opacity = '0';
            element.style.animation = 'fadeInUp 0.8s ease forwards';
        });

        // Add a subtle continuous floating animation
        let floatAnimation;
        const startFloating = () => {
            let start = null;
            floatAnimation = (timestamp) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = (elapsed % 4000) / 4000; // 4 second cycle
                const yOffset = Math.sin(progress * Math.PI * 2) * 2; // 2px float
                
                if (!profileCard.matches(':hover')) {
                    profileCard.style.transform = `translateY(${yOffset}px)`;
                }
                
                requestAnimationFrame(floatAnimation);
            };
            requestAnimationFrame(floatAnimation);
        };

        // Start floating animation after initial load animation
        setTimeout(startFloating, 3000);
    }

    // Optimized Particle System
    setupParticleSystem() {
        if (this.isReducedMotion) return;
        
        const particleContainer = document.getElementById('particles');
        if (!particleContainer) return;

        const particles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 50;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--accent-primary);
                border-radius: 50%;
                pointer-events: none;
                opacity: ${Math.random() * 0.5 + 0.1};
            `;
            
            particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
            
            particleContainer.appendChild(particle);
        }

        // Animate particles with optimized RAF
        let lastTime = 0;
        const animateParticles = (currentTime) => {
            if (currentTime - lastTime >= 16) { // ~60fps
                particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Boundary check and wrap around
                    if (particle.x < 0) particle.x = window.innerWidth;
                    if (particle.x > window.innerWidth) particle.x = 0;
                    if (particle.y < 0) particle.y = window.innerHeight;
                    if (particle.y > window.innerHeight) particle.y = 0;
                    
                    particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
                });
                lastTime = currentTime;
            }
            
            requestAnimationFrame(animateParticles);
        };
        
        animateParticles(0);

        // Pause particles when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                particles.forEach(p => p.element.style.animationPlayState = 'paused');
            } else {
                particles.forEach(p => p.element.style.animationPlayState = 'running');
            }
        });
    }    // Enhanced Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const body = document.body;
        
        if (!themeToggle) {
            console.warn('Theme toggle button not found');
            return;
        }

        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('portfolio-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
            body.classList.add('light-theme');
        }

        // Theme toggle click handler
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
            
            // Add smooth transition effect
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
            
            // Visual feedback
            themeToggle.style.transform = 'translateY(-50%) scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'translateY(-50%) scale(1)';
            }, 150);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                if (e.matches) {
                    body.classList.remove('light-theme');
                } else {
                    body.classList.add('light-theme');
                }
            }
        });
    }

    // Enhanced Scroll to Top
    setupScrollToTop() {
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        if (!scrollToTopBtn) return;

        const toggleScrollButton = () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', throttle(toggleScrollButton, 100), { passive: true });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Enhanced Contact Form
    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        // Add focus/blur effects
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });

        // Form submission with validation
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                this.showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                this.showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            this.showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }

        // Preload critical resources
        const criticalImages = [
            'assets/My Picture.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });

        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            if (this.rafId) {
                cancelAnimationFrame(this.rafId);
            }
            if (this.intersectionObserver) {
                this.intersectionObserver.disconnect();
            }
        });
    }

    // Start animations after loading
    startAnimations() {
        // Trigger initial animations
        const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-title, .hero-description, .hero-buttons, .hero-socials, .image-container');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Utility function for notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            color: var(--text-primary);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.borderColor = 'var(--success)';
        } else if (type === 'error') {
            notification.style.borderColor = 'var(--error)';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// LinkedIn Showcase Toggle Function with Better Error Handling
function toggleShowcase(button) {
    const container = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (container.classList.contains('expanded')) {
        container.classList.remove('expanded');
        button.classList.remove('expanded');
        button.innerHTML = '<i class="fas fa-chevron-right"></i>View LinkedIn Post';
    } else {
        container.classList.add('expanded');
        button.classList.add('expanded');
        button.innerHTML = '<i class="fas fa-chevron-right"></i>Hide LinkedIn Post';
        
        // Lazy load iframe only when first opened
        const iframe = container.querySelector('iframe');
        if (iframe && !iframe.hasAttribute('data-loaded')) {
            // Mark as loaded to prevent reloading
            iframe.setAttribute('data-loaded', 'true');
            
            // Load the iframe source from data-src with error handling
            const dataSrc = iframe.getAttribute('data-src');
            if (dataSrc) {
                // Add error event listener to handle load failures gracefully
                iframe.addEventListener('error', function() {
                    // Silently handle iframe load errors
                }, { once: true });
                
                iframe.addEventListener('load', function() {
                    // Iframe loaded successfully
                }, { once: true });
                
                iframe.src = dataSrc;
            }
        }
    }
}

// Project Filter System
class ProjectFilter {
    constructor() {
        // Add delay to ensure DOM is fully loaded
        setTimeout(() => {
            this.init();
        }, 100);
    }

    init() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        
        if (this.filterButtons.length === 0) {
            return;
        }
        
        this.setupEventListeners();
        this.showAllProjects();
    }

    setupEventListeners() {
        this.filterButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFilterClick(button);
            });
        });
    }

    handleFilterClick(clickedButton) {
        const filter = clickedButton.getAttribute('data-filter');
        
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        
        // Filter projects
        this.filterProjects(filter);
    }

    filterProjects(filter) {
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                this.showProject(card);
            } else {
                this.hideProject(card);
            }
        });
    }

    showProject(card) {
        card.classList.remove('hidden');
        card.classList.add('show');
        card.style.display = 'flex'; // Changed from 'block' to 'flex' for proper layout
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    }

    hideProject(card) {
        card.classList.remove('show');
        card.classList.add('hidden');
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        // Hide after animation completes
        setTimeout(() => {
            if (card.classList.contains('hidden')) {
                card.style.display = 'none';
            }
        }, 500);
    }

    showAllProjects() {
        this.projectCards.forEach(card => {
            this.showProject(card);
        });
    }
}

// Simple fallback filter function
function filterProjects(filterType) {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    
    // Update active button
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filterType) {
            btn.classList.add('active');
        }
    });
    
    // Filter cards
    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterType === 'all' || category === filterType) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.classList.remove('hidden');
            card.classList.add('show');
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            card.classList.remove('show');
            card.classList.add('hidden');
            setTimeout(() => {
                if (card.classList.contains('hidden')) {
                    card.style.display = 'none';
                }
            }, 500);
        }
    });
}

// Simple initialization function for filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0) {
        return;
    }
    
    // Add click event to each button
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
    
    // Initialize all projects as visible
    filterProjects('all');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize portfolio app with error handling
    try {
        new PortfolioApp();
    } catch (error) {
        // Silent error handling
    }
    
    // Initialize filters with delay
    setTimeout(() => {
        try {
            initProjectFilters();
            new ProjectFilter();
        } catch (error) {
            // Fallback - just try the simple function
            setTimeout(initProjectFilters, 500);
        }
    }, 500);
});

// ===== REACTBITS-STYLE PROFILE CARD ANIMATIONS =====

class ProfileCardAnimations {
    constructor() {
        this.profileCard = document.getElementById('profile-card');
        this.isHovering = false;
        this.init();
    }

    init() {
        if (!this.profileCard) return;
        
        this.setupMouseTracking();
        this.setupIntersectionObserver();
        this.setupTouchEvents();
    }

    setupMouseTracking() {
        this.profileCard.addEventListener('mousemove', (e) => {
            const rect = this.profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on mouse position (reduced intensity)
            const rotateX = (y - centerY) / 20; // Reduced from /10 to /20
            const rotateY = (centerX - x) / 20; // Reduced from /10 to /20
            
            // Apply smooth 3D transformation without translateZ in mousemove
            requestAnimationFrame(() => {
                this.profileCard.style.transform = 
                    `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });

        this.profileCard.addEventListener('mouseenter', () => {
            this.isHovering = true;
            // Add the hover class for CSS transitions
            this.profileCard.classList.add('card-hovering');
        });

        this.profileCard.addEventListener('mouseleave', () => {
            this.isHovering = false;
            // Remove hover class and reset transform
            this.profileCard.classList.remove('card-hovering');
            
            requestAnimationFrame(() => {
                this.profileCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add entrance animation
                    entry.target.classList.add('animate-in');
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        observer.observe(this.profileCard);
    }

    setupTouchEvents() {
        // Handle touch devices
        this.profileCard.addEventListener('touchstart', (e) => {
            this.profileCard.classList.add('touch-active');
        });

        this.profileCard.addEventListener('touchend', () => {
            setTimeout(() => {
                this.profileCard.classList.remove('touch-active');
            }, 300);
        });
    }
}

// Enhanced Contact Button Interactions
class ContactButtonEnhancements {
    constructor() {
        this.contactBtn = document.querySelector('.contact-me-btn');
        this.init();
    }

    init() {
        if (!this.contactBtn) return;
        
        this.setupRippleEffect();
        this.setupClickAnimation();
    }

    setupRippleEffect() {
        this.contactBtn.addEventListener('click', (e) => {
            const rect = this.contactBtn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.contactBtn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    setupClickAnimation() {
        this.contactBtn.addEventListener('mousedown', () => {
            this.contactBtn.style.transform = 'translateZ(8px) scale(0.98)';
        });

        this.contactBtn.addEventListener('mouseup', () => {
            this.contactBtn.style.transform = '';
        });
    }
}

// Initialize Profile Card Animations
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for styles to load
    setTimeout(() => {
        new ProfileCardAnimations();
        new ContactButtonEnhancements();
    }, 100);
});

// Add ripple effect styles dynamically
const rippleStyles = `
.contact-me-btn {
    position: relative;
    overflow: hidden;
}

.ripple-effect {
    position: absolute;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
    }
}

.profile-card-animated.touch-active {
    transform: scale(0.98) !important;
    transition: transform 0.1s ease !important;
}
`;

// Inject ripple styles
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Prevent chrome runtime errors
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.lastError) {
    // Clear the error
    chrome.runtime.lastError;
}