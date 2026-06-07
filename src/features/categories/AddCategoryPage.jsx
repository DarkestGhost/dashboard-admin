import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CategoryForm from "./components/CategoryForm";
import { addNewCategoriy } from "@/services/categoriesApi";
import { toast } from "sonner";

const emptyValues = {
  name: "",
  slug: "",
};

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: addNewCategoriy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("دسته‌بندی با موفقیت اضافه شد.");
      navigate("/dashboard/categories");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddCategory = (data) => mutate(data);

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
