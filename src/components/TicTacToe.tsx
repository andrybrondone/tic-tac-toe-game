import clsx from "clsx";
import { useEffect, useState } from "react";
import Header from "../ui/components/header/Header";
import { Typography } from "../ui/design-system/typography/Typography";
import Board from "./Board";
import GameState from "./GameState";
import Reset from "./Reset";

const PLAYER_X = "X";
const PLAYER_O = "O";

const winningCombinations = [
  // Rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  // Columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  // Diagonal
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(
  tiles: number[],
  scorePlayer1: number,
  scorePlayer2: number,
  draws: number,
  setScorePlayer1: (val: number) => void,
  setScorePlayer2: (val: number) => void,
  setDraws: (val: number) => void,
  setStrikeClass: (val: string) => void,
  setGameState: (val: number) => void
) {
  for (const { combo, strikeClass } of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      setStrikeClass(strikeClass);
      if (String(tileValue1) === PLAYER_X) {
        setGameState(GameState.playerXWins);
        setScorePlayer1(scorePlayer1 + 1);
      } else {
        setGameState(GameState.playerOWins);
        setScorePlayer2(scorePlayer2 + 1);
      }
      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    setGameState(GameState.draw);
    setDraws(draws + 1);
  }
}

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState("");
  const [gameState, setGameState] = useState(GameState.inProgress);
  const [draws, setDraws] = useState<number>(0);
  const [scorePlayer1, setScorePlayer1] = useState<number>(0);
  const [scorePlayer2, setScorePlayer2] = useState<number>(0);

  const handleTileClick = (index: number) => {
    if (gameState !== GameState.inProgress) {
      return;
    }

    if (tiles[index] !== null) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
    }
  };

  const handleContinue = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass("");
  };

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass("");
    setScorePlayer1(0);
    setScorePlayer2(0);
    setDraws(0);
  };

  useEffect(() => {
    checkWinner(
      tiles,
      scorePlayer1,
      scorePlayer2,
      draws,
      setScorePlayer1,
      setScorePlayer2,
      setDraws,
      setStrikeClass,
      setGameState
    );
  }, [tiles]);

  return (
    <div className="flex items-center justify-center min-h-[100vh] max-sm:w-full px-5">
      <div className="select-none flex flex-col justify-center items-center pb-10 bg-gray-900 rounded shadow-xl w-[500px] max-sm:w-full">
        <Header />
        <Typography
          variant="body-base"
          component="div"
          weight="bold"
          className="flex gap-7 flex-wrap items-center justify-center"
        >
          <p>Joueur X : {scorePlayer1}</p> |<p>Joueur O : {scorePlayer2}</p> |
          <p>Match nul : {draws}</p>
        </Typography>
        <Board
          tiles={tiles}
          onTileClick={handleTileClick}
          strikeClass={strikeClass}
        />

        {gameState === GameState.inProgress && (
          <Typography>
            Joueur{" "}
            <span
              className={clsx(
                playerTurn === PLAYER_X
                  ? "text-secondary-blue"
                  : "text-alert-warning",
                "font-extrabold"
              )}
            >
              {playerTurn}
            </span>
          </Typography>
        )}
        <Reset
          gameState={gameState}
          onReset={handleReset}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}

export default TicTacToe;
