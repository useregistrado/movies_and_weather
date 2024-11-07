/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { searchOneMovie } from '@/api/movies.api';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import NotFound from '@/app/not_found.svg'
import { cities } from '../consts';
import { getWeather } from '@/api/weather.api';
import { sendToWebhook } from './webhook.api';

export default function ParamsComponent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 1058100; // 1058100 default movie
  const [city, setCity] = useState<string>(searchParams.get('city') || 'null'); // Berlin default city
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const [movie, setMovie] = useState<any>();
  const [data, setData] = useState<any>({
    candidate: 'Oscar Yesid Vargas Pedraza',
    original_title: '',
    title: '',
    genres: [],
    release_date: ''
  });
  const [webhookResponse, setWebhookResponse] = useState('');
  const [src, setSrc] = useState(NotFound);


  useEffect(() => {
    const getDataMovie = async () => {
      const response = await searchOneMovie(+id);
      const movie = await response.json();
      setMovie(movie);
      setSrc(`${process.env.NEXT_PUBLIC_MOVIES_IMAGES}${movie.poster_path}`);
      const movieAndWeatherData = {
        candidate: 'Oscar Yesid Vargas Pedraza',
        original_title: movie?.original_title || '',
        title: movie?.original_title || '',
        genres: movie?.genres || [],
        release_date: movie?.release_date || '',
        max_temperature: '',
        min_temperature: ''
      }
      setData(movieAndWeatherData);
    };


    getDataMovie();
  }, []);

  useEffect(() => {
    const getDataWeather = async (city: string) => {

      let weather = null
      if (lat === 'null' || lon === 'null' || !lat || !lon) {


        const cityInfo = cities.find((value) => { return value.name == city }) || cities[0];

        const response = await getWeather(cityInfo?.coordinates.lat, cityInfo?.coordinates.lon, movie.release_date);
        weather = await response.json()

      } else {
        const response = await getWeather(parseFloat(lat), parseFloat(lon), movie.release_date);
        weather = await response.json()
      }
      const additionalData = {
        ...data,
        max_temperature: `${weather?.daily?.temperature_2m_max[0] || 'unknown'}${weather?.daily_units?.temperature_2m_max || ''}`,
        min_temperature: `${weather?.daily?.temperature_2m_min[0] || 'unknown'}${weather?.daily_units?.temperature_2m_min || ''}`
      }

      setData(additionalData);
    };


    getDataWeather(city);
  }, [movie])


  console.log(JSON.stringify(data));

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Image
        src={src}
        height={200}
        width={500}
        style={{ width: 'auto', height: '400px' }}
        alt="Picture"
        onError={() => setSrc(NotFound)}
      />
      <div style={{ marginLeft: '50px' }}>
        {city === 'null' && (<p>coordinates used for the search ---- lat: {lat} lon: {lon}</p>)}
        {city !== 'null' && (<p>city used for the search: <span style={{ fontWeight: 'bold' }}>{city}</span></p>)}
        <h1>Movie info</h1>
        <p>original title: {data.original_title}</p>
        <p>title: {data.title}</p>

        <p>genre(s): {data.genres.map((genre: any) => <span key={genre}>{genre?.name + ' | ' || 'unknown'}</span>)}</p>
        <p>release date: {data.release_date}</p>
        <br></br>
        <h2>Weather info</h2>
        <p>max temperature: {data.max_temperature}</p>
        <p>min temperature: {data.min_temperature}</p>
        <br></br>
        <button onClick={async () => {
          const response = await (await sendToWebhook(data)).json()
          setWebhookResponse(response.status)
        }}>Send data to webhook</button>
        <span>{webhookResponse}</span>
      </div>
    </div>
  );
}
