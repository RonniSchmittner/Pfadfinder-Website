// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.getElementsByTagName('a');
for (let link of mobileLinks) {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
}

// Modal functionality
document.getElementById('impressum-link').onclick = function() {
    document.getElementById('impressum-modal').classList.remove('hidden');
};

document.getElementById('close-impressum').onclick = function() {
    document.getElementById('impressum-modal').classList.add('hidden');
};

document.getElementById('impressum-modal').onclick = function(e) {
    if (e.target === this) {
        this.classList.add('hidden');
    }
};

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => img.classList.add('loaded'));
    }
});

// Section visibility animation
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// Smooth scroll for anchor links
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

// Parallax effect
document.addEventListener('scroll', function() {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    parallaxBgs.forEach(bg => {
        const container = bg.parentElement;
        const rect = container.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate how far the container is from the top of the viewport
        const containerTop = rect.top + scrollTop;
        const containerBottom = containerTop + rect.height;
        
        // Only apply effect when container is in or near viewport
        if (containerBottom > scrollTop && containerTop < scrollTop + window.innerHeight) {
            const speed = 0.2; // Reduced speed for smoother effect
            const yPos = (scrollTop - containerTop) * speed;
            bg.style.backgroundPosition = `center ${yPos}px`;
        }
    });
}); 