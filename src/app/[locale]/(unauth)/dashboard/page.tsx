'use client';

import { ModeToggle } from '@/components/ModeToggle/ModeToggle';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserList from '@/components/UserList/UserList';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Dashboard() {
  const [storedValue, setValue] = useLocalStorage({
    key: 'currentTab',
    initialValue: 'users',
  });

  if (!storedValue) {
    return null;
  }

  return (
    <div className="h-full w-full p-1">
      <Tabs className="w-full" defaultValue={storedValue}>
        <div className="flex justify-between">
          <div className="flex flex-1 justify-center">
            <TabsList className="flex gap-4">
              <TabsTrigger value="users" onClick={() => setValue('users')}>
                Users
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex items-center justify-center">
              <ModeToggle />
            </div>
            <div className="flex items-center justify-center">
              <Button className="h-8" variant="secondary" onClick={() => {}}>
                Log Out
              </Button>
            </div>
          </div>
        </div>
        <TabsContent value="users">
          <UserList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
