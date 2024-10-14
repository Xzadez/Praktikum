const display = document.querySelector('input[name="display"]');
const buttons = document.querySelectorAll('input[type="button"]');

// Menyimpan ekspresi matematika yang akan dieksekusi
let currentExpression = '';

// Fungsi untuk memperbarui tampilan kalkulator
function updateDisplay(value) {
  display.value = value;
}

// Looping setiap tombol untuk menambahkan event listener
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.value;

    // Jika tombol AC ditekan, reset kalkulator
    if (value === 'AC') {
      currentExpression = '';
      updateDisplay('');
    }
    // Jika tombol DE ditekan, hapus karakter terakhir
    else if (value === 'DE') {
      currentExpression = currentExpression.slice(0, -1);
      updateDisplay(currentExpression);
    }
    // Jika tombol sama dengan ditekan, eksekusi ekspresi
    else if (value === '=') {
      try {
        currentExpression = eval(currentExpression).toString();
        updateDisplay(currentExpression);
      } catch (error) {
        updateDisplay('Error');
        currentExpression = '';
      }
    }
    // Tambahkan angka atau operator ke ekspresi
    else {
      currentExpression += value;
      updateDisplay(currentExpression);
    }
  });
});