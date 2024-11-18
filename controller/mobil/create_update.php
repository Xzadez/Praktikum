<?php
include "../db.php";

$id_mobil = $_POST['id_mobil'] ?? null;
$title = $_POST['title'];
$subtitle = $_POST['subtitle'];
$harga = $_POST['harga'];
$img = $_POST['img'] ?? null;
$id_kategori = $_POST['id_kategori'];

if ($id_mobil) {
    $stmt = $conn->prepare("UPDATE mobil SET title=?, subtitle=?, harga=?, img=?, id_kategori=? WHERE id_mobil=?");
    $stmt->bind_param("ssisi", $title, $subtitle, $harga, $img, $id_kategori);
} else {
    $stmt = $conn->prepare("INSERT INTO mobil (title, subtitle, harga, img, id_kategori) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssisi", $title, $subtitle, $harga, $img, $id_kategori);
}

$stmt->execute();
$stmt->close();
$conn->close();
?>
