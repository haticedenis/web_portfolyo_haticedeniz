<?php
require_once 'config.php';

// POST isteği kontrolü
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;

    if ($user_id === 0) {
        echo json_encode(['success' => false, 'message' => 'Kullanıcı ID gereklidir']);
        exit;
    }

    // Kullanıcıyı veritabanından ara
    $select = $conn->prepare("SELECT id, name, email FROM users WHERE id = ?");
    $select->bind_param("i", $user_id);
    $select->execute();
    $result = $select->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Kullanıcı bulunamadı']);
        exit;
    }

    $user = $result->fetch_assoc();
    echo json_encode(['success' => true, 'user' => $user]);

    $select->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Geçersiz istek']);
}

$conn->close();
?>
