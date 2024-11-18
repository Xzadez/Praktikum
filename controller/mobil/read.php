<?php
include "../db.php";

$id_mobil = $_GET['id_mobil'] ?? null;

if ($id_mobil) {
    $stmt = $conn->prepare("SELECT * FROM mobil WHERE id_mobil=?");
    $stmt->bind_param("i", $id_mobil);
    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_assoc());
} else {
    $result = $conn->query("SELECT * FROM mobil");
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$conn->close();
?>
