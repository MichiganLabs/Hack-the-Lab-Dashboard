'use client';

import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  params: { locale },
}: {
  error: Error & { digest?: string };
  params: { locale: string };
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(error);
  }, [error]);

  return (
    <html lang={locale}>
      <body>
        {/* This is the default Next.js error component but it doesn't allow omitting the statusCode property yet. */}
        <Error statusCode={undefined as any} />
      </body>
    </html>
  );
}
