interface ScoreProps {
  score: number;
  increment: () => void;
  decrement: () => void;
  type: "vertical" | "horizontal";
}

export default function Score({
  score,
  increment,
  decrement,
  type,
}: ScoreProps) {
  return (
    <div className={"score " + type}>
      <h4 className="sign" onClick={() => increment()}>
        +
      </h4>
      <h4>{score}</h4>
      <h4 className="sign" onClick={() => decrement()}>
        -
      </h4>
    </div>
  );
}
