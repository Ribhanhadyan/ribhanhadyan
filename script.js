document.addEventListener("DOMContentLoaded", function() {

    // --- Typed.js for Hero Section ---
    new Typed('#typing-text', {
        strings: ["A Data Scientist", "A Mathematician", "An Operations Research Enthusiast", "A Problem Solver"],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 2000,
        loop: true
    });

    // --- Navbar Styling on Scroll ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // --- Certificate Modal ---
    const certificateModal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    if(certificateModal) {
        certificateModal.addEventListener('show.bs.modal', function (event) {
            const card = event.relatedTarget;
            const imgSrc = card.getAttribute('data-img-src');
            modalImage.src = imgSrc;
        });
    }

    // --- Bootstrap Tooltips for Social Icons ---
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // --- Particles.js Configuration ---
    if(document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"}},"opacity":{"value":0.5,"random":false},"size":{"value":3,"random":true},"line_linked":{"enable":true,"distance":150,"color":"#0a84ff","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false}},
            "interactivity": {"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":140,"line_linked":{"opacity":1}},"push":{"particles_nb":4}}},
            "retina_detect": true
        });
    }

    // --- Animate elements on scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

});
