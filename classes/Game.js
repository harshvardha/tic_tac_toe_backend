class Game {
    gameBoard;
    noOfMoves;
    hasWinner;
    tie;

    constructor() {
        this.gameBoard = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        this.noOfMoves = 0;
        this.hasWinner = false;
        this.tie = false;
    }

    registerMove(side, blockNo) {
        if (this.noOfMoves < 9 && !this.hasWinner) {
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
                col = 2;
            } else {
                col = remainder - 1
            }
            this.gameBoard[row][col] = side;
            this.noOfMoves += 1;
        }
    }

    evaluateResult() {
        let result;
        result = this._checkRowWise();
        if (result.winner) {
            this.hasWinner = true;
            return result;
        }
        result = this._checkColumnWise();
        if (result.winner) {
            this.hasWinner = true;
            return result;
        }
        result = this._checkLeftDiagonal();
        if (result.winner) {
            this.hasWinner = true;
            return result;
        }
        result = this._checkRightDiagonal();
        if (result.winner) {
            this.hasWinner = true;
            return result;
        }
        if (this.noOfMoves === 9) {
            this.tie = true;
            return {
                winner: false,
                tie: true,
                side: "",
                block: []
            }
        }
        return false;
    }

    _checkRowWise() {
        let row = 0;
        while (row < 3) {
            if (this.gameBoard[row][0] === "" || this.gameBoard[row][1] === "" || this.gameBoard[row][2] === "") {
                row++;
                continue;
            }
            else if (this.gameBoard[row][0] === this.gameBoard[row][1] && this.gameBoard[row][1] === this.gameBoard[row][2]) {
                return {
                    winner: true,
                    tie: false,
                    side: this.gameBoard[row][0],
                    blocks: row === 0 ? [1, 2, 3] : row === 1 ? [4, 5, 6] : [7, 8, 9]
                };
            }
            row++;
        }
        return {
            winner: false
        };
    }

    _checkColumnWise() {
        let column = 0;
        while (column < 3) {
            if (this.gameBoard[0][column] === "" || this.gameBoard[1][column] === "" || this.gameBoard[2][column] === "") {
                column++;
                continue;
            }
            else if (this.gameBoard[0][column] === this.gameBoard[1][column] && this.gameBoard[1][column] === this.gameBoard[2][column]) {
                return {
                    winner: true,
                    tie: false,
                    side: this.gameBoard[0][column],
                    blocks: column === 0 ? [1, 4, 7] : column === 1 ? [2, 5, 8] : [3, 6, 9]
                };
            }
            column++;
        }
        return {
            winner: false
        };
    }

    _checkLeftDiagonal() {
        if (this.gameBoard[0][0] === "" || this.gameBoard[1][1] === "" || this.gameBoard[2][2] === "") {
            return {
                winner: false
            };
        }
        else if (this.gameBoard[0][0] === this.gameBoard[1][1] && this.gameBoard[1][1] === this.gameBoard[2][2]) {
            return {
                winner: true,
                tie: false,
                side: this.gameBoard[0][0],
                blocks: [1, 5, 9]
            };
        }
        return {
            winner: false
        };
    }

    _checkRightDiagonal() {
        if (this.gameBoard[0][2] === "" || this.gameBoard[1][1] === "" || this.gameBoard[2][0] === "") {
            return {
                winner: false
            };
        }
        else if (this.gameBoard[0][2] === this.gameBoard[1][1] && this.gameBoard[1][1] === this.gameBoard[2][0]) {
            return {
                winner: true,
                tie: false,
                side: this.gameBoard[0][2],
                blocks: [3, 5, 7]
            };
        }
        return {
            winner: false
        };
    }

    getNoOfMoves() {
        return this.noOfMoves;
    }

    getWinner() {
        return this.hasWinner;
    }

    isTie() {
        return this.tie
    }
}

module.exports = {
    Game
}