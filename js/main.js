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


// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const messageDiv = document.getElementById('form-message');
        
        // Show loading message
        messageDiv.textContent = 'Mesajınız gönderiliyor...';
        messageDiv.className = 'form-message loading';
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                messageDiv.textContent = '✅ Mesajınız başarıyla gönderildi! Teşekkürler.';
                messageDiv.className = 'form-message success';
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    messageDiv.textContent = '';
                    messageDiv.className = 'form-message';
                }, 5000);
            } else {
                throw new Error('Form gönderilemedi');
            }
        })
        .catch(error => {
            messageDiv.textContent = '❌ Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
            messageDiv.className = 'form-message error';
            console.error('Error:', error);
        });
    });
}
