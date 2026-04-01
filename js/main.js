// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// Observe about content
document.querySelectorAll('.about-content p').forEach(p => {
    observer.observe(p);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[onclick^="scrollToSection"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

// Add scroll event for nav background
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 10, 26, 0.95)';
    } else {
        nav.style.background = 'rgba(15, 10, 26, 0.8)';
    }
});
