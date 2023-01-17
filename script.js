let boardGameContainer = document.querySelector('.game-board');

console.log(boardGameContainer);

let createGameBoard = function () {
    let gameBoardFields = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9'];
    for (let i = 0; i < 9; i++) {
        //create one field
        // console.log(gameBoardFields[i])
        let boardField = document.createElement('div');
        boardField.classList.add('field');
        boardField.id = `${gameBoardFields[i]}`

        // console.log(boardField);
        boardGameContainer.appendChild(boardField);
    }
};

createGameBoard();

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






