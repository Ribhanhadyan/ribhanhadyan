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
    certificateModal.addEventListener('show.bs.modal', function (event) {
        const card = event.relatedTarget;
        const imgSrc = card.getAttribute('data-img-src');
        modalImage.src = imgSrc;
    });

    // --- Bootstrap Tooltips for Social Icons ---
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // --- Particles.js Configuration ---
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#0a84ff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });

    // --- Driver.js Guided Tour ---
    const tourButton = document.getElementById('tour-button');

    const driver = driverObj.driver({
        showProgress: true,
        animate: true,
        steps: [
            { 
                element: '#tour-step-1', 
                popover: { 
                    title: 'Welcome to My Digital Space!', 
                    description: "Hi! I'm Ribhan Hadiyan, a data scientist and mathematician. Let me quickly show you around.", 
                    side: "bottom", 
                    align: 'start' 
                } 
            },
            { 
                element: '#tour-step-2', 
                popover: { 
                    title: 'About Me', 
                    description: "Here's a bit about my professional journey and the core principles that drive my work in data.", 
                    side: "bottom", 
                    align: 'start' 
                } 
            },
            { 
                element: '#tour-step-3', 
                popover: { 
                    title: 'My Skillset', 
                    description: "These are the primary tools and technologies I use to transform data into insights and solutions.", 
                    side: "left", 
                    align: 'start' 
                } 
            },
            { 
                element: '#tour-step-4', 
                popover: { 
                    title: 'Featured Projects', 
                    description: "This is a curated collection of my work. Feel free to explore the code and see what I've built.", 
                    side: "bottom", 
                    align: 'start' 
                } 
            },
            { 
                element: '#tour-step-5', 
                popover: { 
                    title: 'Let\'s Connect!', 
                    description: "If you're interested in my work or have an opportunity in mind, this is the best way to get in touch. Thanks for visiting!", 
                    side: "top", 
                    align: 'start' 
                } 
            }
        ]
    });

    tourButton.addEventListener('click', () => {
        driver.drive();
    });

});
