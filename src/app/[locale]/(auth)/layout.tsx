'use client';

import { BaseTemplate } from '@/templates/BaseTemplate';

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseTemplate leftNav={null} rightNav={null}>
      <div className="py-5 text-xl [&_a:hover]:border-b-2 [&_a:hover]:border-blue-700 [&_a]:text-blue-700 [&_p]:my-6 [&_ul]:my-6">
        {children}
      </div>
    </BaseTemplate>
  );
}
