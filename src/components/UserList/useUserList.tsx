import { useState } from 'react';
import { toast } from 'sonner';

import useAPI from '@/hooks/useAPI';

export interface UseUserListProps {
  caseOrderId?: string;
  currentPage?: number;
  pageSize?: number;
  onCreateUserSuccess: () => void;
}
export default function useUserList(props: UseUserListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const {
    data,
    loading,
    error,
    triggerAPICall: getUsers,
  } = useAPI({
    ENDPOINT: 'admin/getUsers/',
    METHOD: 'POST',
    currentPage,
    pageSize,
    shouldFetch: false,
  });

  const { triggerAPICall: createUser, error: createUserError } = useAPI({
    ENDPOINT: 'admin/createUser/',
    METHOD: 'POST',
    onComplete: () => {
      props.onCreateUserSuccess();
      getUsers({ dashboard: true });
      // toast('User created successfully');
    },
    onError: (errorMsg: string) => {
      toast(errorMsg);
    },
  });

  const { triggerAPICall: updateUser } = useAPI({
    ENDPOINT: 'admin/updateUser/',
    METHOD: 'POST',
    onComplete: () => {
      getUsers({ dashboard: true });
      toast('User updated successfully');
    },
    onError: (errorMsg: string) => {
      toast(errorMsg);
    },
  });

  const { triggerAPICall: deleteUser } = useAPI({
    ENDPOINT: 'admin/deleteUser/',
    METHOD: 'DELETE',
    onComplete: () => {
      getUsers({ dashboard: true });
      toast('User deleted successfully');
    },
    onError: (errorMsg: string) => {
      getUsers({ dashboard: true });
      toast(errorMsg);
    },
  });

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  return {
    data,
    loading,
    error,
    currentPage,
    getUsers,
    handleNext,
    handlePrevious,
    createUser,
    createUserError,
    updateUser,
    deleteUser,
  };
}
