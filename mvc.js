(
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const x = 'X';
      const o = 'O';
      let count = 0;
      const boxes = document.getElementsByClassName('bo');
      const model = {
        board: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        currentPlayer: x,
        scorePlayer1: 0,
        scorePlayer2: 0,
      };
      const boardView = {
        render: () => {
          for (let i = 0; i < boxes.length; i += 1) {
            const row = Math.floor(i / 3);
            const col = Number(i % 3);
            boxes[i].innerHTML = model.board[row][col];
          }
        },
        attachEventHandlers: () => {
          for (let i = 0; i < boxes.length; i += 1) {
            boxes[i].onclick = () => {
              controller.handleBoxClick(i);
            };
          }
        },
        init: () => {
          boardView.attachEventHandlers();
        },
      };
      const controller = {
        handleBoxClick(boxIndex) {
          const row = Math.floor(boxIndex / 3);
          const col = Number(boxIndex % 3);
          if (model.board[row][col]) {
            alert('Invalid Move');
          } else {
            model.board[row][col] = model.currentPlayer;
            model.currentPlayer = model.currentPlayer === x ? o : x;
            count += 1;
            boardView.render();
            if (count >= 5) {
              controller.checkGame(model.board);
            }
            if (count === 9) {
              controller.clearBoard(model.board);
            }
          }
        },
        checkGame(board) {
          for (let row = 0; row < 3; row++) {
            if (board[row][0] === board[row][1] &
                board[row][1] === board[row][2]) {
              if (board[row][0] === 'X') {
                model.scorePlayer1 += 10;
                alert('Player 1 wins');
                controller.clearBoard(board);
              }
              if (board[row][0] === 'O') {
                model.scorePlayer2 += 10;
                alert('Player 2 wins');
                controller.clearBoard(board);
              }
            }
          }
          for (let col = 0; col < 3; col++) {
            if (board[0][col] === board[1][col] &
                board[1][col] === board[2][col]) {
              if (board[0][col] === 'X') {
                model.scorePlayer1 += 10;
                alert('Player 1 wins');
                controller.clearBoard(board);
              }
              if (board[0][col] === 'O') {
                model.scorePlayer2 += 10;
                alert('Player 2 wins');
                controller.clearBoard(board);
              }
            }
          }
          if (board[0][0] === board[1][1] & board[1][1] === board[2][2]) {
            if (board[0][0] === 'X') {
              model.scorePlayer1 += 10;
              alert('Player 1 wins');
              controller.clearBoard(board);
            }
            if (board[0][0] === 'O') {
              model.scorePlayer2 += 10;
              alert('Player 2 wins');
              controller.clearBoard(board);
            }
          }
          if (board[0][2] === board[1][1] & board[1][1] === board[2][0]) {
            if (board[0][2] === 'X') {
              model.scorePlayer1 += 10;
              alert('Player 1 wins');
              controller.clearBoard(board);
            }
            if (board[0][2] === 'O') {
              model.scorePlayer2 += 10;
              alert('Player 2 wins');
              controller.clearBoard(board);
            }
          }
        },
        clearBoard(board) {
          for (let row = 0; row < 3; row++) {
            for (let col =0; col < 3; col++) {
              board[row][col] = '';
            }
          }
          boardView.render();
          model.currentPlayer =x;
          count = 0;
        },
        init: () => {
          boardView.init();
          boardView.render();
        },
      };
      controller.init();
    }
  }
)();
