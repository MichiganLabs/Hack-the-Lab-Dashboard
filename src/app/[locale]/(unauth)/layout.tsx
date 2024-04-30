'use client';

import LocaleSwitcher from '@/components/LocaleSwitcher';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseTemplate
      leftNav={
        <>
          <div />
          {/*
          <Link
            className={buttonVariants({ variant: 'ghost' })}
            href="/dashboard"
            passHref
          >
            Database
          </Link> */}
        </>
      }
      rightNav={
        <>
          {/* <UserButton /> */}
          <LocaleSwitcher />
        </>
      }
    >
      <div className="h-full w-full py-0 text-xl [&_a:hover]:border-b-2 [&_a:hover]:border-blue-700 [&_a]:text-blue-700">
        {children}
      </div>
    </BaseTemplate>
  );
}
