function updateScoreElement() {
  document.querySelector(
    ".js-game-result"
  ).innerHTML = `Wins: ${score.wins}, loses: ${score.loses}, tie: ${score.tie} `;
}

let score = JSON.parse(localStorage.getItem("score"));
if (!score) {
  score = {
    wins: 0,
    loses: 0,
    tie: 0,
  };
}

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const oneplayerMove = pickComputerMove();
      playGame(oneplayerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".js-auto-play").innerHTML = "Stop Playing";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".js-auto-play").innerHTML = "Auto Play";
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "lose. May be next time!";
    } else if (computerMove === "paper") {
      result = "win. Congrats!";
    } else if (computerMove === "scissors") {
      result = "both tie. Try again!";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "both tie! Try again.";
    } else if (computerMove === "paper") {
      result = "lose. May be next time.";
    } else if (computerMove === "scissors") {
      result = "win. Congrats!";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "win. Congrats!";
    } else if (computerMove === "paper") {
      result = "both tie! Try again.";
    } else if (computerMove === "scissors") {
      result = "lose. May be next time!";
    }
  }

  if (result === "win. Congrats!") {
    score.wins += 1;
  } else if (result === "lose. May be next time!") {
    score.loses += 1;
  } else {
    score.tie += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(
    ".js-move"
  ).innerHTML = `You <img src="images/${playerMove}-emoji.png"> <img src="images/${computerMove}-emoji.png"> by computer.`;

  document.querySelector(".js-result").innerHTML = `You ${result}`;

  updateScoreElement();
  console.log(`Player: ${playerMove}`);
  console.log(`Computer: ${computerMove}`);
  console.log(`You ${result}`);
  console.log("--------------------------------");
}

function pickComputerMove() {
  let computerMove = ""; //here computerMove can't be declared by const bcz its value is changing from 'empty string' to a value.
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}
