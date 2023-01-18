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

	//----TEST methods and variables export
	// let readFields = () => console.log(gameBoardFields);
	// let changeMark = (num, mark) => (gameBoardFields[num] = mark);

	return { gameBoardFields };
})();

//test
// gameBoard.readFields();
// gameBoard.changeMark(0, 'x');
// console.log(gameBoard.gameBoardFields);
// console.log(gameBoard);

// PLAYER factory

let player = (name, mark) => {
	let playerName = name;
	let playerMark = mark;
	return { playerName, playerMark };
};

// GAME factory

let newGame = () => {
	let p1 = player('p1', 'o');
	console.log(p1);
	let p2 = player('p2', 'x');
	console.log(p2);
	//DEFAULT current player

	let currentPlayer = p1;

	let allFields = document.querySelectorAll('.field');
	// console.log(allFields);

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

	let newGameBtn = document.querySelector('.new-game-btn');
	newGameBtn.addEventListener('click', () => {
		clearFields(), clearArray();
	});

	// add mark on the field, update array gameBoardFields
	allFields.forEach((element, index) =>
		element.addEventListener('click', function () {
			//check isEmpty, nextRound
			if (this.textContent === '' && currentPlayer === p1) {
				this.textContent = p1.playerMark;
				gameBoard.gameBoardFields[index] = p1.playerMark;
				console.log(gameBoard.gameBoardFields);
				currentPlayer = p2;
				return;
			} else if (this.textContent === '' && currentPlayer === p2) {
				this.textContent = p2.playerMark;
				gameBoard.gameBoardFields[index] = p2.playerMark;
				console.log(gameBoard.gameBoardFields);
				currentPlayer = p1;
				return;
			}
			// gameFlow - check forWin
			//three in row determine winner
			//all field tie
			//start new game
		})
	);
};

newGame();
