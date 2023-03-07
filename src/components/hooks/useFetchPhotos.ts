import { useEffect, useState } from "react";

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState();
  const API_KEY = import.meta.env.VITE_PEXEL_API_KEY;

  useEffect(() => {
    const getPhotos = async () => {
      await fetch("https://api.pexels.com/v1/search?query=people", {
        headers: { Authorization: API_KEY },
      })
        .then((res) => res.json())
        .then((res) => setPhotos(res));
    };

    getPhotos();
  }, []);

  return photos;
};

export default useFetchPhotos;
