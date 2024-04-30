import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ConfirmDeleteDialogProps {
  username: string;
  deleteStaff: (body?: any) => Promise<void>;
}
export default function ConfirmDeleteDialog(props: ConfirmDeleteDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Confirm Delete User?</DialogTitle>
        </DialogHeader>
        <div>Are you sure you want to delete this user?</div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            onClick={() => {
              setOpen(false);
              props.deleteStaff({
                username: props.username,
              });
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
