import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteItem = ({ queryKey, deleteFn, successMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(successMessage);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const openDeleteDialog = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  const confirmDelete = () => {
    mutate(selectedItem?.id);
    closeDeleteDialog();
  };

  return {
    isOpen,
    selectedItem,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  };
};
