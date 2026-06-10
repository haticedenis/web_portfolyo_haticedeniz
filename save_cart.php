<?php
require_once 'config.php';

// POST isteği kontrolü
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;
    $favorites_items = isset($_POST['favorites']) ? json_decode($_POST['favorites'], true) : [];

    if ($user_id === 0) {
        echo json_encode(['success' => false, 'message' => 'Kullanıcı ID gereklidir']);
        exit;
    }

    // Önce eski favorileri sil
    $delete = $conn->prepare("DELETE FROM favorites WHERE user_id = ?");
    $delete->bind_param("i", $user_id);
    $delete->execute();
    $delete->close();

    // Yeni favorileri ekle
    if (!empty($favorites_items)) {
        $insert = $conn->prepare("INSERT INTO favorites (user_id, service_id) VALUES (?, ?)");

        foreach ($favorites_items as $item) {
            $service_id = intval($item['id']);
            $insert->bind_param("ii", $user_id, $service_id);
            $insert->execute();
        }

        $insert->close();
    }

    echo json_encode(['success' => true, 'message' => 'Favoriler kaydedildi']);
} else {
    echo json_encode(['success' => false, 'message' => 'Geçersiz istek']);
}

$conn->close();
?>
