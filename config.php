<?php
// Veritabanı bağlantı ayarları
$host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'portfolio_db';

// MySQLi bağlantısı oluştur
$conn = new mysqli($host, $db_user, $db_password, $db_name);

// Bağlantı kontrolü
if ($conn->connect_error) {
    die("Veritabanı bağlantısı başarısız: " . $conn->connect_error);
}

// UTF-8 karakterleri için
$conn->set_charset("utf8");

// CORS başlıkları
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');
?>
