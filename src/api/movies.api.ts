export const searchMovies = async (title: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIES_API_URL}search/movie?query=${title}&include_adult=false&language=en-US&page=1`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MOVIES_TOKEN}`,
      'Content-Type': 'application/json',
    },})
  return response;
}