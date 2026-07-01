import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface useDeleteItemProps {
  queryKey: string[];
  deleteFn: (id: number) => Promise<void>;
  successMessage: string;
}

export const useDeleteItem = <T extends { id: number; name: string }>({
  queryKey,
  deleteFn,
  successMessage,
}: useDeleteItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteFn,
    onMutate: async (itemId: number) => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });
      const previousProducts = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: T[]) =>
        old?.filter((oldItem) => oldItem.id !== itemId),
      );
      return { previousProducts };
    },
    onError: (error, _itemId, context) => {
      toast.error(error.message);
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

  const openDeleteDialog = (item: T) => {
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
