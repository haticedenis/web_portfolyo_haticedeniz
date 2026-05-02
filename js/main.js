/**
 * Modern Portfolyo - JavaScript
 * Responsive Navigation, Form Handling, Dark/Light Mode
 */

// ============================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ============================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save theme preference
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const mobileNavLinks = navMobile.querySelectorAll('a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
    }
});

// ============================================
// NAVIGATION WITHOUT SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            // Instant scroll without smooth behavior
            window.scrollTo({
                top: targetPosition,
                behavior: 'auto'
            });
        }
    });
});

// ============================================
// CONTACT FORM HANDLING WITH FORMSPREE
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!name || !email || !message) {
        showNotification('Lütfen tüm alanları doldurunuz.', 'error');
        return;
    }
    
    // Validate email
    if (!isValidEmail(email)) {
        showNotification('Lütfen geçerli bir e-mail adresi girin.', 'error');
        return;
    }
    
    try {
        // Send form data to Formspree
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success message
            showNotification('Formunuz gönderildi! Teşekkür ederiz.', 'success');
            
            // Reset form
            contactForm.reset();
            
            console.log('Form submitted successfully:', { name, email, message });
        } else {
            showNotification('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('Bağlantı hatası. Lütfen tekrar deneyin.', 'error');
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 1rem;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        z-index: 1000;
        animation: slideInFromTop 0.3s ease-out;
        max-width: 400px;
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#3b82f6';
        notification.style.color = 'white';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutToLeft 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards and other elements
document.querySelectorAll('.project-card, .skill-tag').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        if (body.classList.contains('dark-mode')) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-desktop a, .nav-mobile a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = '#3b82f6';
        } else {
            link.style.color = '';
        }
    });
});

// ============================================
// BUTTON INTERACTIONS
// ============================================

const buttons = document.querySelectorAll('.btn, .cta-button, .link-btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// FORM INPUT FOCUS EFFECTS
// ============================================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// ============================================
// PROJECT CARD HOVER EFFECTS
// ============================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
    }
});

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================

// Add ARIA labels
document.querySelectorAll('button').forEach(button => {
    if (!button.getAttribute('aria-label')) {
        button.setAttribute('aria-label', button.textContent.trim());
    }
});

// Ensure all interactive elements are keyboard accessible
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    if (!element.getAttribute('tabindex') && element.tagName !== 'BUTTON' && element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA') {
        element.setAttribute('tabindex', '0');
    }
});

// ============================================
// SERVICES - JSON DATA LOADING & LOCALSTORAGE
// ============================================

let allServices = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hizmet verileri (gömülü)
const servicesData = {
  "services": [
    {
      "id": 1,
      "name": "Eğitim Videosu 1",
      "description": "LUMI ve Canva kullanarak hazırladığım etkileşimli eğitim videosu",
      "price": 1500,
      "category": "Design",
      "icon": "fa-video",
      "features": ["LUMI", "Canva", "Animasyon"]
    },
    {
      "id": 2,
      "name": "Eğitim Videosu 2",
      "description": "Profesyonel tasarımla oluşturulmuş eğitim içeriği",
      "price": 1500,
      "category": "Design",
      "icon": "fa-video",
      "features": ["LUMI", "Canva", "Animasyon"]
    },
    {
      "id": 3,
      "name": "Eğitim Videosu 3",
      "description": "Dijital tasarım ve animasyon ile zenginleştirilmiş video",
      "price": 1500,
      "category": "Design",
      "icon": "fa-video",
      "features": ["LUMI", "Canva", "Animasyon"]
    }
  ]
};

// Hizmetleri yükle
function loadServices() {
    try {
        allServices = servicesData.services;
        renderServices(allServices);
        setupFilterButtons();
    } catch (error) {
        console.error('Hizmetler yüklenirken hata oluştu:', error);
    }
}

// Hizmetleri ekrana render et
function renderServices(services) {
    const servicesGrid = document.getElementById('servicesGrid');
    servicesGrid.innerHTML = '';
    
    services.forEach(service => {
        const isFavorite = favorites.some(fav => fav.id === service.id);
        const isInCart = cart.some(item => item.id === service.id);
        
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="service-features">
                ${service.features.map(feature => `<span>${feature}</span>`).join('')}
            </div>
            <div class="service-price">₺${service.price.toLocaleString('tr-TR')}</div>
            <div class="service-actions">
                <button class="service-btn add-favorite ${isFavorite ? 'active' : ''}" data-id="${service.id}">
                    <i class="fas fa-heart"></i>
                    <span>${isFavorite ? 'Favorilerde' : 'Favorilere'}</span>
                </button>
                <button class="service-btn add-cart ${isInCart ? 'active' : ''}" data-id="${service.id}">
                    <i class="fas fa-shopping-cart"></i>
                    <span>${isInCart ? 'Sepette' : 'Sepete Ekle'}</span>
                </button>
            </div>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
    
    // Event listeners ekle
    attachServiceEventListeners();
}

// Filter butonlarını ayarla
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            if (filter === 'all') {
                renderServices(allServices);
            } else {
                const filtered = allServices.filter(service => service.category === filter);
                renderServices(filtered);
            }
        });
    });
}

