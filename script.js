document.addEventListener('DOMContentLoaded', () => {

    // --- Typed.js Animation ---
    if (document.getElementById('typed-text')) {
        var options = {
            strings: ['Web Developer', 'AI/ML Enthusiast', 'Data Analyst', 'Full Stack Developer'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 2000,
        };
        
        var typed = new Typed('#typed-text', options);
    }

    // --- Active navigation link highlighting on scroll ---
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('header nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') == `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // --- Fade-in effect on scroll ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    },
    appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    
    // --- NEW: Contact Form Submission ---
    const form = document.getElementById('contact-form');
    const result = document.getElementById('form-result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Sending..."

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.style.color = "var(--primary-color)";
                    result.innerHTML = "Message sent successfully!";
                } else {
                    console.log(response);
                    result.style.color = "var(--primary-variant)";
                    result.innerHTML = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                result.style.color = "var(--primary-variant)";
                result.innerHTML = "Something went wrong!";
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    result.innerHTML = "";
                }, 5000); // Clear message after 5 seconds
            });
    });
});