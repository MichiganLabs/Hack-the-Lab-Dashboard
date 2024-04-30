/* eslint-disable no-promise-executor-return */
/* eslint-disable react/jsx-pascal-case */

'use client';

import { useSignIn } from '@clerk/nextjs';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/libs/utils';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [status, setStatus] = React.useState<string>('');
  const router = useRouter();
  const { signIn, setActive } = useSignIn();

  const onSubmit = async (event: React.SyntheticEvent) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const result = await signIn?.create({
        identifier: username,
        password,
      });
      if (result?.status === 'complete' && setActive) {
        await setActive({ session: result.createdSessionId });
        router.push('/dashboard');
      }
      setStatus(`${result?.status}`);
    } catch (error) {
      const jsonPart = `${error}`.split('Serialized errors: ')[1];
      const errorObject = JSON.parse(jsonPart || '{}');

      setStatus(`${errorObject?.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <p className="text-sm text-red-500">{status || '\u00A0'}</p>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              value={username}
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              value={password}
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
          {/* <Button
            disabled={isLoading}
            onClick={() => {
              setUsername('test');
              setPassword('12345678');
            }}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            test login
          </Button> */}
        </div>
      </form>
    </div>
  );
}
