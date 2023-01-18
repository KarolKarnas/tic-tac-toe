let gameBoard = (() => {
	let container = document.querySelector('.container');
	let boardGameContainer = document.createElement('div');
	boardGameContainer.classList.add('game-board');
	container.appendChild(boardGameContainer);

	let gameBoardFields = [
		{ id: 'f1', mark: '' },
		{ id: 'f2', mark: '' },
		{ id: 'f3', mark: '' },
		{ id: 'f4', mark: '' },
		{ id: 'f5', mark: '' },
		{ id: 'f6', mark: '' },
		{ id: 'f7', mark: '' },
		{ id: 'f8', mark: '' },
		{ id: 'f9', mark: '' },
	];

	for (let i = 0; i < 9; i++) {
		//create field
		let boardField = document.createElement('div');
		//add class id and mark
		boardField.classList.add('field');
		boardField.id = `${gameBoardFields[i].id}`;
		boardField.textContent = `${gameBoardFields[i].mark}`;
		boardGameContainer.appendChild(boardField);
	}

	//----TEST methods and variables export
	// let readFields = () => console.log(gameBoardFields);
	// let changeMark = (num, mark) => (gameBoardFields[num] = mark);

	// return { readFields, changeMark, gameBoardFields };
})();

//test
// gameBoard.readFields();
// gameBoard.changeMark(0, 'x');
// console.log(gameBoard.gameBoardFields);
// console.log(gameBoard);

// player factory

let player = (name, mark) => {
	let playerName = name;
	let playerMark = mark;
	return { playerName, playerMark };
};
// GAME

let newGame = () => {
	let p1 = player('p1', 'o');
	console.log(p1);
	let p2 = player('p2', 'x');
	console.log(p2);

	//switch players

	let currentPlayer = p1;

	let allFields = document.querySelectorAll('.field');

	allFields.forEach((field) =>
		field.addEventListener('click', function () {
			if (currentPlayer === p1) {
				//check isEmpty
				// gameFlow - check forWin,nextRound
				this.textContent = p1.playerMark;
				currentPlayer = p2;
				return;
			} else if (currentPlayer === p2) {
				this.textContent = p2.playerMark;
				currentPlayer = p1;
				return;
			}
		})
	);
};

newGame();

//create player ONE - factory
// let playerOne = (name, mark) => {
// 	const playerOneName = name;
// 	const playerOneMark = mark;
// 	const playerOneChange = () => gameBoard.changeMark(1, mark);

// 	let allFields = document.querySelectorAll('.field');
// 	allFields.forEach((field) =>
// 		field.addEventListener('click', function () {
// 			//check isEmpty
// 			this.textContent = mark;
// 			// gameFlow - check forWin,nextRound
// 			//
// 		})
// 	    );

// 	return { playerOneName, playerOneMark };
// };

// // Player Two

// let playerTwo = (name, mark) => {
// 	const playerTwoName = name;
// 	const playerTwoMark = mark;
// 	    let allFields = document.querySelectorAll('.field');
// 	    allFields.forEach((field) =>
// 	    field.addEventListener('click', function () {
// 	        this.textContent = mark;
// 	    })
// 	);

// 	return { playerTwoName, playerTwoMark };
// };

// let playerTwo = {}; //factory

// let controlGameFlow = {}; //module - displayController?

// createGameBoard();

// let boardGameContainer = document.querySelector('.game-board');

// console.log(boardGameContainer);

//
// let createGameBoard = function () {
// 	for (let i = 0; i < 9; i++) {
// 		//create one field
// 		let gameBoardFields = [
// 			{ name: 'f1', symbol: 'o' },
// 			{ name: 'f2', symbol: 'x' },
// 			{ name: 'f3', symbol: 'o' },
// 			{ name: 'f4', symbol: 'x' },
// 			{ name: 'f5', symbol: 'o' },
// 			{ name: 'f6', symbol: 'x' },
// 			{ name: 'f7', symbol: 'o' },
// 			{ name: 'f8', symbol: 'x' },
// 			{ name: 'f9', symbol: 'o' },
// 		];
// 		// console.log(gameBoardFields[i])
// 		let boardField = document.createElement('div');
// 		boardField.classList.add('field');
// 		boardField.id = `${gameBoardFields[i].name}`;
//         boardField.textContent = `${gameBoardFields[i].symbol}`

// 		// console.log(boardField);
// 		boardGameContainer.appendChild(boardField);
// 	}
// };

// createGameBoard();

// let gameBoardFields = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9'];

// // let a1 = 'i dont know';

// let gameBoardObject = {
// 	//module
// 	gameBoard: ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'],
// };

// console.log(gameBoardObject.gameBoard[0]);

// let playerOne = {}; //factory
// let playerTwo = {}; //factory

// let controlGameFlow = {}; //module - displayController?

// let createGameBoard = function () {
// 	for (let i = 0; i < 9; i++) {
// 		//create one field
// 		let boardField = document.createElement('div');
// 		boardField.classList.add('field');

// 		console.log(boardField);
// 		boardGameContainer.appendChild(boardField);
// 	}
// };
