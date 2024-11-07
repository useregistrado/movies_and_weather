export interface MovieType {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  location: {
    latitude: null | number,
    longitude: null | number,
  };
  city: string;
}