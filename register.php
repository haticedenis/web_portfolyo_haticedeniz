<?php
session_start();

$host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'portfolio_db';

$conn = mysqli_connect($host, $db_user, $db_password, $db_name);

if (!$conn) {
    $_SESSION['error'] = 'Veritabanı bağlantısı başarısız';
    header('Location: index.php');
    exit;
}

mysqli_set_charset($conn, "utf8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $confirmPassword = isset($_POST['confirmPassword']) ? $_POST['confirmPassword'] : '';

    // Validasyon
    if (empty($name) || empty($email) || empty($password) || empty($confirmPassword)) {
        $_SESSION['error'] = 'Tüm alanlar gereklidir';
        header('Location: index.php');
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = 'Geçerli bir e-mail adresi girin';
        header('Location: index.php');
        exit;
    }

    if ($password !== $confirmPassword) {
        $_SESSION['error'] = 'Parolalar eşleşmiyor';
        header('Location: index.php');
        exit;
    }

    if (strlen($password) < 6) {
        $_SESSION['error'] = 'Parola en az 6 karakter olmalıdır';
        header('Location: index.php');
        exit;
    }

    // E-mail kontrolü
    $check_query = "SELECT id FROM users WHERE email = '" . mysqli_real_escape_string($conn, $email) . "'";
    $check_result = mysqli_query($conn, $check_query);

    if (mysqli_num_rows($check_result) > 0) {
        $_SESSION['error'] = 'Bu e-mail zaten kayıtlı';
        header('Location: index.php');
        exit;
    }

    // Parolayı şifrele
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Veritabanına ekle
    $insert_query = "INSERT INTO users (name, email, password) VALUES (
        '" . mysqli_real_escape_string($conn, $name) . "',
        '" . mysqli_real_escape_string($conn, $email) . "',
        '" . mysqli_real_escape_string($conn, $hashed_password) . "'
    )";

    if (mysqli_query($conn, $insert_query)) {
        $_SESSION['success'] = 'Kayıt başarılı! Giriş yapabilirsiniz.';
        header('Location: index.php');
    } else {
        $_SESSION['error'] = 'Kayıt sırasında hata oluştu';
        header('Location: index.php');
    }
}

mysqli_close($conn);
?>
