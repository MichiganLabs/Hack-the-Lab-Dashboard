/* eslint-disable react/no-array-index-key */

'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import EditUserDialog from './EditUserDialog';
import useUserList from './useUserList';

export default function UserList() {
  const [createUserOpen, setCreateUserOpen] = useState(false);

  const onCreateUserSuccess = () => {
    toast('User created successfully');
    setCreateUserOpen(false);
  };
  const userList = useUserList({
    onCreateUserSuccess,
  });

  useEffect(() => {
    userList.getUsers({ dashboard: true });
  }, [userList.currentPage]);

  // const data = (userList.data as any)?.data;

  const data = [
    {
      id: '1',
      username: 'admin',
      userType: 'Admin',
    },
    {
      id: '2',
      username: 'user',
      userType: 'Participant',
    },
  ];

  // const totalCount = (userList.data as any)?.totalCount;
  // const totalPages = Math.ceil(parseInt(`${totalCount}`, 10) / 10);
  const [open, setOpen] = useState(false);
  const [updatedItem, setUpdatedItem] = useState<any>({});

  return (
    <div>
      <div className="my-1 flex flex-row flex-wrap items-center gap-1" />
      <EditUserDialog
        open={open}
        setOpen={(value: boolean) => {
          setOpen(value);
        }}
        initialValues={updatedItem}
        updateUser={userList.updateUser}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="flex items-center justify-center" />
              <TableHead>ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data
              ? null
              : data.map((item: any, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="flex items-center justify-center">
                        <Button
                          onClick={() => {
                            setUpdatedItem({
                              ...item,
                              userType: item.userType.split(','),
                            });
                            setOpen(true);
                          }}
                        >
                          Update User
                        </Button>
                      </TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.userType}</TableCell>
                      <TableCell>
                        <ConfirmDeleteDialog
                          username={item.username}
                          deleteStaff={userList.deleteUser}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </EditUserDialog>
    </div>
  );
}
