import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CategoryForm from "./components/CategoryForm";
import { editCategory, fetchcategoriy } from "@/services/categoriesApi";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { toast } from "sonner";
import type { CategorySchema } from "./validations/categorySchema";
import type { Category } from "@/types/feature";

const EditCategoryPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { categoryId } = useParams<{categoryId: string}>();

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: editCategory,
    onMutate: async (data: CategorySchema & { id: number }) => {
      await queryClient.cancelQueries({ queryKey: ["categories", categoryId] });
      const previousData = queryClient.getQueryData(["categories", categoryId]);
      queryClient.setQueryData(["categories", categoryId], (oldData: Category) => ({
        ...oldData,
        ...data,
      }));
      return { previousData };
    },
    onError: (error, _data, context) => {
      toast.error(error.message);
      queryClient.setQueryData(
        ["categories", categoryId],
        context.previousData,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", categoryId] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", categoryId] });
      toast.success("دسته‌بندی با موفقیت ویرایش شد.");
      navigate("/dashboard/categories");
    },
  });

  const {
    data: category,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => fetchcategoriy(Number(categoryId)),
  });

  const handleEditCategory = (data: CategorySchema) => mutate({ id: Number(categoryId), ...data });

  if (isLoading) return <Loading message="در حال بارگذاری ..." />;

  if (isError)
    return <ErrorMessage message={error.message} onRetry={refetch} />;

  if (!category) return <ErrorMessage message="دسته‌بندی پیدا نشد." />;

  return (
    <CategoryForm
      formSubmit={handleEditCategory}
      initialValue={{ name: category.name, slug: category.slug }}
      title="ویرایش دسته‌بندی"
      isMutating={isMutating}
    />
  );
};

export default EditCategoryPage;
