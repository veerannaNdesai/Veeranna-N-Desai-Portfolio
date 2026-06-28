/* =============================================
   VEERANNA N DESAI | PORTFOLIO JAVASCRIPT
   ============================================= */

'use strict';

// ---- DOM REFERENCES ----
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const mobileOverlay = document.getElementById('mobile-overlay');
const backToTop = document.getElementById('back-to-top');
const allNavLinks = document.querySelectorAll('.nav-link');
const revealEls = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('section[id]');

/* =============================================
   1. NAVBAR — scroll shadow + active link
   ============================================= */
function updateNavbar() {
    if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* =============================================
   2. MOBILE MENU — hamburger toggle
   ============================================= */
function openMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    mobileOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    mobileOverlay.classList.remove('visible');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

mobileOverlay.addEventListener('click', closeMenu);

// Close on nav link click (mobile)
allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
            closeMenu();
        }
    });
});

/* =============================================
   3. SCROLL REVEAL — intersection observer
   ============================================= */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));


/* =============================================
   5. BACK TO TOP BUTTON
   ============================================= */
function updateBackToTop() {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============================================
   6. SMOOTH SCROLL for anchor links
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80; // navbar height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* =============================================
   7. SKILL PILL — subtle click ripple
   ============================================= */
document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('click', function () {
        this.style.background = 'rgba(56, 189, 248, 0.18)';
        setTimeout(() => {
            this.style.background = '';
        }, 300);
    });
});

/* =============================================
   8. SCROLL EVENT — combine all handlers
   ============================================= */
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateNavbar();
            updateActiveNavLink();
            updateBackToTop();
            ticking = false;
        });
        ticking = true;
    }
});

/* =============================================
   9. INIT — run on page load
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
    updateActiveNavLink();
    updateBackToTop();

    // Trigger first-visible reveals immediately on load
    revealEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            const delay = parseInt(el.dataset.delay) || 0;
            setTimeout(() => el.classList.add('visible'), delay);
        }
    });
});