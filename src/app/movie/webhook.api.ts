export const sendToWebhook = async (data: object) => {  
  const response = await fetch(`${process.env.NEXT_PUBLIC_WEBHOOK}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)})
    
  return response;
}