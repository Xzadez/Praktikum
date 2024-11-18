<?php
include "../db.php";

$id_kategori = $_POST['id_kategori'] ?? null;
$nama = $_POST['nama'];
$img = $_POST['img'] ?? null; // URL gambar kategori

if ($id_kategori) {
    $stmt = $conn->prepare("UPDATE kategori SET nama=?, img=? WHERE id_kategori=?");
    $stmt->bind_param("ssi", $nama, $img, $id_kategori);
} else {
    $stmt = $conn->prepare("INSERT INTO kategori (nama, img) VALUES (?, ?)");
    $stmt->bind_param("ss", $nama, $img);
}

$stmt->execute();
$stmt->close();
$conn->close();
?>
