import React from 'react';

import { ModeToggle } from '@/components/ModeToggle/ModeToggle';
import { UserAuthForm } from '@/components/UserAuthForm';

export async function generateMetadata() {
  return {
    title: 'Authentication',
    description: 'Login form for Hack the Lab.',
  };
}

export default function Index() {
  return (
    <div className="container relative h-full flex-col items-center justify-center">
      <div className="">
        <div className="flex w-full justify-end">
          <ModeToggle />
        </div>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
              Sign In
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your username and password below to sign in to your account
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
