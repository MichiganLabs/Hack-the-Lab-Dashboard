import { useClerk } from '@clerk/clerk-react';
import React from 'react';

import { Env } from '@/libs/Env.mjs';

export default function useChat() {
  const { session } = useClerk();
  const [height, setHeight] = React.useState(0);
  const [src, setSrc] = React.useState('');

  const sdktoken = session?.user?.id;
  const uid = session?.user?.username;
  const imChatAuth =
    (sdktoken && uid && `sdktoken:${sdktoken},uid:${uid}`) || '';

  React.useEffect(() => {
    setHeight(window.innerHeight);
    setSrc(`${Env.NEXT_PUBLIC_IM_CHAT_ENDPOINT}?${Date.now()}`);
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    height,
    src,
    imChatAuth,
  };
}
