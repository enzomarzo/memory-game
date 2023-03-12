import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useDataStorage, { IScore } from "../hooks/useDataStorage";
import classes from "./highscores.module.scss";
import Button from "../foundation/button/Button";
import timeFormatter from "../../utils/TimeFormatter";

const Highscores = () => {
  const { scores } = useDataStorage();
  const navigate = useNavigate();

  const sortedScores = useMemo(
    () => scores.sort((a: IScore, b: IScore): number => a.time - b.time),
    [scores]
  );

  return (
    <div className={classes.highscores}>
      <div className={classes.highscoresModal}>
        <Button
          additionalCSS={classes.highscoresModalButton}
          onClick={() => navigate(-1)}
        >
          Close
        </Button>
        <h2>Highscores</h2>
        {sortedScores.map((score: IScore, i: number) => (
          <div className={classes.highscoresModalList}>
            <div># {i + 1}</div>
            <div>{score.username}</div>
            <div>{timeFormatter(score.time)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highscores;
