// BOARD Module

let gameBoard = (() => {
	let container = document.querySelector('.container');
	let boardGameContainer = document.createElement('div');
	boardGameContainer.classList.add('game-board');
	container.appendChild(boardGameContainer);

	let gameBoardFields = ['', '', '', '', '', '', '', '', ''];

	for (let i = 0; i < 9; i++) {
		//create field
		let boardField = document.createElement('div');
		//add class id and mark
		boardField.classList.add('field');
		// boardField.id = `${gameBoardFields[i].id}`;
		boardField.textContent = `${gameBoardFields[i]}`;
		boardGameContainer.appendChild(boardField);
	}

	return { gameBoardFields };
})();

// DISPLAY module

let displayController = (() => {
	// RESTART BUTTON
	let allFields = document.querySelectorAll('.field');
	let gameOver = true;

	let clearFields = function () {
		allFields.forEach((element) => (element.textContent = ''));
	};

	let clearArray = function () {
		gameBoard.gameBoardFields = gameBoard.gameBoardFields.map(() => '');
		console.log(gameBoard.gameBoardFields);
	};

	let removeWin = function () {
		allFields.forEach((el) => el.classList.remove('win'));
		allFields.forEach((el) => el.classList.remove('tie'));
	};

	let setGameOverFalse = function () {
		displayController.gameOver = false;
	};

	let restartGame = function () {
		clearFields();
		clearArray();
		removeWin();
		setGameOverFalse();
	};

	let restartGameBtn = document.querySelector('.restart-game-btn');
	restartGameBtn.addEventListener('click', restartGame);

	// PLAYER factory function

	let player = (name, mark) => {
		let playerName = name;
		let playerMark = mark;
		return { playerName, playerMark };
	};

	//default player

	let p1 = player('p1', 'O');
	let p2 = player('p2', 'X');

	// PLAYER NAMES

	let playerOneInput = document.getElementById('player-one');
	let playerTwoInput = document.getElementById('player-two');

	// RESULT DISPLAY
	let defaultTxt = 'WHO WILL WIN AND WHO WILL DIE?!';
	let gameStartTxt;

	let resultDisplay = document.querySelector('.result-display');
	// console.log(resultDisplay);

	let setResultDisplayTxt = function (txt) {
		resultDisplay.textContent = txt;
	};

	setResultDisplayTxt(defaultTxt);

	// START BUTTON

	let updatePlayersNames = function () {
		p1.playerName = playerOneInput.value;
		console.log(p1);
		p2.playerName = playerTwoInput.value;
		console.log(p2);
		gameStartTxt = `Who will win and who will DIE? ${p1.playerName} the '${p1.playerMark}' or ${p2.playerName} the '${p2.playerMark}'!?`;
	};

	let startGame = function () {
		clearFields();
		clearArray();
		removeWin();
		setGameOverFalse();
		updatePlayersNames();
		setResultDisplayTxt(gameStartTxt);
	};

	let startGameBtn = document.querySelector('.start-game-btn');
	startGameBtn.addEventListener('click', startGame);

	return { allFields, gameOver, p1, p2, setResultDisplayTxt };
})();

// GAME module

