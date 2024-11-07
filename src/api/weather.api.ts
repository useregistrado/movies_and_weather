/**
 * makes a request to the weather API to obtain historical weather data for a specific date. 
 * It uses the latitude (lat) and longitude (lon) coordinates along with the date (date) to retrieve the day's maximum and minimum temperatures. 
 * It then returns the API response.
 * @param lat latitude
 * @param lon longitude
 * @param date date
 * @returns weather response
 */
export const getWeather = async (lat: number, lon: number, date:string) => {  
  const response = await fetch(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}archive?latitude=${lat}&longitude=${lon}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,temperature_2m_min`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MOVIES_TOKEN}`,
      'Content-Type': 'application/json',
    },})
    
    
  return response;
}