const display = document.querySelector('input[name="display"]');
const buttons = document.querySelectorAll('input[type="button"]');

let currentExpression = '';

function updateDisplay(value) {
  display.value = value;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.value;

    if (value === 'AC') {
      currentExpression = '';
      updateDisplay('');
    }
    else if (value === 'DE') {
      currentExpression = currentExpression.slice(0, -1);
      updateDisplay(currentExpression);
    }
    else if (value === '=') {
      try {
        currentExpression = eval(currentExpression).toString();
        updateDisplay(currentExpression);
      } catch (error) {
        updateDisplay('Error');
        currentExpression = '';
      }
    }
    else {
      currentExpression += value;
      updateDisplay(currentExpression);
    }
  });
});