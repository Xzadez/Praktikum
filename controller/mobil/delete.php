<?php
include "../db.php";

$id_mobil = $_GET['id_mobil'];

$stmt = $conn->prepare("DELETE FROM mobil WHERE id_mobil=?");
$stmt->bind_param("i", $id_mobil);
$stmt->execute();
$stmt->close();
$conn->close();
?>
