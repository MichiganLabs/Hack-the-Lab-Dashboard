/* eslint-disable no-promise-executor-return */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useClerk } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

import { Env } from '@/libs/Env.mjs';

interface APIProps {
  ENDPOINT: string;
  METHOD: string;
  currentPage?: number;
  pageSize?: number;
  shouldFetch?: boolean;
  onComplete?: (response: any) => void;
  onError?: (message: string) => void;
}
export default function useAPI(props: APIProps) {
  const { session } = useClerk();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  const triggerAPICall = async (
    body?: any,
    retryCount: number = 0,
  ): Promise<void> => {
    const token = await session?.getToken();
    if (!token) {
      console.log('No token found');
      return;
    }
    const url = new URL(`${Env.NEXT_PUBLIC_DATABASE_URL}${props.ENDPOINT}`);
    if (props.currentPage)
      url.searchParams.append('currentPage', `${props.currentPage}`);
    if (props.pageSize)
      url.searchParams.append('pageSize', `${props.pageSize}`);

    try {
      const options: RequestInit = {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(body instanceof FormData
            ? {}
            : { 'Content-Type': 'application/json' }),
        },
        method: props.METHOD,
      };

      if (body instanceof FormData) {
        options.body = body;
      } else {
        options.body = JSON.stringify(body);
      }

      let response: any;
      try {
        response = await fetch(url, options);

        if (response.status === 503 && retryCount < 30) {
          console.log('503 response, retrying in 4 seconds...');
          await new Promise((resolve) => setTimeout(resolve, 4000));
          return await triggerAPICall(body, retryCount + 1);
        }
      } catch (retryError) {
        if ((retryError as Error).name === 'TypeError' && retryCount < 30) {
          console.log('Connection refused, retrying in 4 seconds...');
          await new Promise((resolve) => setTimeout(resolve, 4000));
          return triggerAPICall(body, retryCount + 1);
        }
      }

      console.log('API call made', url.pathname);

      let responseData;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
        if (!response.ok) {
          throw new Error(`${responseData.error}`);
        }
      } else {
        responseData = await response.blob();
        const blobUrl = URL.createObjectURL(responseData);
        responseData = blobUrl;
      }
      setData({ ...responseData });

      if (!response.ok) {
        throw new Error(`${responseData.error}`);
      }

      if (props.onComplete) {
        props.onComplete(responseData);
      }
    } catch (responseError) {
      if (props.onError) {
        setError(`${responseError}`);
        props.onError(`${responseError}`);
      } else {
        throw new Error(`${responseError}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (!props.shouldFetch) return;
      await triggerAPICall();
    })();
  }, [
    props.currentPage,
    session,
    props.pageSize,
    props.ENDPOINT,
    props.shouldFetch,
  ]);

  return { data, loading, error, triggerAPICall };
}
