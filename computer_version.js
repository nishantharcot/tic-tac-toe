(
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const x = 'X';
      const o = 'O';
      let count = 0;
      const boxes = document.getElementsByClassName('bo');
      let remaining = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const model = {
        board: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        currentPlayer: x,
        scorePlayer1: 0,
        scoreComputer: 0,
      };
      const boardView = {
        render: () => {
          for (let i = 0; i < boxes.length; i += 1) {
            const row = Math.floor(i / 3);
            const col = Number(i % 3);
            boxes[i].innerHTML = model.board[row][col];
            // console.log(boxes[i].innerHTML);
            if (count >= 5) {
              controller.checkGame(model.board);
            }
            if (model.currentPlayer === o) {
              boardView.attachEventHandlers();
            }
          }
        },
        attachEventHandlers: () => {
          for (let i = 0; i < boxes.length; i += 1) {
            if (model.currentPlayer === x) {
              // console.log('x');
              boxes[i].onclick = () => {
                controller.handleBoxClick(i);
              };
            }
            else {
              if (remaining.length !== 0) {
                var rand = remaining[Math.floor(Math.random() * remaining.length)];
                controller.handleBoxClick(rand);
              }
            }
          }
        },
        init: () => {
          boardView.attachEventHandlers();
        },
      };
      const controller = {
        handleBoxClick(boxIndex) {
          // console.log(boxIndex);
          const row = Math.floor(boxIndex / 3);
          const col = Number(boxIndex % 3);
          if (model.board[row][col]) {
            alert('Invalid Move');
          } else {
            if (remaining.length !== 0) {
              remaining.splice(remaining.indexOf(boxIndex), 1);
            }
            model.board[row][col] = model.currentPlayer;
            model.currentPlayer = model.currentPlayer === x ? o : x;
            count += 1;
            boardView.render();
            // if (count >= 5) {
            //   controller.checkGame(model.board);
            // }
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
                model.scoreComputer += 10;
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
                model.scoreComputer += 10;
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
              model.scoreComputer += 10;
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
              model.scoreComputer += 10;
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
          remaining = [0, 1, 2, 3, 4, 5, 6, 7, 8]
          boardView.render();
          model.currentPlayer = x;
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
