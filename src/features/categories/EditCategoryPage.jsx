import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CategoryForm from "./components/CategoryForm";
import { editCategory, fetchcategoriy } from "@/services/categoriesApi";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { toast } from "sonner";

const EditCategoryPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: editCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("دسته‌بندی با موفقیت ویرایش شد.");
      navigate("/dashboard/categories");
    },
    onError: (error) => {
      toast.error(error.message);
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
    queryFn: () => fetchcategoriy(categoryId),
  });

  const handleEditCategory = (data) => mutate({ id: categoryId, ...data });

  if (isLoading) return <Loading message="در حال بارگذاری ..." />;

  if (isError) return <ErrorMessage message={error.message} onRetry={refetch} />;

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
