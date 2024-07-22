import { Button } from "../ui/design-system/button/Button";
import GameOver from "./GameOver";
import GameState from "./GameState";

interface Props {
  gameState: number;
  onReset: () => void;
  onContinue: () => void;
}
function Reset({ gameState, onReset, onContinue }: Props) {
  if (gameState === GameState.inProgress) {
    return;
  }
  return (
    <>
      <GameOver gameState={gameState} />
      <div className="flex items-center gap-5 justify-between mt-8">
        <Button variant="secondary" action={onContinue}>
          Continuer
        </Button>
        <Button variant="delete" action={onReset}>
          Réinitialiser
        </Button>
      </div>
    </>
  );
}

export default Reset;
