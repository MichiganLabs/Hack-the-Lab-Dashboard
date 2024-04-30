/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { camelCaseToTitleCase } from '@/utils/strings';

const formSchema = z.object({
  apiKey: z.string().min(2).optional(),
  userType: z.string().min(2).optional(),
});

interface EditUserDialogProps {
  updateUser: (body?: any) => Promise<void>;
  initialValues: z.infer<typeof formSchema>;
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function EditUserDialog(props: EditUserDialogProps) {
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false);
  // const new_username = (props.initialValues as any).username;

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: async (data, context, options) => {
      return zodResolver(formSchema)(data, context, options);
    },

    defaultValues: {
      ...props.initialValues,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitDisabled(true);
    const updatedData = {
      ...values,
    };
    props.updateUser(updatedData).then(() => {
      setIsSubmitDisabled(false);
      props.setOpen(false);
    });
    form.reset();
  };

  useEffect(() => {
    form.reset(props.initialValues);
    form.trigger();
  }, [props.open, props.initialValues, form]);

  return (
    <Dialog open={props.open}>
      {props.children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Participant - {(props.initialValues as any).username}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              onSubmit(form.getValues());
              e.preventDefault();
            }}
            className="grid grid-cols-2 gap-4"
          >
            {Object.keys(formSchema.shape).map((key) => {
              const title = camelCaseToTitleCase(key);
              return (
                <FormField
                  key={key}
                  control={form.control}
                  name={key as any}
                  render={({ field }) => {
                    if (key === 'userType') {
                      return (
                        <FormItem>
                          <FormLabel>{title}</FormLabel>
                          <FormControl>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={field.value === 'Admin'}
                                  onCheckedChange={(checked) => {
                                    if (checked) field.onChange('Admin');
                                  }}
                                />
                                <Label htmlFor="inactive">Admin</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={field.value === 'Participant'}
                                  onCheckedChange={(checked) => {
                                    if (checked) field.onChange('Participant');
                                  }}
                                />
                                <Label htmlFor="inactive">Participant</Label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }

                    if (key === 'userCode') {
                      return (
                        <FormItem>
                          <FormLabel className="flex flex-col gap-1">
                            {title}{' '}
                            <div className="font-light">
                              Unique for each user. This defines the middle
                              section of the case number. By default it's
                              automatically the next available number.
                            </div>
                            <div className="flex flex-row items-center gap-1 font-light">
                              Example:
                              <div className="rounded-md bg-gray-200 p-1">
                                US-{field.value}-1234
                              </div>
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={`Enter ${title}`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }
                    if (key === 'password') {
                      return (
                        <FormItem>
                          <FormLabel>Update {title}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter new password"
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }
                    if (key === 'new_username') {
                      return (
                        <FormItem>
                          <FormLabel>Update Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter new username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }
                    if (key === 'remarks') {
                      return (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter notes" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }
                    return (
                      <FormItem>
                        <FormLabel>{title}</FormLabel>
                        <FormControl>
                          <Input placeholder={`Enter ${key}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              );
            })}
            <DialogClose asChild>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  props.setOpen(false);
                  form.reset();
                }}
              >
                Close
              </Button>
            </DialogClose>
            <Button
              disabled={isSubmitDisabled}
              type={
                Object.keys(form.formState.errors).length === 0
                  ? 'submit'
                  : 'button'
              }
              variant={
                Object.keys(form.formState.errors).length === 0
                  ? 'default'
                  : 'destructive'
              }
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
