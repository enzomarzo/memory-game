import { IoPersonOutline, IoTimerOutline } from "react-icons/io5";
import { Photo } from "pexels";
import { Link, Outlet, useLocation } from "react-router-dom";
import Card from "../card/Card";
import useFetchPhotos from "../hooks/useFetchPhotos";
import classes from "./board.module.scss";
import timeFormatter from "../../utils/TimeFormatter";
import useBoard from "./useBoard";
import Button from "../foundation/button/Button";

const Board = () => {
  const { photos, isLoading } = useFetchPhotos();
  const { username, time, isGameFinished, onStartNewGame, onLogOut } =
    useBoard();
  const timeFormatted = timeFormatter(time);
  const location = useLocation();

  const highScoreLink = (
    <>
      <Link to="/game/highscores" state={{ background: location }}>
        Show Highscores
      </Link>
      <Outlet />
    </>
  );

  if (isLoading) {
    return <div className={classes.boardSpinner} />;
  }

  if (!isLoading && photos)
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
                    src={photo.src.medium}
                    alt={photo.alt || "pexels random image"}
                  />
                </div>
              );
            })}
          </div>
          <div className={classes.boardUserConfig}>
            <div className={classes.boardUserConfigUser}><IoPersonOutline size="1.1em" /> {username}</div>
            <div className={classes.boardUserConfigTimer}><IoTimerOutline size="1.1em" /> {timeFormatted} </div>
            {highScoreLink}
            <Button
              buttonAsLink
              additionalCSS={classes.boardUserConfigLogout}
              onClick={onLogOut}
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      We apologize for the inconvenience, but it seems that we are experiencing
      difficulties in uploading the photos at the moment
    </div>
  );
};

export default Board;
