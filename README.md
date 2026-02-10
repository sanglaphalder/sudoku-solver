# 🧩 Modern Sudoku Solver

A high-performance Sudoku solver built with **React** and **Tailwind CSS**, powered by a robust **Backtracking Algorithm** originally developed in C++.

![Sudoku Solver Preview](https://via.placeholder.com/800x400?text=Sudoku+Solver+Interface+Preview)

## 🚀 Features

- **C++ Logic in Web:** Features a direct port of a high-efficiency C++ backtracking algorithm.
- **Two-Step Validation:** - **Pre-Check:** Validates the initial board state for Sudoku rule violations (duplicates in rows/cols/subgrids).
  - **Recursive Solver:** Finds the solution using an optimized depth-first search.
- **Modern UI:** Built with React and styled with Tailwind CSS for a sleek, responsive experience.
- **Visual 3x3 Grid:** Clearly defined subgrids for better readability, just like a real Sudoku puzzle.
- **Dynamic Feedback:** Color-coded status messages for "Solved", "Invalid Input", and "No Solution".

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Algorithm:** Backtracking (Recursive DFS)

## 🧠 How the Algorithm Works

The solver uses a classic backtracking approach, which can be visualized as a decision tree:

1. **Find** the next empty cell `(r, c)`.
2. **Try** placing digits 1-9 in that cell.
3. **Validate** if the digit follows Sudoku rules (using `isValidPlacement`).
4. **Recursive Step:** Move to the next cell.
5. **Backtrack:** If a digit leads to an impossible state, the algorithm removes it and tries the next number.

