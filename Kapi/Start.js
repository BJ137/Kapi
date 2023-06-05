const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
  window.location.href = 'LevelScreen.html';
});

window.onload = function() {
  var title = document.getElementById("title");
  title.style.opacity = 1;
}