let gameController = (() => {
	let currentPlayer = displayController.p1;

	// let allFields = document.querySelectorAll('.field');
	let winChecker = function () {
		if (checkWin()) {
			// console.log(currentPlayer);
			displayController.setResultDisplayTxt(
				`The winner is ${currentPlayer.playerName}! Congratulations, you live!`
			);
		} else if (checkTie()) {
			console.log('tie');
			displayController.setResultDisplayTxt(
				`It is a tie! ${displayController.p1.playerName} and ${displayController.p2.playerName} you are WEAK!`
			);
		}
	};
	// add mark on the field, update array gameBoardFields
	displayController.allFields.forEach((element, index) =>
		element.addEventListener('click', function () {
			if (displayController.gameOver) {
				return;
			}

			//check isEmpty, nextRound
			if (this.textContent === '' && currentPlayer === displayController.p1) {
				this.textContent = displayController.p1.playerMark;
				gameBoard.gameBoardFields[index] = displayController.p1.playerMark;
				console.log(gameBoard.gameBoardFields);
				winChecker();
				currentPlayer = displayController.p2;
				// return;
			} else if (
				this.textContent === '' &&
				currentPlayer === displayController.p2
			) {
				this.textContent = displayController.p2.playerMark;
				gameBoard.gameBoardFields[index] = displayController.p2.playerMark;
				console.log(gameBoard.gameBoardFields);
				winChecker();
				currentPlayer = displayController.p1;
				// return;
			}

			// if (checkWin()) {
			// 	// console.log(currentPlayer);
			// 	displayController.setResultDisplayTxt(`The winner is ${currentPlayer.playerName}! Congratulations, you live!`)
			// } else if (checkTie()) {
			// 	console.log('tie');
			// 	displayController.setResultDisplayTxt(`It is a tie! ${displayController.p1.playerName} and ${displayController.p2.playerName} you are WEAK!`)
			// }
		})
	);
	let changeWinFields = function (winOne, winTwo, winThree) {
		displayController.allFields[winOne].classList.add('win');
		displayController.allFields[winTwo].classList.add('win');
		displayController.allFields[winThree].classList.add('win');
	};

	let changeTieFields = function () {
		displayController.allFields.forEach((el) => el.classList.add('tie'));
	};

	// CHECK TIE

	let checkTie = function () {
		if (
			gameBoard.gameBoardFields[0] !== '' &&
			gameBoard.gameBoardFields[1] !== '' &&
			gameBoard.gameBoardFields[2] !== '' &&
			gameBoard.gameBoardFields[3] !== '' &&
			gameBoard.gameBoardFields[4] !== '' &&
			gameBoard.gameBoardFields[5] !== '' &&
			gameBoard.gameBoardFields[6] !== '' &&
			gameBoard.gameBoardFields[7] !== '' &&
			gameBoard.gameBoardFields[8] !== ''
		) {
			changeTieFields();
			gameBoard.gameOver = true;
			return true;
		}
	};

	// CHECK THE WINNER

	let checkWin = function () {
		//horizontal win
		if (
			gameBoard.gameBoardFields[0] !== '' &&
			gameBoard.gameBoardFields[0] === gameBoard.gameBoardFields[1] &&
			gameBoard.gameBoardFields[0] === gameBoard.gameBoardFields[2]
		) {
			changeWinFields(0, 1, 2);
			displayController.gameOver = true;
			return true;
		} else if (
			gameBoard.gameBoardFields[3] !== '' &&
			gameBoard.gameBoardFields[3] === gameBoard.gameBoardFields[4] &&
			gameBoard.gameBoardFields[3] === gameBoard.gameBoardFields[5]
		) {
			changeWinFields(3, 4, 5);
			displayController.gameOver = true;
			return true;
		} else if (
			gameBoard.gameBoardFields[6] !== '' &&
			gameBoard.gameBoardFields[6] === gameBoard.gameBoardFields[7] &&
			gameBoard.gameBoardFields[6] === gameBoard.gameBoardFields[8]
		) {
			changeWinFields(6, 7, 8);
			displayController.gameOver = true;
			return true;
		} //vertical win
		else if (
			gameBoard.gameBoardFields[0] !== '' &&
			gameBoard.gameBoardFields[0] === gameBoard.gameBoardFields[3] &&
			gameBoard.gameBoardFields[0] === gameBoard.gameBoardFields[6]
		) {
			changeWinFields(0, 3, 6);
			displayController.gameOver = true;
			return true;
		} else if (
			gameBoard.gameBoardFields[1] !== '' &&
			gameBoard.gameBoardFields[1] === gameBoard.gameBoardFields[4] &&
			gameBoard.gameBoardFields[1] === gameBoard.gameBoardFields[7]
		) {
			changeWinFields(1, 4, 7);
			displayController.gameOver = true;
			return true;
		} else if (
			gameBoard.gameBoardFields[2] !== '' &&
			gameBoard.gameBoardFields[2] === gameBoard.gameBoardFields[5] &&
			gameBoard.gameBoardFields[2] === gameBoard.gameBoardFields[8]
		) {
			changeWinFields(2, 5, 8);
			displayController.gameOver = true;
			return true;
		} //diagonal win
		else if (
			gameBoard.gameBoardFields[0] !== '' &&
			gameBoard.gameBoardFields[0] === gameBoard.gameBoardFields[4] &&
			gameBoard.gameBoardFields[0] === gameBoard.gameBoardFields[8]
		) {
			changeWinFields(0, 4, 8);
			displayController.gameOver = true;
			return true;
		} else if (
			gameBoard.gameBoardFields[2] !== '' &&
			gameBoard.gameBoardFields[2] === gameBoard.gameBoardFields[4] &&
			gameBoard.gameBoardFields[2] === gameBoard.gameBoardFields[6]
		) {
			changeWinFields(2, 4, 6);
			displayController.gameOver = true;
			return true;
		}
	};
	return { currentPlayer };
})();
