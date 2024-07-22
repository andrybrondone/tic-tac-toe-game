import clsx from "clsx";

interface Props {
  strikeClass: string;
}
function Strike({ strikeClass }: Props) {
  return <div className={clsx("strike bg-secondary", strikeClass)}></div>;
}

export default Strike;
