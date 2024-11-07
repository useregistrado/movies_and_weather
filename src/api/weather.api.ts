export const getWeather = async (lat: number, lon: number, date:string) => {  
  const response = await fetch(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}archive?latitude=${lat}&longitude=${lon}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,temperature_2m_min`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MOVIES_TOKEN}`,
      'Content-Type': 'application/json',
    },})
    
    
  return response;
}