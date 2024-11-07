'use client';
import { SetStateAction, useEffect, useState } from "react";
import styles from "./page.module.css";
import { searchMovies } from "@/api/movies.api";
import { MovieCard } from "./components/MovieCard";
import { MovieType } from "./types";
import { cities } from './consts';

/**
 * The Home component serves as the main page of a movie application, 
 * allowing users to search for movies by title and display information based on the user's geographical location. 
 * It uses the movie API to fetch results according to the entered title. 
 * If geolocation is unavailable, it displays an error message and lets the user manually select a city from a dropdown list.
 * @returns Main page /
 */
export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [title, setTitle] = useState('Manta manta'); // Default value
  const [location, setLocation] = useState<{ latitude: null | number, longitude: null | number }>({ latitude: null, longitude: null });
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('null')

  /**
   * The getLocation function attempts to obtain the user's geographical location using the browser's geolocation API.
   */
  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setError('Location could not be accessed');
          setCity('Berlin')
        }
      );
    } else {
      setError('Geolocation not supported by the browser');
      setCity('Berlin')
    }
  };

  /**
   * It searches for movies using the provided title and updates the movies state with the obtained results. 
   * Manta manta is default title.
   */
  useEffect(() => {
    const getData = async () => {
      const response = await searchMovies(title);
      setMovies((await response.json()).results);
    };
    getData();
  }, [title]);

  useEffect(() => {
    getLocation()
  }, [])

  /**
   * handles the change in the title input value
   * @param event input value
   */
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setCity(event.target.value);
  };

  /**
   * renders and returns the data obtained from the API
   */
  return (
    <section>
      <input onChange={(e) => { setTitle(e.target.value) }} type="text" name="name" placeholder="Enter title" />
      {error &&
        (
          <>
            <label>Select your city</label>
            <select name="cities" id="city-select" value={city} onChange={handleChange}>

              {cities.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </>
        )}
      {location.latitude && location.longitude && (
        <p>Location: Lat {location.latitude}, Lon {location.longitude}</p>
      )}

      {error && <p>{error}</p>}

      <div className={styles.page}>
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              original_title={movie.original_title}
              id={movie.id}
              overview={movie.overview}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              location= {location}
              city={city}
            />
          );
        })}
      </div>
    </section>
  );
}
