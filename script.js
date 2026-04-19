// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        once: true,
        offset: 100,
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Lower inc to slow and higher to fast
                const inc = target / speed;

                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + "+";
                }
            };
            
            // Trigger when element is in viewport
            let observer = new IntersectionObserver(function(entries) {
                if(entries[0].isIntersecting === true) {
                    updateCount();
                    observer.disconnect();
                }
            }, { threshold: [0.5] });
            
            observer.observe(counter);
        });
    }
    
    animateCounters();
    
    // Mobile navigation toggle (simple version)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            if(navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '5%';
                navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.borderRadius = '15px';
                navLinks.style.border = '1px solid var(--glass-border)';
                navLinks.style.boxShadow = 'var(--glass-shadow)';
                navLinks.style.width = '200px';
                navLinks.style.backdropFilter = 'blur(10px)';
            }
        });
    }

});
