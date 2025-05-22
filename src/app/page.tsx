"use client";
import { Circle, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Player = "X" | "O" | null;
type Board = Player[];

const Board = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | "draw" | null>(null);

  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);

  const checkWinner = (board: Board): Player | "draw" | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        toast.success(`${board[a]} wins!`);
        return board[a];
      }
    }
    if (board.every((cell) => cell !== null)) {
      return "draw";
    }
    return null;
  };

  //handle player move
  const handleCellClick = (idx: number) => {
    if (!isPlayerTurn || board[idx] || winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[idx] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === "X") setPlayerScore((prev) => prev + 1);
      if (gameWinner === "O") setComputerScore((prev) => prev + 1);
    }
  };

  //computer move
  useEffect(() => {
    if (isPlayerTurn || winner) {
      return;
    }

    const timeOutId = setTimeout(() => {
      const newBoard = [...board];
      const emptyCells = newBoard
        .map((cell, index) => (cell === null ? index : null))
        .filter((index) => index !== null);
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      newBoard[emptyCells[randomIndex]] = "O";
      setBoard(newBoard);

      const gameWinner = checkWinner(newBoard);

      if (gameWinner) {
        setWinner(gameWinner);
        if (gameWinner === "X") {
          setPlayerScore((prev) => prev + 1);
        }
        if (gameWinner === "O") {
          setComputerScore((prev) => prev + 1);
        }
      }
      setIsPlayerTurn(true);
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [board, isPlayerTurn, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };
  const renderCell = (index: number) => {
    return (
      <button
        key={index}
        className={`w-full h-24 flex items-center justify-center text-4xl font-bold
                   ${board[index] === "X" ? "text-blue-600" : "text-red-600"}
                   ${
                     !board[index] && !winner && isPlayerTurn
                       ? "hover:bg-gray-200"
                       : ""
                   }
                   transition-colors duration-200 border border-gray-300 rounded-md`}
        onClick={() => handleCellClick(index)}
        disabled={!!board[index] || !!winner || !isPlayerTurn}
      >
        {board[index] === "X" ? <X /> : board[index] === "O" ? <Circle /> : ""}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center my-30">
      <div className="flex justify-between w-full max-w-md mb-8">
        <div className="flex items-center flex-col font-bold text-xl">
          Your Score(X): <span className="text-blue-500">{playerScore}</span>
        </div>
        <div className="flex items-center flex-col font-bold text-xl">
          Computer Score(O):{" "}
          <span className="text-red-500">{computerScore}</span>
        </div>
      </div>

      {winner ? (
        <div className="mt-4 text-xl font-bold">
          {winner === "draw" ? "It's- a draw!" : `${winner} wins!`}
        </div>
      ) : (
        <div className="grid grid-cols-3 min-w-52 sm:min-w-sm gap-2">
          {board.map((_, index) => renderCell(index))}
        </div>
      )}
      <button
        onClick={resetGame}
        className="mt-4 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {winner ? "Play Again" : "Reset Game"}
      </button>
    </div>
  );
};

export default Board;
