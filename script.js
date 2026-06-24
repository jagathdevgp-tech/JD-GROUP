document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const navLinks = document.querySelectorAll('.nav a');
    const contentArea = document.querySelector('.content');

    // Update active nav link based on scroll position
    contentArea.addEventListener('scroll', () => {
        let current = '';
        slides.forEach(slide => {
            const slideTop = slide.offsetTop;
            const slideHeight = slide.clientHeight;
            // Add a small offset so it triggers slightly before hitting the top
            if (contentArea.scrollTop >= slideTop - slideHeight / 3) {
                current = slide.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSlide = document.getElementById(targetId);
            
            targetSlide.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate elements on scroll into view
    const observerOptions = {
        root: contentArea,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = entry.target.querySelector('.slide-content');
                if (content) {
                    content.style.animation = 'none';
                    content.offsetHeight; /* trigger reflow */
                    content.style.animation = null; 
                }
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        observer.observe(slide);
    });
});
