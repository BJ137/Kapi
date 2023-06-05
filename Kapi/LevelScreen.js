
const level1Button = document.getElementById('level-1-button');
const level2Button = document.getElementById('level-2-button');
const level3Button = document.getElementById('level-3-button');
const level4Button = document.getElementById('level-4-button');
const home = document.getElementById('home');

level1Button.addEventListener('click', () => {
  window.location.href = 'Level1.html';
});

level2Button.addEventListener('click', () => {
  window.location.href = 'Level2.html';
});

level3Button.addEventListener('click', () => {
  window.location.href = 'Level3.html';
});

level4Button.addEventListener('click', () => {
  window.location.href = 'Level4.html';
});

home.addEventListener('click', () => {
  window.location.href = 'Start.html';
});