// Hizmet butonlarına event listener ekle
function attachServiceEventListeners() {
    // Favorilere ekle
    document.querySelectorAll('.add-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceId = parseInt(this.dataset.id);
            const service = allServices.find(s => s.id === serviceId);
            
            if (favorites.some(fav => fav.id === serviceId)) {
                favorites = favorites.filter(fav => fav.id !== serviceId);
                showNotification('Favorilerden kaldırıldı', 'info');
            } else {
                favorites.push(service);
                showNotification('Favorilere eklendi!', 'success');
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.classList.toggle('active');
            this.innerHTML = this.classList.contains('active') 
                ? '<i class="fas fa-heart"></i><span>Favorilerde</span>' 
                : '<i class="fas fa-heart"></i><span>Favorilere</span>';
        });
    });
    
    // Sepete ekle
    document.querySelectorAll('.add-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceId = parseInt(this.dataset.id);
            const service = allServices.find(s => s.id === serviceId);
            
            if (cart.some(item => item.id === serviceId)) {
                cart = cart.filter(item => item.id !== serviceId);
                showNotification('Sepetten kaldırıldı', 'info');
            } else {
                cart.push(service);
                showNotification('Sepete eklendi!', 'success');
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            this.classList.toggle('active');
            this.innerHTML = this.classList.contains('active') 
                ? '<i class="fas fa-shopping-cart"></i><span>Sepette</span>' 
                : '<i class="fas fa-shopping-cart"></i><span>Sepete Ekle</span>';
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

console.log('Modern Portfolyo - JavaScript loaded successfully');

// Initialize tooltips if needed
document.querySelectorAll('[title]').forEach(element => {
    element.setAttribute('aria-label', element.getAttribute('title'));
});

// Add loading class to body when page loads
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeIcon();
    }
    
    // Hizmetleri yükle
    loadServices();
});

// Prevent default behavior for placeholder links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});


// ============================================
// FAVORITES & CART PAGE MANAGEMENT
// ============================================

const favoritesBtn = document.getElementById('favoritesBtn');
const cartBtn = document.getElementById('cartBtn');
const favoritesBadge = document.getElementById('favoritesBadge');
const cartBadge = document.getElementById('cartBadge');

// Sayfalar
const homeSection = document.getElementById('home');
const aboutSection = document.getElementById('about');
const servicesSection = document.getElementById('services');
const projectsSection = document.getElementById('projects');
const contactSection = document.getElementById('contact');
const favoritesSection = document.getElementById('favorites');
const cartSection = document.getElementById('cart');

// Tüm sayfaları gizle
function hideAllSections() {
    homeSection.style.display = 'none';
    aboutSection.style.display = 'none';
    servicesSection.style.display = 'none';
    projectsSection.style.display = 'none';
    contactSection.style.display = 'none';
    favoritesSection.style.display = 'none';
    cartSection.style.display = 'none';
}

// Badge'leri güncelle
function updateBadges() {
    favoritesBadge.textContent = favorites.length;
    cartBadge.textContent = cart.length;
}

// Favoriler sayfasını göster
favoritesBtn.addEventListener('click', () => {
    hideAllSections();
    favoritesSection.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'auto' });
    renderFavoritesPage();
});

// Sepet sayfasını göster
cartBtn.addEventListener('click', () => {
    hideAllSections();
    cartSection.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'auto' });
    renderCartPage();
});

// Favoriler sayfasını render et
function renderFavoritesPage() {
    const favoritesList = document.getElementById('favoritesList');
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="empty-message">
                <i class="fas fa-heart"></i>
                <p>Henüz favori eklemediniz</p>
                <a href="#" onclick="showHome()">Hizmetlere Dön</a>
            </div>
        `;
        return;
    }
    
    favoritesList.innerHTML = '';
    favorites.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <div class="item-icon">
                <i class="fas ${item.icon}"></i>
            </div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="item-features">
                ${item.features.map(feature => `<span>${feature}</span>`).join('')}
            </div>
            <div class="item-price">₺${item.price.toLocaleString('tr-TR')}</div>
            <div class="item-actions">
                <button class="item-btn remove" onclick="removeFavorite(${item.id})">
                    <i class="fas fa-trash"></i> Kaldır
                </button>
            </div>
        `;
        favoritesList.appendChild(itemCard);
    });
}

// Sepet sayfasını render et
function renderCartPage() {
    const cartList = document.getElementById('cartList');
    const totalPrice = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        cartList.innerHTML = `
            <div class="empty-message">
                <i class="fas fa-shopping-cart"></i>
                <p>Sepetiniz boş</p>
                <a href="#" onclick="showHome()">Hizmetlere Dön</a>
            </div>
        `;
        totalPrice.textContent = '₺0';
        return;
    }
    
    cartList.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price;
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <div class="item-icon">
                <i class="fas ${item.icon}"></i>
            </div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="item-features">
                ${item.features.map(feature => `<span>${feature}</span>`).join('')}
            </div>
            <div class="item-price">₺${item.price.toLocaleString('tr-TR')}</div>
            <div class="item-actions">
                <button class="item-btn remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i> Kaldır
                </button>
            </div>
        `;
        cartList.appendChild(itemCard);
    });
    
    totalPrice.textContent = '₺' + total.toLocaleString('tr-TR');
}

// Favorilerden kaldır
function removeFavorite(id) {
    favorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateBadges();
    renderFavoritesPage();
    showNotification('Favorilerden kaldırıldı', 'info');
}

// Sepetten kaldır
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadges();
    renderCartPage();
    showNotification('Sepetten kaldırıldı', 'info');
}

// Anasayfaya dön
function showHome() {
    hideAllSections();
    homeSection.style.display = 'block';
    aboutSection.style.display = 'block';
    servicesSection.style.display = 'block';
    projectsSection.style.display = 'block';
    contactSection.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'auto' });
}

// Sayfa yüklenince badge'leri güncelle
window.addEventListener('load', () => {
    updateBadges();
});
