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

        switchPlayer();
        printNewRound();

        } else {
            return
        }
    }

    printNewRound()

    return {
        playRound,
        getActivePlayer
    }
}

const game = gameController();