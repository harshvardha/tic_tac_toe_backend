class Game {
    gameBoard;

    constructor() {
        this.gameBoard = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    }

    addMove(side, blockNo) {
        let row, col;
        if (blockNo <= 3) {
            row = 0;
        }
        else if (blockNo <= 6) {
            row = 1;
        }
        else if (blockNo <= 9) {
            row = 2;
        }
        const remainder = blockNo % 3;
        if (remainder === 0) {
            col = blockNo - 1;
        } else {
            col = remainder - 1
        }
        this.gameBoard[row][col] = side;
    }
}

module.exports = {
    Game
}