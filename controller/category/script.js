document.addEventListener("DOMContentLoaded", function () {
    const kategoriForm = document.getElementById("kategoriForm");
    const kategoriTable = document.getElementById("kategoriTable");
    const kategoriSubmitButton = kategoriForm.querySelector("button[type='submit']");

    // Fetch semua kategori dan render ke tabel
    function fetchKategori() {
        fetch("read.php")
            .then(response => response.json())
            .then(data => {
                kategoriTable.innerHTML = "";
                data.forEach(kategori => {
                    kategoriTable.innerHTML += `
                        <tr>
                            <td>${kategori.id_kategori}</td>
                            <td>${kategori.nama}</td>
                            <td><img src="${kategori.img}" alt="${kategori.nama}" style="width: 50px;"></td>
                            <td>
                                <button class="edit" onclick="editKategori(${kategori.id_kategori})">Edit</button>
                                <button class="delete" onclick="deleteKategori(${kategori.id_kategori})">Hapus</button>
                            </td>
                        </tr>
                    `;
                });
            });
    }

    // Fungsi untuk submit form kategori (insert/update)
    kategoriForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(kategoriForm);

        fetch("create_update.php", {
            method: "POST",
            body: formData
        }).then(response => response.text())
          .then(() => {
            kategoriForm.reset();
            fetchKategori();
        });
    });

    // Fungsi untuk mengisi form dengan data kategori untuk update
    window.editKategori = function (id_kategori) {
        fetch(`create_update.php?id_kategori=${id_kategori}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("id_kategori").value = data.id_kategori;
                document.getElementById("nama").value = data.nama;
                document.getElementById("img").value = data.img;
                kategoriSubmitButton.textContent = "Update Kategori";
            });
    };

    // Fungsi untuk menghapus kategori
    window.deleteKategori = function (id) {
        fetch(`delete.php?id_kategori=${id}`)
            .then(response => response.text())
            .then(() => fetchKategori());

            console.log(id);
    };

    // Panggil fetchKategori() saat halaman dimuat
    fetchKategori();
});
