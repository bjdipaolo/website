document.addEventListener('DOMContentLoaded', () => {

    // --- Typewriter Effect for Hero Input ---
    const prompts = [
        "Build a hiring journey for warehouse associates",
        "Show which locations have the highest turnover risk",
        "Create an onboarding workflow for new store managers",
        "Identify candidates ready to re-engage",
        "Recommend internal mobility opportunities",
        "Generate a workforce plan for Q3 hiring"
    ];

    const typewriterEl = document.getElementById('typewriter-text');
    let promptIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    // Typing state machine
    function typeEffect() {
        if (!typewriterEl) return;

        const currentPrompt = prompts[promptIndex];

        if (isDeleting) {
            // Delete text
            typewriterEl.textContent = currentPrompt.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 20; // Faster deleting
        } else {
            // Type text
            typewriterEl.textContent = currentPrompt.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = Math.random() * 30 + 30; // Randomize typing speed for realism
        }

        // Logic for pause and switch states
        if (!isDeleting && charIndex === currentPrompt.length) {
            // Finished typing the prompt, pause before deleting
            setTimeout(() => {
                isDeleting = true;
                typeEffect();
            }, 3000);
            return;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next prompt
            isDeleting = false;
            promptIndex = (promptIndex + 1) % prompts.length;
            setTimeout(typeEffect, 500);
            return;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start effect
    setTimeout(() => {
        typeEffect();
    }, 1500);


    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }

            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mainNav = document.getElementById('mainNav');
            if (mobileMenuBtn && mainNav) {
                mobileMenuBtn.addEventListener('click', () => {
                    mainNav.classList.toggle('mobile-active');
                });
            }

        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.square-module, .outcome-card, .testimonial-card, .split-content, .dashboard-widget, .timeline-node, .fade-in-up, .light-card');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        observer.observe(el);

        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mainNav = document.getElementById('mainNav');
        if (mobileMenuBtn && mainNav) {
            mobileMenuBtn.addEventListener('click', () => {
                mainNav.classList.toggle('mobile-active');
            });
        }

    });

    // Diagram generic animation
    const diagramNodes = document.querySelectorAll('.diagram-node');
    diagramNodes.forEach((node, idx) => {
        node.style.opacity = '0';
        node.style.transform = 'scale(0.9)';
        node.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
        }, 1000 + (idx * 200));

        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mainNav = document.getElementById('mainNav');
        if (mobileMenuBtn && mainNav) {
            mobileMenuBtn.addEventListener('click', () => {
                mainNav.classList.toggle('mobile-active');
            });
        }

    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-active');
        });
    }

});
