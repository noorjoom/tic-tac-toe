const gameBoard = {
    cells: Array(9).fill(null),
    currentPlayer: 'X', // Initialize with 'X' as the starting player

    makeMove: function(index) {
        if (this.cells[index] === null) {
            this.cells[index] = this.currentPlayer;
            return true; // valid move
        }
        return false; // invalid move
    },

    checkForWin: function(player) {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            if (pattern.every(index => this.cells[index] === player)) {
                return true;
            }
        }

        return false;
    },

    isFull: function() {
        return this.cells.every(cell => cell !== null);
    },

    togglePlayer: function() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
};

const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!gameBoard.makeMove(index)) {
            alert('Invalid move');
            return;
        }

        cell.textContent = gameBoard.currentPlayer;

        if (gameBoard.checkForWin(gameBoard.currentPlayer)) {
            alert(`Player ${gameBoard.currentPlayer} wins!`);
            return;
        } else if (gameBoard.isFull()) {
            alert("It's a draw!");
        }

        gameBoard.togglePlayer(); // Toggle the player after each valid move
    });
});