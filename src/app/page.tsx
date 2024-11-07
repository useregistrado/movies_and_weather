'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { searchMovies } from '@/api/movies.api';
import { MovieCard } from './components/MovieCard';
import { MovieType } from './types';

export default function Home() {
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState('Manta manta'); // Manta manta is default value

  useEffect(() => {
    const getData = async () => {
      const response = await searchMovies(title)
      setMovies((await response.json()).results);
    }
    getData()
  }, [title])
  
  return (
    <section>
      <input onChange={(e) => {setTitle(e.target.value)}} type="text" name="name" placeholder="Enter title"/>
      <div className={styles.page}>
        {movies.map((movie: MovieType) => {
          return (<MovieCard key={movie.id} original_title={movie.original_title} id={movie.id} overview={movie.overview} poster_path={movie.poster_path} release_date={movie.release_date} />)
        })}
      </div>
    </section>
  );
}
