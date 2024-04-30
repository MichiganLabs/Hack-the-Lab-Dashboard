import { type ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { AppConfig } from '@/utils/AppConfig';

type IBaseTemplateProps = {
  leftNav: ReactNode;
  rightNav?: ReactNode;
  children: ReactNode;
};

const BaseTemplate = (props: IBaseTemplateProps) => {
  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      <div className="mx-auto flex min-h-screen max-w-screen-2xl flex-col">
        <header className="border-b border-gray-300">
          <div className="flex justify-between">
            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.leftNav}
              </ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.rightNav}
              </ul>
            </nav>
          </div>
        </header>

        <main className="grow">{props.children}</main>
        <Toaster />
        <footer className="border-t border-gray-300 py-4 text-center text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.name}.
        </footer>
      </div>
    </div>
  );
};

export { BaseTemplate };
