const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const page = link.getAttribute('data-page');
        goToPage(page);
    });
});

// Page Navigation
function goToPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageName + '-page');
    if (selectedPage) {
        selectedPage.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Set home page as default
window.addEventListener('load', () => {
    goToPage('home');
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

// Smooth animations on scroll (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});
