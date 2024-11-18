<?php
include "db.php";

$id_kategori = $_GET['id_kategori'];

$stmt = $conn->prepare("DELETE FROM kategori WHERE id_kategori=?");
$stmt->bind_param("i", $id_kategori);
$stmt->execute();
$stmt->close();
$conn->close();
?>
