import { Photo } from "pexels";
import Card from "../card/Card";
import useFetchPhotos from "../hooks/useFetchPhotos";
import classes from "./board.module.scss";
import { timeFormatter } from "../../utils/TimeFormatter";

import useBoard from "./useBoard";
import { Link, Outlet, useLocation } from "react-router-dom";
import Button from "../foundation/button/Button";

const Board = () => {
  const photos = useFetchPhotos();
  const { username, time, isGameFinished, onStartNewGame } = useBoard();
  const timeFormatted = timeFormatter(time);

  const highScoreLink = (
    <>
      <Link to="/game/highscores" state={{ background: location }}>
        Show Highscores
      </Link>
      <Outlet />
    </>
  );

  if (!photos) {
    return <div>Sorry, we couldn't upload the photos </div>;
  }

  return (
    <div>
      {isGameFinished && (
        <div className={classes.boardWinner}>
          <h3>Congratulations we have a winner</h3>
          <div className={classes.boardWinnerAction}>
            <div>{highScoreLink}</div>
            <div>
              <Button buttonAsLink onClick={onStartNewGame}>
                Start new game
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className={classes.board}>
        <div className={classes.boardGame}>
          {photos.map((photo: Photo, i) => {
            const cardUniqueId = photo.id + (i + 1);
            return (
              <div key={cardUniqueId} className={classes.boardGameCard}>
                <Card
                  cardUniqueId={cardUniqueId}
                  photoId={photo.id}
                  src={photo.src.small}
                  alt={photo.alt || "pexels random image"}
                />
              </div>
            );
          })}
        </div>
        <div className={classes.boardUserConfig}>
          <div>{username}</div>
          <div>Timer: {timeFormatted} </div>
          {highScoreLink}
          <div>Log out </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
