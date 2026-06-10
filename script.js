// ============================================
// AUTHENTICATION CHECK
// ============================================

function initializeAuthState() {
    const currentUser = window.currentUser;
    const loginSection = document.getElementById('login');
    
    // PORTFOLYO MANTIĞI: Ziyaretçilerin navbar'ı, temayı ve sepeti 
    // görebilmesi için buradaki gizleme (display: none) kodlarını kaldırdık.
    
    if (currentUser) {
        // Kullanıcı zaten giriş yaptıysa login sayfasını arka planda gizle
        if (loginSection) loginSection.style.display = 'none';
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// THEME TOGGLE
// ============================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    htmlElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
    if(themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = htmlElement.classList.toggle('dark-mode');
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// ============================================
// MOBILE MENU
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMobile.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-mobile a').forEach(link => {
        link.addEventListener('click', () => {
            navMobile.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ============================================
// SERVICES DATA
// ============================================

const servicesData = [
    {
        id: 1,
        name: "Eğitim Videosu",
        description: "LUMI ve Canva ile etkileşimli eğitim videoları",
        price: 1500,
        category: "Design",
        icon: "fa-video",
        videos: ["video1.mp4", "video2.mp4", "video3.mp4"]
    },
    {
        id: 2,
        name: "Canva Tasarımı",
        description: "Profesyonel Canva tasarımları ve animasyonlar",
        price: 2000,
        category: "Design",
        icon: "fa-palette",
        videos: ["video4.mp4"]
    }
];

let allServices = servicesData;
let filteredServices = servicesData;

// ============================================
// LOAD SERVICES
// ============================================

function loadServices() {
    renderServices();
}

function renderServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = '';

    filteredServices.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        let videosHTML = '';
        if (service.videos && service.videos.length > 0) {
            videosHTML = service.videos.map(video => `
                <video width="100%" height="auto" controls style="margin-bottom: 1rem; border-radius: 0.5rem;">
                    <source src="${video}" type="video/mp4">
                    Tarayıcınız video oynatmayı desteklemiyor.
                </video>
            `).join('');
        }
        
        const isFavorited = JSON.parse(localStorage.getItem('favorites') || '[]').includes(service.id);
        const isInCart = JSON.parse(localStorage.getItem('cart') || '[]').includes(service.id);
        
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="service-price">₺${service.price}</div>
            <div class="service-videos">
                ${videosHTML}
            </div>
            <div class="service-buttons">
                <button class="btn btn-favorite ${isFavorited ? 'active' : ''}" onclick="toggleFavorite(${service.id})" title="Favorilere ekle">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="btn btn-cart ${isInCart ? 'active' : ''}" onclick="toggleCart(${service.id})" title="Sepete ekle">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        `;
        servicesGrid.appendChild(serviceCard);
    });

    updateBadges();
}

// ============================================
// SEARCH & FILTER
// ============================================

let searchInput = null;
let sortSelect = null;
let filterButtons = [];

function initializeSearchFilters() {
    searchInput = document.getElementById('searchInput');
    sortSelect = document.getElementById('sortSelect');
    filterButtons = document.querySelectorAll('.filter-btn');

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', applySorting);
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilters();
        });
    });
}

function applyFilters() {
    const searchTerm = searchInput ? searchInput.value.toLocaleLowerCase('tr-TR') : '';
    const activeFilter = document.querySelector('.filter-btn.active');
    const filterValue = activeFilter ? activeFilter.dataset.filter : 'all';

    filteredServices = allServices.filter(service => {
        const nameTR = service.name.toLocaleLowerCase('tr-TR');
        const descTR = service.description.toLocaleLowerCase('tr-TR');
        
        const matchesSearch = nameTR.includes(searchTerm) || descTR.includes(searchTerm);
        const matchesFilter = filterValue === 'all' || service.category === filterValue;
        return matchesSearch && matchesFilter;
    });

    applySorting();
}

function applySorting() {
    const sortValue = sortSelect ? sortSelect.value : 'default';

    switch(sortValue) {
        case 'price-asc':
            filteredServices.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredServices.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredServices.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
            break;
        case 'name-desc':
            filteredServices.sort((a, b) => b.name.localeCompare(a.name, 'tr'));
            break;
        default:
            break;
    }

    renderServices();
}

// ============================================
// FAVORITES & CART
// ============================================

function toggleFavorite(serviceId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(serviceId);

    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(serviceId);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateBadges();
    renderServices();
    if (document.getElementById('favorites').style.display === 'block') {
        renderFavoritesPage();
    }
}

function removeFavorite(serviceId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter(id => id !== serviceId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateBadges();
    renderFavoritesPage();
    renderServices();
}

function toggleCart(serviceId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = cart.indexOf(serviceId);

    if (index > -1) {
        cart.splice(index, 1);
    } else {
        cart.push(serviceId);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadges();
    renderServices();
    if (document.getElementById('cart').style.display === 'block') {
        renderCartPage();
    }
}

function removeCart(serviceId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(id => id !== serviceId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadges();
    renderCartPage();
    renderServices();
}

// ÇÖZÜLEN KISIM: Rozetleri (Badge) silmek yerine sadece görünürlüğünü aç/kapat yapıyoruz.
function updateBadges() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const favoritesBadge = document.getElementById('favoritesBadge');
    if (favoritesBadge) {
        if (favorites.length > 0) {
            favoritesBadge.textContent = favorites.length;
            favoritesBadge.style.display = 'inline-block';
        } else {
            favoritesBadge.style.display = 'none';
        }
    }

    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        if (cart.length > 0) {
            cartBadge.textContent = cart.length;
            cartBadge.style.display = 'inline-block';
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

// ============================================
// SECTION MANAGEMENT
// ============================================

function hideAllSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

function showHome() {
    hideAllSections();
    const homeSection = document.getElementById('home');
    const aboutSection = document.getElementById('about');
    const servicesSection = document.getElementById('services');
    const projectsSection = document.getElementById('projects');
    const contactSection = document.getElementById('contact');
    
    if (homeSection) homeSection.style.display = 'block';
    if (aboutSection) aboutSection.style.display = 'block';
    if (servicesSection) servicesSection.style.display = 'block';
    if (projectsSection) projectsSection.style.display = 'block';
    if (contactSection) contactSection.style.display = 'block';
    
    closeWeatherWidget();
}

function showAbout() {
    hideAllSections();
    const aboutSection = document.getElementById('about');
    if (aboutSection) aboutSection.style.display = 'block';
}

function showServices() {
    hideAllSections();
    const servicesSection = document.getElementById('services');
    if (servicesSection) servicesSection.style.display = 'block';
}

function showProjects() {
    hideAllSections();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) projectsSection.style.display = 'block';
}

function showContact() {
    hideAllSections();
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.style.display = 'block';
}

function showLogin() {
    hideAllSections();
    const loginSection = document.getElementById('login');
    if (loginSection) loginSection.style.display = 'block';
}

function showRegister() {
    hideAllSections();
    const registerSection = document.getElementById('register');
    if (registerSection) registerSection.style.display = 'block';
}

function showFavorites() {
    hideAllSections();
    const favoritesSection = document.getElementById('favorites');
    if (favoritesSection) {
        favoritesSection.style.display = 'block';
        renderFavoritesPage();
    }
}

function showCart() {
    hideAllSections();
    const cartSection = document.getElementById('cart');
    if (cartSection) {
        cartSection.style.display = 'block';
        renderCartPage();
    }
}

// ============================================
// FAVORITES PAGE
// ============================================

function renderFavoritesPage() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesList = document.getElementById('favoritesList');
    
    if (!favoritesList) return;
    
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p style="text-align: center; padding: 2rem;">Favorileriniz boş</p>';
        return;
    }

    favorites.forEach(id => {
        const service = allServices.find(s => s.id === id);
        if (service) {
            const item = document.createElement('div');
            item.className = 'favorite-item';
            item.innerHTML = `
                <div class="item-info">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <div class="item-price">₺${service.price}</div>
                </div>
                <button class="btn btn-remove" onclick="removeFavorite(${service.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            favoritesList.appendChild(item);
        }
    });
}

// ============================================
// CART PAGE
// ============================================

function renderCartPage() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartList = document.getElementById('cartList');
    const totalPrice = document.getElementById('totalPrice');
    
    if (!cartList || !totalPrice) return;
    
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<p style="text-align: center; padding: 2rem;">Sepetiniz boş</p>';
        totalPrice.textContent = '₺0';
        return;
    }

    let total = 0;
    cart.forEach(id => {
        const service = allServices.find(s => s.id === id);
        if (service) {
            total += service.price;
            const item = document.createElement('div');
            item.className = 'cart-item';
            item.innerHTML = `
                <div class="item-info">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <div class="item-price">₺${service.price}</div>
                </div>
                <button class="btn btn-remove" onclick="removeCart(${service.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartList.appendChild(item);
        }
    });

    totalPrice.textContent = '₺' + total;
}

// ============================================
// WEATHER WIDGET
// ============================================

const weatherBtn = document.getElementById('weatherBtn');
const weatherWidget = document.getElementById('weatherWidget');

if (weatherBtn) {
    weatherBtn.addEventListener('click', async () => {
        if (weatherWidget && weatherWidget.style.display === 'none') {
            await fetchWeather();
            weatherWidget.style.display = 'block';
        } else if (weatherWidget) {
            closeWeatherWidget();
        }
    });
}

async function fetchWeather() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.0082&longitude=28.9784&current=temperature_2m,weather_code&timezone=Europe/Istanbul');
        const data = await response.json();
        const current = data.current;

        const weatherContent = document.getElementById('weatherContent');
        if (weatherContent) {
            const weatherEmoji = getWeatherEmoji(current.weather_code);
            weatherContent.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${weatherEmoji}</div>
                    <div style="font-size: 1.5rem; font-weight: bold;">${current.temperature_2m}°C</div>
                    <div style="font-size: 0.9rem; color: #666;">İstanbul</div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Hava durumu alınamadı:', error);
        const weatherContent = document.getElementById('weatherContent');
        if (weatherContent) {
            weatherContent.innerHTML = '<p>Hava durumu alınamadı</p>';
        }
    }
}

function getWeatherEmoji(code) {
    if (code === 0) return '☀️';
    if (code === 1 || code === 2) return '🌤️';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code === 51 || code === 53 || code === 55) return '🌧️';
    if (code === 61 || code === 63 || code === 65) return '🌧️';
    if (code === 71 || code === 73 || code === 75) return '❄️';
    if (code === 80 || code === 81 || code === 82) return '🌧️';
    if (code === 85 || code === 86) return '❄️';
    if (code === 95 || code === 96 || code === 99) return '⛈️';
    return '🌤️';
}

function closeWeatherWidget() {
    if (weatherWidget) {
        weatherWidget.style.display = 'none';
    }
}

// ============================================
// LOGIN BUTTON
// ============================================

const loginBtn = document.getElementById('loginBtn');

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        const currentUser = window.currentUser;
        if (currentUser) {
            window.location.href = 'index.php?logout=1';
        } else {
            showLogin();
        }
    });
}

// ============================================
// CONTACT FORM
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        
        fetch('https://formspree.io/xbdpkbwg', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                showNotification('Mesajınız başarıyla gönderildi!', 'success');
                contactForm.reset();
            }
        }).catch(error => {
            showNotification('Mesaj gönderilemedi', 'error');
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

function initAll() {
    initializeAuthState(); 
    initializeSearchFilters();
    loadServices();
    
    // Ziyaretçi giriş yapsın ya da yapmasın, site açıldığında her zaman Anasayfa görünsün
    showHome();
    
    // Session mesajlarını göster
    const successMsg = document.body.getAttribute('data-success');
    const errorMsg = document.body.getAttribute('data-error');
    
    if (successMsg) {
        showNotification(successMsg, 'success');
    }
    if (errorMsg) {
        showNotification(errorMsg, 'error');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}