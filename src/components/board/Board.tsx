import Card from "../card/Card";
import useFetchPhotos from "../hooks/useFetchPhotos";
import classes from "./board.module.scss";
import { Photo } from "pexels";
import { useContext, useEffect } from "react";
import { Context } from "../context/Context";

const Board = () => {
  const photos = useFetchPhotos();
  const { state, dispatch } = useContext(Context);

  if (!photos) {
    return <div>There is no photos </div>;
  }

  return (
    <div className={classes.board}>
      {photos.map((photo: Photo, i) => {
        const cardUniqueId = photo.id + i;
        return (
          <div key={cardUniqueId} className={classes.boardCard}>
            <Card
              photoId={photo.id}
              src={photo.src.small}
              alt={photo.alt || "pexels random image"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Board;
