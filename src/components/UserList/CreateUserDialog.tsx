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
  DialogTrigger,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { camelCaseToTitleCase } from '@/utils/strings';

import useUserList from './useUserList';

const formSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(8),
  userCode: z.string().min(1),
  userType: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one user type.',
  }),
  // scanWithoutReview: z.enum(['yes', 'no']),
  country: z.enum(['US', 'IR']),
  phone: z.string(),
  companyName: z.string(),
  accountNumber: z.string(),
  address: z.string(),
});

interface CreateUserDialogProps {
  createStaff: (body?: any) => Promise<void>;
  createStaffError: string | null | undefined;
  open: boolean;
  setOpen: (value: boolean) => void;
  countryListData: any;
  updateProfilePicture: (body: any) => Promise<void>;
}
export default function CreateUserDialog(props: CreateUserDialogProps) {
  const [submitButtonEnabled, setSubmitButtonEnabled] = React.useState(true);
  const [file, setFile] = React.useState<File | null>(null);

  const userList = useUserList({
    onCreateUserSuccess: () => {
      props.setOpen(false);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: async (data, context, options) => {
      return zodResolver(formSchema)(data, context, options);
    },
    defaultValues: {
      username: '',
      password: '',
      userCode: `${Math.floor(Math.random() * 9000) + 1000}`,
      userType: [], // ['reviewer', 'dealer'],
      // scanWithoutReview: 'no',
      country: 'US',
      phone: '',
      companyName: '',
      accountNumber: '',
      address: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitButtonEnabled(false);
    const updatedData = {
      ...values,
      userType: values.userType.join(','),
    };
    /* toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">
          {JSON.stringify(updatedData, null, 2)}
        </code>
      </pre>,
    ); */
    props.createStaff(updatedData).then(() => {
      if (file) {
        const formData = new FormData();
        formData.append('userCode', values.userCode);
        formData.append('file', file);
        props.updateProfilePicture(formData).then(() => {
          setSubmitButtonEnabled(true);
          props.setOpen(false);
        });
      } else {
        setSubmitButtonEnabled(true);
      }
    });
  };

  useEffect(() => {
    if (props.open) {
      userList.getAvailableUserCode();
    }
    form.trigger();
    form.reset();
  }, [props.open]);

  useEffect(() => {
    if (userList.availableUserCodeData) {
      form.setValue(
        'userCode',
        (userList.availableUserCodeData as any).nextAvailableId,
      );
    }
  }, [userList.availableUserCodeData]);

  const profilePicture = 'assets/images/person.circle.svg';

  return (
    <Dialog open={props.open}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          onClick={() => {
            props.setOpen(true);
          }}
        >
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User Form</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-2 text-sm text-gray-600">
          <img src={profilePicture} alt="" className="h-20 w-20 rounded-full" />
          <div className="flex flex-col items-center justify-center gap-1">
            <div>Upload profile picture</div>
            <Input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const eventFile = event.target.files?.[0];
                if (eventFile) {
                  setFile(eventFile);
                }
              }}
            />
          </div>
        </div>
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
                    if (key === 'scanWithoutReview') {
                      return (
                        <FormItem>
                          <FormLabel>{title}</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="yes" />
                                <Label htmlFor="yes">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="no" />
                                <Label htmlFor="no">No</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }
                    if (key === 'userType') {
                      return (
                        <FormItem>
                          <FormLabel>{title}</FormLabel>
                          <FormControl>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={field.value?.includes('admin')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          'admin',
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value: string) =>
                                              value !== 'admin',
                                          ),
                                        );
                                  }}
                                />
                                <Label htmlFor="inactive">Admin</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={field.value?.includes('reviewer')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          'reviewer',
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value: string) =>
                                              value !== 'reviewer',
                                          ),
                                        );
                                  }}
                                />
                                <Label htmlFor="inactive">Reviewer</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={field.value?.includes('dealer')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          'dealer',
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value: string) =>
                                              value !== 'dealer',
                                          ),
                                        );
                                  }}
                                />
                                <Label htmlFor="inactive">Dealer</Label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }
                    if (key === 'country') {
                      return (
                        <FormItem>
                          <FormLabel>{title}</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.values(props.countryListData).map(
                                  (item: any, index: number) => {
                                    return (
                                      <SelectGroup key={index}>
                                        <SelectItem value={item.countryCode}>
                                          {item.emojiFlag} {item.countryName}
                                        </SelectItem>
                                      </SelectGroup>
                                    );
                                  },
                                )}
                              </SelectContent>
                            </Select>
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
                    return (
                      <FormItem>
                        <FormLabel>{title}</FormLabel>
                        <FormControl>
                          <Input placeholder={`Enter ${title}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              );
            })}
            <div />
            <DialogClose asChild>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  props.setOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={!submitButtonEnabled}
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
