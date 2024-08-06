const options = document.querySelectorAll('.option');

options.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(otherOption => {
      otherOption.classList.remove('selected', 'correct');
    });

    option.classList.add('selected');

    if (parseInt(option.textContent) === 10000) {
      option.classList.remove('selected');
      option.classList.add('correct');
    }
  });
});
