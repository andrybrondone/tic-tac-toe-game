import clsx from "clsx";

interface Props {
  className?: string;
  value: string;
  onClick: () => void;
}

function Tile({ className, value, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "cursor-pointer flex justify-center items-center text-7xl font-extrabold",
        value === "X" ? "text-secondary-blue" : "text-alert-warning",
        className
      )}
    >
      {value}
    </div>
  );
}

export default Tile;
