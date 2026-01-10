import React, { useState } from 'react';

function App() {
  const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [message, setMessage] = useState({ text: '', color: 'text-gray-700' });

  const isValidSudoku = (currentBoard) => {
    for (let i = 0; i < 9; i++) {
      let rowFlag = Array(9).fill(false);
      let colVis = Array(9).fill(false);
      for (let j = 0; j < 9; j++) {
        if (currentBoard[i][j] !== '') {
          let num = parseInt(currentBoard[i][j]) - 1;
          if (!rowFlag[num]) rowFlag[num] = true; else return false;
        }
        if (currentBoard[j][i] !== '') {
          let num = parseInt(currentBoard[j][i]) - 1;
          if (!colVis[num]) colVis[num] = true; else return false;
        }
      }
    }
    for (let n = 0; n < 9; n++) {
      let r = Math.floor(n / 3) * 3;
      let c = (n % 3) * 3;
      let flag = Array(9).fill(false);
      for (let i = r; i < r + 3; i++) {
        for (let j = c; j < c + 3; j++) {
          if (currentBoard[i][j] !== '') {
            let num = parseInt(currentBoard[i][j]) - 1;
            if (!flag[num]) flag[num] = true; else return false;
          }
        }
      }
    }
    return true;
  };

  const isValidPlacement = (r, c, ch, currentBoard) => {
    for (let i = 0; i < 9; i++) {
      if (currentBoard[r][i] === ch || currentBoard[i][c] === ch) return false;
    }
    let sR = Math.floor(r / 3) * 3, sC = Math.floor(c / 3) * 3;
    for (let i = sR; i < sR + 3; i++) {
      for (let j = sC; j < sC + 3; j++) {
        if (currentBoard[i][j] === ch) return false;
      }
    }
    return true;
  };

  const solver = (r, c, currentBoard) => {
    if (r === 9) return true;
    if (c === 9) return solver(r + 1, 0, currentBoard);
    if (currentBoard[r][c] !== '') return solver(r, c + 1, currentBoard);
    for (let i = 1; i <= 9; i++) {
      let ch = i.toString();
      if (isValidPlacement(r, c, ch, currentBoard)) {
        currentBoard[r][c] = ch;
        if (solver(r, c + 1, currentBoard)) return true;
        currentBoard[r][c] = '';
      }
    }
    return false;
  };

  const handleSolve = () => {
    let boardCopy = board.map(row => [...row]);
    if (isValidSudoku(boardCopy)) {
      if (solver(0, 0, boardCopy)) {
        setBoard(boardCopy);
        setMessage({ text: "Here is the solved Sudoku:", color: "text-green-600" });
      } else {
        setMessage({ text: "No solution exists for the given Sudoku", color: "text-red-600" });
      }
    } else {
      setMessage({ text: "Please enter a valid Sudoku", color: "text-orange-500" });
    }
  };

  const updateCell = (r, c, val) => {
    if (val === '' || /^[1-9]$/.test(val)) {
      const newBoard = board.map((row, ri) => row.map((cell, ci) => (ri === r && ci === c ? val : cell)));
      setBoard(newBoard);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Sudoku Solver</h1>
        
        
        <div className="grid grid-cols-9 border-4 border-slate-900 bg-slate-900 gap-[1px] mb-6 overflow-hidden">
          {board.map((row, r) => (
            row.map((cell, c) => (
              <input
                key={`${r}-${c}`}
                type="text"
                value={cell}
                onChange={(e) => updateCell(r, c, e.target.value)}
                className={`w-full h-10 sm:h-12 text-center text-lg font-medium outline-none bg-white focus:bg-blue-50 transition-colors
                  ${(c + 1) % 3 === 0 && c !== 8 ? 'border-r-4 border-slate-900' : ''} 
                  ${(r + 1) % 3 === 0 && r !== 8 ? 'border-b-4 border-slate-900' : ''}
                `}
              />
            ))
          ))}
        </div>

        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={handleSolve}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-transform active:scale-95 shadow-md"
          >
            Solve Puzzle
          </button>
          <button 
            onClick={() => { setBoard(Array(9).fill().map(() => Array(9).fill(''))); setMessage({text:'', color:''}); }}
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg transition-transform active:scale-95 shadow-md"
          >
            Clear
          </button>
        </div>

        
        <p className={`mt-6 text-center font-bold text-lg h-6 ${message.color}`}>
          {message.text}
        </p>
      </div>
    </div>
  );
}

export default App;