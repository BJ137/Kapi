document.addEventListener('DOMContentLoaded', () => {
    const sprite = document.getElementById('sprite');
    const ground = document.getElementById('ground');
    const gameContainer = document.getElementById('game-container');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restartButton');
    const restartScreen = document.getElementById('restartScreen');
    const finalScore = document.getElementById('finalScore');
  
    let isJumping = false;
    let gameOver = false;
    let score = 0;
    let gameSpeed = 3;
    let backgroundPosition = 0;
    let treeInterval;
    let pointInterval;
    let jumpHeight = 500;
    let jumpCount = 0;
    let position = parseInt(getComputedStyle(sprite).getPropertyValue('bottom'));
    let gravity = -0.5;
    let velocity = 0;
    let gameStarted = false;
  
    function jump() {
      if (gameOver) {
        restartGame();
      } else if (!isJumping && gameStarted) {
        isJumping = true;
        jumpCount = 0;
        velocity = -6;
      }
    }
  
    function handleKeydown(event) {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!gameStarted) {
          startGame();
        } else {
          jump();
        }
      }
    }
  
    function startGame() {
      if (!gameStarted) {
        gameStarted = true;
        generateTrees();
        generatePoints();
        update();
      }
    }
  
    function handleKeyup(event) {
      if (event.code === 'Space') {
        isJumping = false;
        jumpCount = 0;
      }
    }
  
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
  
    function update() {
      if (isJumping) {
        if (jumpCount < jumpHeight) {
          position -= -5;
          jumpCount += 5;
          velocity = 7;
        }
      } else {
        velocity += gravity;
        position += velocity;
      }
  
      const groundRect = ground.getBoundingClientRect();
      const maxHeight = groundRect.top - sprite.clientHeight + 20;
      position = Math.min(position, maxHeight);
      position = Math.max(position, 145);
  
      if (position <= 145) {
        gameOver = true;
  
        clearInterval(treeInterval);
        clearInterval(pointInterval);
        scoreElement.style.display = 'none';
        showRestartScreen();
      }
      sprite.style.bottom = position + 'px';
  
      requestAnimationFrame(update);
    }
  
    function generateTree() {
      const treeImages = [
        'Level4images/springtree1.png',
        'Level4images/springtree2.png',
        'Level4images/springtree3.png',
        'Level4images/springtree4.png',

      ];
  
      const treeImage = treeImages[Math.floor(Math.random() * treeImages.length)];
      const tree = document.createElement('img');
      tree.src = treeImage;
      tree.classList.add('tree');
      tree.style.left = gameContainer.clientWidth + 'px';
      tree.style.top = gameContainer.clientHeight - ground.clientHeight - 76 + 'px';
  
      gameContainer.appendChild(tree);
  
      const scrollInterval = setInterval(() => {
        if (gameOver) {
          clearInterval(scrollInterval);
          tree.remove();
          return;
        }
  
        const treeLeft = parseInt(getComputedStyle(tree).getPropertyValue('left'));
        if (treeLeft <= -70) {
          clearInterval(scrollInterval);
          tree.remove();
        } else {
          tree.style.left = treeLeft - gameSpeed + 'px';
        }
      }, 10);
    }
  
    function generateTrees() {
      treeInterval = setInterval(generateTree, 2000);
    }
  
    function generatePoint() {
      const pointImages = [
        'Level1images/kiwi.PNG'
      ];
  
      const pointImage = pointImages[Math.floor(Math.random() * pointImages.length)];
      const point = document.createElement('img');
      point.src = pointImage;
      point.classList.add('point');
      point.style.left = gameContainer.clientWidth + 'px';
      point.style.top = gameContainer.clientHeight - ground.clientHeight - 200 + 'px';
  
      gameContainer.appendChild(point);
  
      const scrollInterval = setInterval(() => {
        if (gameOver) {
          clearInterval(scrollInterval);
          point.remove();
          return;
        }
  
        const pointLeft = parseInt(getComputedStyle(point).getPropertyValue('left'));
        if (pointLeft <= -point.clientWidth) {
          clearInterval(scrollInterval);
          point.remove();
        } else {
          point.style.left = pointLeft - gameSpeed + 'px';
  
          // Check collision with the sprite
          const spriteRect = sprite.getBoundingClientRect();
          const pointRect = point.getBoundingClientRect();
          if (
            spriteRect.left < pointRect.right &&
            spriteRect.right > pointRect.left &&
            spriteRect.top < pointRect.bottom &&
            spriteRect.bottom > pointRect.top
          ) {
            // Collision detected
            point.remove();
            score++; // Increase the score by 1
            updateScore();
          }
        }
      }, 10);
    }
  
    function generatePoints() {
      pointInterval = setInterval(generatePoint, 2000);
    }
  
    function updateBackgroundPosition() {
      backgroundPosition -= gameSpeed;
      gameContainer.style.backgroundPositionX = backgroundPosition + 'px';
      requestAnimationFrame(updateBackgroundPosition);
    }
  
    function handleVisibilityChange() {
      if (document.hidden) {
        clearInterval(treeInterval);
        clearInterval(pointInterval);
      } else if (!gameOver && gameStarted) {
        generateTree();
        generatePoints();
      }
    }
  
    function updateScore() {
      scoreElement.textContent = `Score: ${score}`;
    }
  
    function showRestartScreen() {
      finalScore.textContent = score;
      restartScreen.style.display = 'block';
    }
  
    restartButton.addEventListener('click', restartGame);
  
    function restartGame() {
      location.reload();
    }
  
    document.addEventListener('visibilitychange', handleVisibilityChange);
  
    updateBackgroundPosition();
  });
  