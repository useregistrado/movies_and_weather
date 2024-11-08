import { MovieType } from "../types";
import Image from 'next/image'
import NotFound from '@/app/not_found.svg'
import { useState } from "react";
import Link from "next/link";

export const MovieCard = ({ original_title, poster_path, overview, release_date, id, city, location }: MovieType) => {
  const [src, setSrc] = useState(`${process.env.NEXT_PUBLIC_MOVIES_IMAGES}${poster_path}`);

  return (
    <div style={{ width: 300, marginBottom: 10 }}>
      <Link
      href={`/movie/?id=${id}&city=${city}&lat=${location.latitude}&lon=${location.longitude}`}>
        <Image
          src={src}
          height={200}
          width={500}
          style={{ width: 'auto', height: '200px' }}
          alt="Picture"
          onError={() => setSrc(NotFound)}
        />
      </Link>
      <h2>{original_title}</h2>
      <p>{release_date}</p>
      <p className="overview">{overview}</p>
    </div>
  );
}