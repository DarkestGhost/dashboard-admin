import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CategoryForm from "./components/CategoryForm";
import { addNewCategoriy } from "@/services/categoriesApi";
import { toast } from "sonner";
import type { CategorySchema } from "./validations/categorySchema";
import type { Category } from "@/types/feature";

const emptyValues: Partial<CategorySchema> = {
  name: "",
  slug: "",
};

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: addNewCategoriy,
    onMutate: async (data: CategorySchema) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousProducts = queryClient.getQueryData(["categories"]);
      queryClient.setQueryData(["categories"], (old: Category[]) => [...old, { ...data }]);
      return { previousProducts };
    },
    onError: (error, _data, context) => {
      toast.error(error.message);
      queryClient.setQueryData(["categories"], context.previousProducts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("دسته‌بندی با موفقیت اضافه شد.");
      navigate("/dashboard/categories");
    },
  });

  const handleAddCategory = (data: CategorySchema) => mutate(data);

  return (
    <CategoryForm
      formSubmit={handleAddCategory}
      initialValue={emptyValues}
      title="افزودن دسته‌بندی جدید"
      isMutating={isMutating}
    />
  );
};

export default AddCategoryPage;
