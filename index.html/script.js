 const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIndicator();
                // Close mobile menu after clicking a link
                navMenu.classList.remove('active');
            });
        });

        // Modal Functionality
        const modal = document.getElementById('action-modal');
        const showModal = document.getElementById('show-modal');
        const closeModal = document.getElementById('close-modal');
        const signupForm = document.getElementById('signup-form');

        showModal.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for joining! You would receive a confirmation email.');
            modal.style.display = 'none';
            signupForm.reset();
        });

        // Animate Climate Facts on Scroll
        function animateFactNumbers() {
            const factTemp = document.getElementById('fact-temp');
            const factEmissions = document.getElementById('fact-emissions');
            const factLevel = document.getElementById('fact-level');
            const factSpecies = document.getElementById('fact-species');

            const targetTemp = 1.1;
            const targetEmissions = 36.8;
            const targetLevel = 3.3;
            const targetSpecies = '1M+';

            // Check if element is in viewport
            const isInViewport = (element) => {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                );
            };

            // Animation for simple number
            const animateNumber = (element, target, duration = 2000, decimals = 1) => {
                if (!isInViewport(element)) return;
                
                let start = 0;
                const increment = target / (duration / 16);
                
                const timer = setInterval(() => {
                    start += increment;
                    element.textContent = start.toFixed(decimals);
                    
                    if (start >= target) {
                        element.textContent = target.toFixed(decimals);
                        clearInterval(timer);
                    }
                }, 16);
            };

            // Check if elements are in viewport
            window.addEventListener('scroll', () => {
                if (isInViewport(factTemp)) {
                    animateNumber(factTemp, targetTemp);
                    // Remove event listener after animation starts
                    window.removeEventListener('scroll', arguments.callee);
                }
            });

            window.addEventListener('scroll', () => {
                if (isInViewport(factEmissions)) {
                    animateNumber(factEmissions, targetEmissions);
                    window.removeEventListener('scroll', arguments.callee);
                }
            });

            window.addEventListener('scroll', () => {
                if (isInViewport(factLevel)) {
                    animateNumber(factLevel, targetLevel);
                    window.removeEventListener('scroll', arguments.callee);
                }
            });

            // Special case for the text-based fact
            window.addEventListener('scroll', () => {
                if (isInViewport(factSpecies)) {
                    setTimeout(() => {
                        factSpecies.textContent = targetSpecies;
                    }, 500);
                    window.removeEventListener('scroll', arguments.callee);
                }
            });
        }

        // Initialize animations
        document.addEventListener('DOMContentLoaded', () => {
            animateFactNumbers();
            
            // Page scroll progress indicator
            window.addEventListener('scroll', () => {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercent = (scrollTop / scrollHeight) * 100;
                
                // Could be used for a scroll progress indicator if added to HTML
            });
        });

        // Fix for smooth scrolling
        Element.prototype.scrollIndicator = function() {
            window.scroll({
                behavior: 'smooth',
                left: 0,
                top: this.offsetTop - 70 // Adjust for header height
            });
        };
 

        document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#impact').scrollIntoView({
        behavior: 'smooth'
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = performance.now();
    const initial = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        let current;
        if (target.includes('°C')) {
            current = (1.1 * progress).toFixed(1) + '°C';
        } else if (target.includes('ppm')) {
            current = Math.floor(420 * progress) + 'ppm';
        } else if (target.includes('mm')) {
            current = (3.4 * progress).toFixed(1) + 'mm';
        } else {
            current = target;
        }
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Animate counters when stats section is visible
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(function(counter) {
                const target = counter.textContent;
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

statsObserver.observe(statsSection);

