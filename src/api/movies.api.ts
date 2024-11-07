/**
 * makes a request to the movies API to search for movies based on a given title and returns the API response.
 * @param title movie title
 * @returns api response. List of movies
 */
export const searchMovies = async (title: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIES_API_URL}search/movie?query=${title}&include_adult=false&language=en-US&page=1`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MOVIES_TOKEN}`,
      'Content-Type': 'application/json',
    },})
  return response;
}

/**
 * makes a request to the movies API to retrieve the details of a specific movie by its ID and returns the API response.
 * @param id id movie
 * @returns Specific movie
 */
export const searchOneMovie = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIES_API_URL}movie/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MOVIES_TOKEN}`,
      'Content-Type': 'application/json',
    },})
  return response;
}