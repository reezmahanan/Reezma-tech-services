// ==========================================
// REEZMA TECH - INTERACTIVE FEATURES
// ==========================================

// Global State
const state = {
    theme: 'dark',
    currentModal: null,
    particles: [],
    stats: {
        projects: 0,
        clients: 0,
        uptime: 0,
        satisfaction: 0
    }
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimations();
    initCounters();
    initCardInteractions();
    initNavigation();
    initTypingEffect();
    initContactForm();
    initThemeToggle();
    initModalHandlers();
    initServiceFilters();
    initTooltips();
    initTestimonialAnimations();
    initPricingCards();
    console.log('🚀 Reezma Tech initialized successfully!');
});

// ==========================================
// PARTICLE SYSTEM
// ==========================================
function initParticles() {
    const particleContainer = document.querySelector('.particle-container');
    if (!particleContainer) return;

    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    const startX = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${startX}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(particle);
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animations for feature items
                if (entry.target.classList.contains('service-card')) {
                    const items = entry.target.querySelectorAll('.feature-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('fade-in');
                        }, index * 100);
                    });
                }
                
                // Animate stats items
                if (entry.target.classList.contains('stat-card')) {
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .stat-card, .contact-section').forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Update navigation on scroll
        updateNavigationOnScroll();
    });
}

function updateNavigationOnScroll() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// ==========================================
// ANIMATED COUNTERS
// ==========================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ==========================================
// CARD INTERACTIONS
// ==========================================
function initCardInteractions() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        // Ripple effect on click (keep if you want, or remove if you want no animation at all)
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // CTA Button interactions
    document.querySelectorAll('.cta-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = btn.closest('.service-card');
            if (card) {
                e.preventDefault();
                const service = card.querySelector('.service-title').textContent;
                openServiceModal(service);
            }
            // else: allow default navigation for links like 'Our Services'
        });
    });
}

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-menu');
    
    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
    
    // Mobile dropdown toggle
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = toggle.closest('.nav-dropdown');
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Navbar scroll effect handled by updateNavigationOnScroll function
    // The scrolled class is already added in that function
}

// ==========================================
// TYPING EFFECT
// ==========================================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const phrases = [
        'Empowering businesses with cutting-edge technology solutions',
        'Building the future, one line of code at a time',
        'Your trusted partner in digital transformation',
        'Innovation meets excellence'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ==========================================
// CONTACT FORM
// ==========================================
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        
        console.log('Form submitted:', data);
    });

    // Real-time validation
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email';
        }
    }
    
    const errorElement = field.nextElementSibling;
    if (!isValid) {
        field.classList.add('error');
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = errorMessage;
        }
    } else {
        field.classList.remove('error');
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    }
    
    return isValid;
}

// ==========================================
// THEME TOGGLE
// ==========================================
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        document.body.classList.toggle('light-theme');
        
        const icon = themeToggle.querySelector('i') || themeToggle;
        icon.textContent = state.theme === 'dark' ? '🌙' : '☀️';
        
        localStorage.setItem('theme', state.theme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        state.theme = 'light';
        const icon = themeToggle.querySelector('i') || themeToggle;
        icon.textContent = '☀️';
    }
}

// ==========================================
// MODAL SYSTEM
// ==========================================
function initModalHandlers() {
    // Close modal on backdrop click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.currentModal) {
            closeModal();
        }
    });

    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
}

function openServiceModal(serviceName) {
    const modal = document.querySelector('.service-modal');
    if (!modal) return;

    const modalContent = modal.querySelector('.modal-body');
    
    const serviceDetails = {
        'Cloud Solutions': {
            description: 'Our cloud infrastructure solutions provide scalable, reliable, and secure hosting for your business applications.',
            features: ['AWS, Azure, GCP Integration', 'Auto-scaling & Load Balancing', 'Backup & Disaster Recovery', 'Migration Services'],
            pricing: 'Starting at $99/month'
        },
        'Cybersecurity': {
            description: 'Protect your digital assets with our comprehensive cybersecurity solutions and threat protection services.',
            features: ['24/7 Security Monitoring', 'Penetration Testing', 'Security Compliance', 'Incident Response'],
            pricing: 'Custom pricing based on requirements'
        },
        'Data Analytics': {
            description: 'Transform your raw data into actionable insights with our advanced analytics and visualization tools.',
            features: ['Real-time Dashboards', 'Predictive Analytics', 'Machine Learning Models', 'Custom Reports'],
            pricing: 'Starting at $149/month'
        },
        'Development': {
            description: 'Custom software development tailored to your business needs with modern technologies and best practices.',
            features: ['Full-stack Development', 'Mobile Applications', 'API Development', 'Legacy System Modernization'],
            pricing: 'Project-based pricing'
        }
    };

    const details = serviceDetails[serviceName] || {};
    
    modal.querySelector('.modal-title').textContent = serviceName;
    modalContent.innerHTML = `
        <p class="modal-description">${details.description}</p>
        <h4>Key Features:</h4>
        <ul class="modal-features">
            ${details.features.map(f => `<li>✓ ${f}</li>`).join('')}
        </ul>
        <div class="modal-pricing">
            <strong>Pricing:</strong> ${details.pricing}
        </div>
        <button class="cta-btn primary" onclick="openContactModal()">Get Started</button>
    `;
    
    modal.classList.add('active');
    state.currentModal = modal;
    document.body.style.overflow = 'hidden';
}

function openContactModal() {
    closeModal();
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function closeModal() {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
        activeModal.classList.remove('active');
        state.currentModal = null;
        document.body.style.overflow = '';
    }
}

// ==========================================
// SERVICE FILTERS
// ==========================================
function initServiceFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter cards
            const cards = document.querySelectorAll('.service-card');
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('show'), 10);
                } else {
                    card.classList.remove('show');
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// ==========================================
// TOOLTIPS
// ==========================================
function initTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = el.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = el.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => tooltip.classList.add('show'), 10);
            
            el.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
                setTimeout(() => tooltip.remove(), 300);
            }, { once: true });
        });
    });
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
        <span class="notification-message">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// LOADING ANIMATION
// ==========================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    }
});

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    });
}

// ==========================================
// TESTIMONIAL ANIMATIONS
// ==========================================
function initTestimonialAnimations() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });

        testimonialCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Industry cards animation
    const industryCards = document.querySelectorAll('.industry-card');
    if (industryCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        industryCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Case study cards animation
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    if (caseStudyCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });

        caseStudyCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
            card.style.transition = 'all 0.8s ease';
            observer.observe(card);
        });
    }
    
    // Partner cards animation
    const partnerCards = document.querySelectorAll('.partner-card');
    if (partnerCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 80);
                }
            });
        }, { threshold: 0.1 });

        partnerCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            card.style.transition = 'all 0.5s ease';
            observer.observe(card);
        });
    }
    
    // Certification cards animation
    const certCards = document.querySelectorAll('.cert-card');
    if (certCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'rotateY(0deg)';
                    }, index * 80);
                }
            });
        }, { threshold: 0.1 });

        certCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'rotateY(90deg)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }
}

// ==========================================
// PRICING CARD INTERACTIONS
// ==========================================
function initPricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        // Add hover effect with shadow
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 60px rgba(3, 198, 252, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });

        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            });
        }, { threshold: 0.1 });

        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// ==========================================
// EXPORT FOR EXTERNAL USE
// ==========================================
window.ReezmaApp = {
    showNotification,
    openServiceModal,
    closeModal,
    state
};
