import { useEffect, useState, useCallback } from "react";
import {
  createClient,
  PhotosWithTotalResults,
  ErrorResponse,
  Photo,
} from "pexels";
import useDataStorage from "./useDataStorage";

interface CustomResponse extends PhotosWithTotalResults {
  photos: Photo[];
}

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const { visibleCards } = useDataStorage();

  const API_KEY = import.meta.env.VITE_PEXEL_API_KEY;
  const client = createClient(API_KEY);

  const numberOfPairs = 8;
  const query = "people";
  const orientation = "square";
  const size = "small";

  useEffect(() => {
    const getPhotos = () => {
      client.photos
        .search({
          query,
          orientation,
          per_page: numberOfPairs,
          size,
        })
        .then((res: PhotosWithTotalResults | ErrorResponse) => {
          const data = res as CustomResponse;
          const doubledPhotos = [...data.photos, ...data.photos];
          const shuffledPhotos = doubledPhotos.sort(() => Math.random() - 0.5);
          setPhotos(shuffledPhotos);
          localStorage.setItem("game", JSON.stringify(shuffledPhotos));
        })
        .catch((err) => console.log(err));
    };

    if (!visibleCards.length) {
      getPhotos();
    } else {
      const getGame = localStorage.getItem("game");
      const savedGame = getGame && JSON.parse(getGame);
      setPhotos(savedGame);
    }
  }, []);

  return photos;
};

export default useFetchPhotos;
