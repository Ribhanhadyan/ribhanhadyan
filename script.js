document.addEventListener("DOMContentLoaded", function () {

    // ── Typed.js ──────────────────────────────────────────────
    new Typed('#typing-text', {
        strings: [
            "Data Scientist",
            "Mathematician",
            "Operations Research Enthusiast",
            "Problem Solver"
        ],
        typeSpeed: 55,
        backSpeed: 30,
        backDelay: 2200,
        loop: true,
        cursorChar: '|',
    });

    // ── Navbar on scroll ──────────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ── Active nav link on scroll ─────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => sectionObserver.observe(section));

    // ── Certificate Modal ─────────────────────────────────────
    const certificateModal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    if (certificateModal) {
        certificateModal.addEventListener('show.bs.modal', function (event) {
            const card = event.relatedTarget;
            const imgSrc = card.getAttribute('data-img-src');
            modalImage.src = imgSrc;
        });
    }

    // ── Bootstrap Tooltips ────────────────────────────────────
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(el => new bootstrap.Tooltip(el));

    // ── Particles.js ──────────────────────────────────────────
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 1000 } },
                color: { value: "#111110" },
                shape: { type: "circle" },
                opacity: { value: 0.15, random: true },
                size: { value: 2, random: true },
                line_linked: {
                    enable: true,
                    distance: 160,
                    color: "#111110",
                    opacity: 0.06,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: false },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.15 } }
                }
            },
            retina_detect: true
        });
    }

    // ── Scroll reveal for experience items ────────────────────
    const revealItems = document.querySelectorAll('.timeline-item');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, i * 80);
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach(item => revealObserver.observe(item));

    // ── Smooth scroll for anchor links ───────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });

                // close mobile nav if open
                const navCollapse = document.getElementById('navbarNav');
                if (navCollapse && navCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });

});
