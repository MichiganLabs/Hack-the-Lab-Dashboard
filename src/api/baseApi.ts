export const get = async (baseUrl: string, endpoint: string) => {
  const response = await fetch(`${baseUrl}${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const post = async (
  baseUrl: string,
  endpoint: string,
  body: any,
): Promise<Response> => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  /*   if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } */
  return response.json();
};
