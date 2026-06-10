<?php
session_start();

$host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'portfolio_db';

$conn = mysqli_connect($host, $db_user, $db_password, $db_name);

if (!$conn) {
    die('Veritabanı bağlantısı başarısız');
}

mysqli_set_charset($conn, "utf8");

// Giriş yapan kullanıcı
$current_user = isset($_SESSION['user']) ? $_SESSION['user'] : null;

// Çıkış işlemi
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Session mesajları
$success_msg = isset($_SESSION['success']) ? $_SESSION['success'] : '';
$error_msg = isset($_SESSION['error']) ? $_SESSION['error'] : '';
unset($_SESSION['success']);
unset($_SESSION['error']);
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Modern ve profesyonel portfolyo web sitesi">
    <meta name="theme-color" content="#3b82f6">
    <title>Modern Portfolyo</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body <?php if ($success_msg) echo 'data-success="' . htmlspecialchars($success_msg) . '"'; ?> <?php if ($error_msg) echo 'data-error="' . htmlspecialchars($error_msg) . '"'; ?>>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <a href="index.php">Portfolyö</a>
                </div>
                
                <!-- Desktop Navigation -->
                <nav class="nav-desktop">
                    <a href="#home" onclick="showHome()">Anasayfa</a>
                    <a href="#about" onclick="showAbout()">Hakkımda</a>
                    <a href="#services" onclick="showServices()">Hizmetler</a>
                    <a href="#projects" onclick="showProjects()">Projeler</a>
                    <a href="#contact" onclick="showContact()">İletişim</a>
                </nav>

                <!-- Mobile Menu Button -->
                <button class="menu-toggle" id="menuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <!-- Theme Toggle Button -->
                <button class="theme-toggle" id="themeToggle" aria-label="Tema Değiştir">
                    <i class="fas fa-moon"></i>
                </button>

                <!-- Favorites Button -->
                <button class="header-btn favorites-btn" id="favoritesBtn" aria-label="Favoriler" onclick="showFavorites()">
                    <i class="fas fa-heart"></i>
                    <span class="badge" id="favoritesBadge" style="display: none;"></span>
                </button>

                <!-- Cart Button -->
                <button class="header-btn cart-btn" id="cartBtn" aria-label="Sepet" onclick="showCart()">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="badge" id="cartBadge" style="display: none;"></span>
                </button>

                <!-- Weather Button -->
                <button class="header-btn weather-btn" id="weatherBtn" aria-label="Hava Durumu">
                    <i class="fas fa-cloud-sun"></i>
                </button>

                <!-- Login Button -->
                <button class="header-btn login-btn" id="loginBtn" aria-label="<?php echo $current_user ? 'Çıkış Yap' : 'Giriş Yap'; ?>">
                    <i class="fas <?php echo $current_user ? 'fa-sign-out-alt' : 'fa-user'; ?>"></i>
                </button>
            </div>

            <!-- Mobile Navigation -->
            <nav class="nav-mobile" id="navMobile">
                <a href="#home" onclick="showHome()">Anasayfa</a>
                <a href="#about" onclick="showAbout()">Hakkımda</a>
                <a href="#services" onclick="showServices()">Hizmetler</a>
                <a href="#projects" onclick="showProjects()">Projeler</a>
                <a href="#contact" onclick="showContact()">İletişim</a>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-background"></div>
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">
                    Portfölyö 
                    <span class="gradient-text">Hatice Deniz</span>
                </h1>
                <p class="hero-description">
                    Modern ve Profesyonel Eğitim İçerikleri Tasarımcısı
                </p>
                <div class="scroll-indicator">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <div class="section-header">
                <h2>Hakkımda</h2>
                <div class="header-line"></div>
            </div>
            <div class="about-grid">
                <div class="about-image">
                    <img src="foto.jpeg" alt="Profil Fotoğrafı" class="profile-image">
                    <div class="image-accent"></div>
                </div>
                <div class="about-text">
                    <p>Merhaba!</p>
                    <p>Ben Hatice. Uzaktan eğitim alanında içerik üretiyorum. Ağırlıklı olarak LUMI kullanarak etkileşimli öğrenme materyalleri hazırlıyor, eğitim videolarımı Canva üzerinden tasarlıyorum. Animasyon ve dijital tasarım araçlarına ilgi duyuyor, bu alanda kendimi sürekli geliştiriyorum. Öğrenmeyi sade, anlaşılır ve görsel olarak destekleyen içerikler üretmeyi önemsiyorum.</p>
                    <div class="skills">
                        <h3>Yetenekler</h3>
                        <div class="skills-grid">
                            <span class="skill-tag">CANVA</span>
                            <span class="skill-tag">ADOBE ANİMATE</span>
                            <span class="skill-tag">LUMİ EDUCATİON</span>
                            <span class="skill-tag">VYOND</span>
                            <span class="skill-tag">UI/UX</span>
                            <span class="skill-tag">PHOTOSHOP</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
        <div class="container">
            <div class="section-header">
                <h2>Hizmetlerim</h2>
                <div class="header-line"></div>
            </div>

            <!-- Arama Kutusu -->
            <div class="search-container">
                <input type="text" id="searchInput" class="search-box" placeholder="Hizmet ara..." aria-label="Hizmet ara">
                <i class="fas fa-search search-icon"></i>
            </div>

            <!-- Sıralama Seçeneği -->
            <div class="sort-container">
                <label for="sortSelect">Sırala:</label>
                <select id="sortSelect" class="sort-select">
                    <option value="default">Varsayılan</option>
                    <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                    <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                    <option value="name-asc">İsim: A-Z</option>
                    <option value="name-desc">İsim: Z-A</option>
                </select>
            </div>

            <div class="services-filter">
                <button class="filter-btn active" data-filter="all">Tümü</button>
                <button class="filter-btn" data-filter="Design">Tasarım</button>
            </div>

            <div class="services-grid" id="servicesGrid">
                <!-- Hizmetler JavaScript tarafından yüklenecek -->
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
        <div class="container">
            <div class="section-header">
                <h2>Projelerim</h2>
                <div class="header-line"></div>
            </div>
            <div class="projects-grid">
                <div class="project-card">
                    <div class="project-media">
                        <video width="100%" height="auto" controls style="border-radius: 0.75rem 0.75rem 0 0;">
                            <source src="video1.mp4" type="video/mp4">
                            Tarayıcınız video oynatmayı desteklemiyor.
                        </video>
                    </div>
                    <div class="project-content">
                        <h3>Eğitim Videosu</h3>
                        <p>Ders için Canva kullanarak yaptığım eğitim videosu</p>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-media">
                        <video width="100%" height="auto" controls style="border-radius: 0.75rem 0.75rem 0 0;">
                            <source src="video2.mp4" type="video/mp4">
                            Tarayıcınız video oynatmayı desteklemiyor.
                        </video>
                    </div>
                    <div class="project-content">
                        <h3>Eğitim Videosu</h3>
                        <p>Ders için Canva kullanarak yaptığım eğitim videosu</p>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-media">
                        <video width="100%" height="auto" controls style="border-radius: 0.75rem 0.75rem 0 0;">
                            <source src="video3.mp4" type="video/mp4">
                            Tarayıcınız video oynatmayı desteklemiyor.
                        </video>
                    </div>
                    <div class="project-content">
                        <h3>Eğitim Videosu</h3>
                        <p>Ders için Canva kullanarak yaptığım eğitim videosu</p>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-media">
                        <video width="100%" height="auto" controls style="border-radius: 0.75rem 0.75rem 0 0;">
                            <source src="video4.mp4" type="video/mp4">
                            Tarayıcınız video oynatmayı desteklemiyor.
                        </video>
                    </div>
                    <div class="project-content">
                        <h3>Youtube Video</h3>
                        <p>Çocuklar için hazırladığım eğitici Youtube videosu.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Weather Widget -->
    <div id="weatherWidget" class="weather-widget-floating" style="display: none;">
        <button class="weather-close" onclick="closeWeatherWidget()">&times;</button>
        <div id="weatherContent" class="weather-content">
            <!-- Hava durumu bilgisi buraya gelecek -->
        </div>
    </div>

    <!-- Login Section -->
    <section id="login" class="auth-section" style="display: none;">
        <div class="container">
            <div class="auth-container">
                <div class="auth-card">
                    <h2>Giriş Yap</h2>
                    <form id="loginForm" class="auth-form" method="POST" action="login.php">
                        <div class="form-group">
                            <label for="loginEmail">E-mail</label>
                            <input type="email" id="loginEmail" name="email" placeholder="E-mail adresiniz" required>
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">Parola</label>
                            <input type="password" id="loginPassword" name="password" placeholder="Parolanız" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Giriş Yap</button>
                    </form>
                    <p class="auth-link">Hesabın yok mu? <a href="#" onclick="showRegister()">Kaydol</a></p>
                </div>
            </div>
        </div>
    </section>

    <!-- Register Section -->
    <section id="register" class="auth-section" style="display: none;">
        <div class="container">
            <div class="auth-container">
                <div class="auth-card">
                    <h2>Kaydol</h2>
                    <form id="registerForm" class="auth-form" method="POST" action="register.php">
                        <div class="form-group">
                            <label for="registerName">Adınız</label>
                            <input type="text" id="registerName" name="name" placeholder="Adınız" required>
                        </div>
                        <div class="form-group">
                            <label for="registerEmail">E-mail</label>
                            <input type="email" id="registerEmail" name="email" placeholder="E-mail adresiniz" required>
                        </div>
                        <div class="form-group">
                            <label for="registerPassword">Parola</label>
                            <input type="password" id="registerPassword" name="password" placeholder="Parolanız" required>
                        </div>
                        <div class="form-group">
                            <label for="registerConfirmPassword">Parola Tekrarı</label>
                            <input type="password" id="registerConfirmPassword" name="confirmPassword" placeholder="Parolanız tekrarın" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Kaydol</button>
                    </form>
                    <p class="auth-link">Zaten hesabın var mı? <a href="#" onclick="showLogin()">Giriş Yap</a></p>
                </div>
            </div>
        </div>
    </section>

    <!-- Favorites Section -->
    <section id="favorites" class="favorites" style="display: none;">
        <div class="container">
            <div class="section-header">
                <h2>Favorilerim</h2>
                <div class="header-line"></div>
            </div>
            <div id="favoritesList" class="items-list">
                <!-- Favoriler buraya gelecek -->
            </div>
        </div>
    </section>

    <!-- Cart Section -->
    <section id="cart" class="cart" style="display: none;">
        <div class="container">
            <div class="section-header">
                <h2>Sepetim</h2>
                <div class="header-line"></div>
            </div>
            <div id="cartList" class="items-list">
                <!-- Sepet ürünleri buraya gelecek -->
            </div>
            <div class="cart-summary">
                <div class="summary-item">
                    <span>Toplam Fiyat:</span>
                    <span id="totalPrice">₺0</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <div class="contact-wrapper">
                <div class="section-header center">
                    <h2>Benimle İletişime Geç</h2>
                    <p>Sorularınız veya işbirliği teklifleri için lütfen bana ulaşın.</p>
                </div>
                <form class="contact-form" action="https://formspree.io/xbdpkbwg" method="POST" id="contactForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Adınız</label>
                            <input type="text" id="name" name="name" placeholder="Adınızı girin" required>
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail Adresiniz</label>
                            <input type="email" id="email" name="email" placeholder="email@example.com" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="message">Mesajınız</label>
                        <textarea id="message" name="message" placeholder="Mesajınızı yazın..." rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Mesaj Gönder</button>
                </form>
                <div class="social-links">
                    <p>Sosyal medyada beni takip edin</p>
                    <div class="social-icons">
                        <a href="mailto:hello@example.com" title="Email">
                            <i class="fas fa-envelope"></i>
                        </a>
                        <a href="#" title="LinkedIn">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#" title="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="#" title="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h3>Portfolio</h3>
                    <p>Modern ve responsive web tasarımı ile profesyonel çözümler sunuyorum.</p>
                </div>
                <div class="footer-col">
                    <h4>Hızlı Linkler</h4>
                    <ul>
                        <li><a href="#home" onclick="showHome()">Anasayfa</a></li>
                        <li><a href="#about" onclick="showAbout()">Hakkımda</a></li>
                        <li><a href="#projects" onclick="showProjects()">Projeler</a></li>
                        <li><a href="#contact" onclick="showContact()">İletişim</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>İletişim</h4>
                    <ul>
                        <li><a href="mailto:hello@example.com">hello@example.com</a></li>
                        <li><a href="tel:+905551234567">+90 555 123 45 67</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Portfolio. Tüm hakları saklıdır.</p>
                <div class="footer-links">
                    <a href="#">Gizlilik Politikası</a>
                    <a href="#">Kullanım Şartları</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        const currentUser = <?php echo $current_user ? json_encode($current_user) : 'null'; ?>;
    </script>
    <script src="script.js"></script>
</body>
</html>
