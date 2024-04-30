import { AppConfig } from '@/utils/AppConfig';

import { setToken } from './cookies';

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    email,
    password,
    returnSecureToken: true,
  });

  const requestOptions = {
    method: 'POST',
    headers,
    body: raw,
  };

  const result = await fetch(
    `${AppConfig.api.firebase_authentication}${AppConfig.api.firebase_web_apikey}`,
    requestOptions,
  );
  if (result.ok) {
    const resultPayload = await result.json();
    setToken(resultPayload.idToken);
    return '';
  }
  switch (result.status) {
    case 400:
    case 401:
      return 'Invalid credentials';
    default:
      return 'Unknown error';
  }
};
