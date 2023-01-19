// Board Module

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

	let allFields = document.querySelectorAll('.field');

	// CLEAR FIELDS, CLEAR ARRAY, NEW GAME BUTTON

	let clearFields = function () {
		allFields.forEach((element) => (element.textContent = ''));
	};

	let clearFieldsBtn = document.querySelector('.clear-fields-btn');
	clearFieldsBtn.addEventListener('click', clearFields);

	let clearArray = function () {
		gameBoard.gameBoardFields = gameBoard.gameBoardFields.map(() => '');
		console.log(gameBoard.gameBoardFields);
	};

	let clearArrayBtn = document.querySelector('.clear-array-btn');
	clearArrayBtn.addEventListener('click', clearArray);

	let removeWin = function () {
		allFields.forEach((el) => el.classList.remove('win'));
		allFields.forEach((el) => el.classList.remove('tie'));
	};

	let gameOver = false;
	let setGameOverFalse = function () {
		gameBoard.gameOver = false;
	};

	let clearAll = function () {
		clearFields();
		clearArray();
		removeWin();
		setGameOverFalse();
	};

	let newGameBtn = document.querySelector('.new-game-btn');
	newGameBtn.addEventListener('click', clearAll);

	return { gameBoardFields, allFields, gameOver };
})();

// PLAYER factory function

let player = (name, mark) => {
	let playerName = name;
	let playerMark = mark;
	return { playerName, playerMark };
};

// GAME factory function

let newGame = () => {
	let p1 = player('p1', 'o');
	console.log(p1);
	let p2 = player('p2', 'x');
	console.log(p2);
	//DEFAULT current player

	let currentPlayer = p1;

	// let allFields = document.querySelectorAll('.field');

	// add mark on the field, update array gameBoardFields
	gameBoard.allFields.forEach((element, index) =>
		element.addEventListener('click', function () {
			if (gameBoard.gameOver) {
				return;
			}

			//check isEmpty, nextRound
			if (this.textContent === '' && currentPlayer === p1) {
				this.textContent = p1.playerMark;
				gameBoard.gameBoardFields[index] = p1.playerMark;
				console.log(gameBoard.gameBoardFields);
				currentPlayer = p2;
				// return;
			} else if (this.textContent === '' && currentPlayer === p2) {
				this.textContent = p2.playerMark;
				gameBoard.gameBoardFields[index] = p2.playerMark;
				console.log(gameBoard.gameBoardFields);
				currentPlayer = p1;
				// return;
			}

			if (!checkWin()) {
				checkTie();
			}

			// gameFlow - check forWin
			//three in row determine winner
			//all field tie
			//start new game

			// player name
			// score
			//hide
		})
	);
	let changeWinFields = function (winOne, winTwo, winThree) {
		console.log('You Win!');
		gameBoard.allFields[winOne].classList.add('win');
		gameBoard.allFields[winTwo].classList.add('win');
		gameBoard.allFields[winThree].classList.add('win');
	};

	let changeTieFields = function () {
		gameBoard.allFields.forEach((el) => el.classList.add('tie'));
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
			gameBoard.gameOver = true;
			return true;
		} else if (
			gameBoard.gameBoardFields[3] !== '' &&
			gameBoard.gameBoardFields[3] === gameBoard.gameBoardFields[4] &&
			gameBoard.gameBoardFields[3] === gameBoard.gameBoardFields[5]
		) {
			changeWinFields(3, 4, 5);
			gameBoard.gameOver = true;
			return true;
		} else if (
			gameBoard.gameBoardFields[6] !== '' &&
			gameBoard.gameBoardFields[6] === gameBoard.gameBoardFields[7] &&
			gameBoard.gameBoardFields[6] === gameBoard.gameBoardFields[8]
		) {
			changeWinFields(6, 7, 8);
			gameBoard.gameOver = true;
			return true;
		} //vertical win
		else if (
			gameBoard.gameBoardFields[0] !== '' &&
			gameBoard.gameBoardFields[0] === gameBoard.gameBoardFields[3] &&
			gameBoard.gameBoardFields[0] === gameBoard.gameBoardFields[6]
		) {
			changeWinFields(0, 3, 6);
			gameBoard.gameOver = true;
			return true;
		} else if (
			gameBoard.gameBoardFields[1] !== '' &&
			gameBoard.gameBoardFields[1] === gameBoard.gameBoardFields[4] &&
			gameBoard.gameBoardFields[1] === gameBoard.gameBoardFields[7]
		) {
			changeWinFields(1, 4, 7);
			gameBoard.gameOver = true;
			return true;
		} else if (
			gameBoard.gameBoardFields[2] !== '' &&
			gameBoard.gameBoardFields[2] === gameBoard.gameBoardFields[5] &&
			gameBoard.gameBoardFields[2] === gameBoard.gameBoardFields[8]
		) {
			changeWinFields(2, 5, 8);
			gameBoard.gameOver = true;
			return true;
		} //diagonal win
		else if (
			gameBoard.gameBoardFields[0] !== '' &&
			gameBoard.gameBoardFields[0] === gameBoard.gameBoardFields[4] &&
			gameBoard.gameBoardFields[0] === gameBoard.gameBoardFields[8]
		) {
			changeWinFields(0, 4, 8);
			gameBoard.gameOver = true;
			return true;
		} else if (
			gameBoard.gameBoardFields[2] !== '' &&
			gameBoard.gameBoardFields[2] === gameBoard.gameBoardFields[4] &&
			gameBoard.gameBoardFields[2] === gameBoard.gameBoardFields[6]
		) {
			changeWinFields(2, 4, 6);
			gameBoard.gameOver = true;
			return true;
		}
	};
};

newGame();
