document.addEventListener("DOMContentLoaded", function() {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // --- Typing Effect ---
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        new Typed('#typing-text', {
            strings: ['Data Scientist @PT BFI Finance Indonesia, Tbk', 'Mathematics Graduated @Padjadjaran University', 'AI Enthusiast'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            smartBackspace: true
        });
    }

    // --- Animate Elements on Scroll ---
    const animatedElements = document.querySelectorAll('.animated-element');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(el => observer.observe(el));
    
    // --- Certificate Modal Logic ---
    const certificateModal = document.getElementById('certificateModal');
    if (certificateModal) {
        certificateModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const imgSrc = button.getAttribute('data-img-src');
            const modalImage = document.getElementById('modalImage');
            modalImage.src = imgSrc;
        });
    }
    
    // --- Copy to Clipboard for Email ---
    const copyBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');
    
    // Initialize tooltip if bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        const tooltip = new bootstrap.Tooltip(copyBtn, {
            title: 'Copied!',
            trigger: 'manual'
        });
    
        if (copyBtn && emailText) {
            copyBtn.addEventListener('click', function() {
                navigator.clipboard.writeText(emailText.innerText).then(() => {
                    tooltip.show();
                    setTimeout(() => tooltip.hide(), 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });
        }
    }

});
