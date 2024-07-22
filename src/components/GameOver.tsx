import clsx from "clsx";
import GameState from "./GameState";

interface Props {
  gameState: number;
}

const className =
  "text-white text-xl font-bold w-[90%] text-center py-2 rounded";

function GameOver({ gameState }: Props) {
  switch (gameState) {
    case GameState.inProgress:
      return <></>;

    case GameState.playerOWins:
      return (
        <div className={clsx(className, "bg-primary")}>Le joueur O a gagné</div>
      );

    case GameState.playerXWins:
      return (
        <div className={clsx(className, "bg-primary")}>Le joueur X a gagné</div>
      );

    case GameState.draw:
      return (
        <div className={clsx(className, "bg-alert-warning/90")}>Match nul</div>
      );

    default:
      return <></>;
  }
}

export default GameOver;
