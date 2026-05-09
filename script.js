function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push(null);            
        }
        
    }

    const getBoard = () => board;

    const availability = (row,column) => board[row][column] == null ? true : false;

    const putToken = (row,column,player) => {
        
        if ( board[row][column] == null ) {
            board[row][column] = player.token;
        }
    }

    const printBoard = () => {
        console.table(board);
    }

    return {
        availability,
        getBoard,
        putToken,
        printBoard
    }
    
}

function checkForWinner(player,board) {

    let b = board.getBoard();

    if (
        (b[0][0] == player.token && b[0][1] == player.token && b[0][2] == player.token ) ||
        (b[1][0] == player.token && b[1][1] == player.token && b[1][2] == player.token ) ||
        (b[2][0] == player.token && b[2][1] == player.token && b[2][2] == player.token ) ||
        (b[0][0] == player.token && b[1][0] == player.token && b[2][0] == player.token ) ||
        (b[0][1] == player.token && b[1][1] == player.token && b[2][1] == player.token ) ||
        (b[0][2] == player.token && b[1][2] == player.token && b[2][2] == player.token ) ||
        (b[0][0] == player.token && b[1][1] == player.token && b[2][2] == player.token ) ||
        (b[2][0] == player.token && b[1][1] == player.token && b[0][2] == player.token )
    ) {
        console.log(`Congratulations ${player.name} won!`)
    }
    
}

function checkForDraw(board) {
    
    b = board.getBoard();
    let count = 0;

    for (let i = 0; i < b.length; i++) {
        if (!b[i].includes(null)) {
            count++;
        }
    }

    if (count == b.length) {
        console.log("It's a tie!")
    }

}

function gameController() {
    
    const players = [
        {
            name: "Player one",
            token: "X"
        },
        {
            name: "Player two",
            token: "O"
        }
    ]

    const board = gameBoard();

    let activePlayer = players[0];

    let switchPlayer = () => activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];

    let getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn!`);
    }

    const playRound = (row,column) => {

        if (board.availability(row,column)) {

        board.putToken(row,column,activePlayer);
        console.log ( `Putting token in row ${row}, column ${column}`);
        
        checkForWinner(activePlayer,board);
        checkForDraw(board);
        switchPlayer();
        printNewRound();

        } else {
            return
        }
    }

    printNewRound()

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        availability: board.availability
    }
}

function screenController() {
    const game = gameController();
    const message = document.querySelector(".message");
    const boardDiv = document.querySelector(".board");

    const board = game.getBoard();

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const cell = document.createElement("button");
            cell.dataset.row = i;
            cell.dataset.column = j;
            boardDiv.append(cell);            
        }        
    }

    boardDiv.addEventListener("click", (event) => {
        const boardData = event.target.dataset;
        const row = boardData.row;
        const column = boardData.column;
        const availability = game.availability(row,column)
        game.playRound(row,column);
        
        const currentToken = game.getActivePlayer().token
        
        const tokenSVG = document.createElement('img');
        if (availability) {       
            if (currentToken == 'O') {
                tokenSVG.src = "images/circle-svgrepo-com.svg"
            }else {
                tokenSVG.src = "images/cross-svgrepo-com.svg"
            }

            event.target.append(tokenSVG);
        }
    })
}

screenController();