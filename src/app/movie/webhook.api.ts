/**
 * sends data to a webhook via a POST request. 
 * It takes a data object as an argument, converts it to JSON format, and sends it to the endpoint specified in the NEXT_PUBLIC_WEBHOOK variable. 
 * Finally, it returns the request response.
 * @param data data such as structured format
 * @returns webhook response
 */
export const sendToWebhook = async (data: object) => {  
  const response = await fetch(`${process.env.NEXT_PUBLIC_WEBHOOK}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)})
    
  return response;
}