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
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    // Validasyon
    if (empty($email) || empty($password)) {
        $_SESSION['error'] = 'E-mail ve parola gereklidir';
        header('Location: index.php');
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = 'Geçerli bir e-mail adresi girin';
        header('Location: index.php');
        exit;
    }

    // Kullanıcıyı ara
    $query = "SELECT id, name, email, password FROM users WHERE email = '" . mysqli_real_escape_string($conn, $email) . "'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) === 0) {
        $_SESSION['error'] = 'E-mail veya parola yanlış';
        header('Location: index.php');
        exit;
    }

    $user = mysqli_fetch_assoc($result);

    // Parolayı kontrol et
    if (!password_verify($password, $user['password'])) {
        $_SESSION['error'] = 'E-mail veya parola yanlış';
        header('Location: index.php');
        exit;
    }

    // Başarılı giriş - session'a kaydet
    $_SESSION['user'] = [
        'id' => $user['id'],
        'name' => $user['name'],
        'email' => $user['email']
    ];
    $_SESSION['success'] = 'Hoş geldiniz, ' . $user['name'] . '!';
    
    header('Location: index.php');
}

mysqli_close($conn);
?>
