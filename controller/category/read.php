<?php
include "../db.php";

$id_kategori = $_GET['id_kategori'] ?? null;

if ($id_kategori) {
    $stmt = $conn->prepare("SELECT * FROM kategori WHERE id_kategori=?");
    $stmt->bind_param("i", $id_kategori);
    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_assoc());
} else {
    $result = $conn->query("SELECT * FROM kategori");
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$conn->close();
?>
