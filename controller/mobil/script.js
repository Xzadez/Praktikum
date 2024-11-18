document.addEventListener("DOMContentLoaded", function () {
  const mobilForm = document.getElementById("mobilForm");
  const mobilTable = document.getElementById("mobilTable");
  const submitButton = document.getElementById("submitButton");

  function fetchMobil() {
      fetch("read.php")
          .then(response => response.json())
          .then(data => {
              mobilTable.innerHTML = "";
              data.forEach(mobil => {
                  mobilTable.innerHTML += `
                      <tr>
                          <td>${mobil.id_mobil}</td>
                          <td>${mobil.title}</td>
                          <td>${mobil.subtitle}</td>
                          <td>${mobil.harga}</td>
                          <td>${mobil.img}</td>
                          <td>
                              <button class="edit" onclick="editMobil(${mobil.id_mobil})">Edit</button>
                              <button class="delete" onclick="deleteMobil(${mobil.id_mobil})">Hapus</button>
                          </td>
                      </tr>
                  `;
              });
          });
  }

    function fetchKategori() {
        fetch("../category/read.php")
            .then(response => response.json())
            .then(data => {
                const kategoriSelect = document.getElementById("id_kategori");
                kategoriSelect.innerHTML = '<option value="">--Pilih Kategori--</option>';
                data.forEach(kategori => {
                    kategoriSelect.innerHTML += `<option value="${kategori.id_kategori}">${kategori.nama}</option>`;
                });
            });
    }

    document.addEventListener("DOMContentLoaded", function () {
        fetchKategori(); 
    });


    mobilForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const formData = new FormData(mobilForm);
  
        fetch("create_update.php", {
            method: "POST",
            body: formData
        }).then(response => response.text())
          .then(() => {
              mobilForm.reset();
              fetchMobil();
          });
    });

  window.deleteMobil = function (id) {
      fetch(`delete.php?id_mobil=${id}`)
          .then(response => response.text())
          .then(() => fetchMobil());
  };

  window.editMobil = function (id) {
      fetch(`read.php?id_mobil=${id}`)
          .then(response => response.json())
          .then(data => {
              document.getElementById("mobilId").value = data.id_mobil;
              document.getElementById("title").value = data.title;
              document.getElementById("subtitle").value = data.subtitle;
              document.getElementById("harga").value = data.harga;
              document.getElementById("img").value = data.img;
              submitButton.textContent = "Update Mobil";
          });
  };

  fetchMobil();
  fetchKategori();
});


// ================== Get Data ============
document.addEventListener("DOMContentLoaded", function () {
    const featuredContent = document.querySelector(".featured__content");

    // Fungsi untuk mengambil data dari backend
    function fetchFeaturedCars() {
        fetch("/controller/mobil/read.php")
            .then(response => response.json())
            .then(data => {
                featuredContent.innerHTML = ""; // Kosongkan kontainer sebelum render ulang
                data.forEach(car => {
                    const carCard = `
                        <article class="featured__card mix ${car.category}">
                            <div class="shape shape__smaller"></div>
                            <h1 class="featured__title">${car.brand}</h1>
                            <h3 class="featured__subtitle">${car.model}</h3>
                            <img src="${car.image}" alt="${car.model}" class="featured__img">
                            <h3 class="featured__price">${car.price}</h3>
                            <button class="button featured__button">
                                <i class="ri-shopping-bag-2-line"></i>
                            </button>
                        </article>
                    `;
                    featuredContent.innerHTML += carCard;
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    // Panggil fungsi untuk memuat data
    fetchFeaturedCars();
});
