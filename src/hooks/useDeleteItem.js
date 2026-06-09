import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ErrorMessage from "@/components/ui/ErrorMessage";

export const useDeleteItem = ({ queryKey, deleteFn, successMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteFn,
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });
      const previousProducts = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) =>
        old?.filter((oldItem) => oldItem.id !== itemId),
      );
      return { previousProducts };
    },
    onError: (error, itemId, context) => {
      toast.error(ErrorMessage);
      queryClient.setQueryData(queryKey, context.previousProducts);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      toast.success(successMessage);
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
