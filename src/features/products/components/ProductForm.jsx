import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { productSchema } from "../validations/productSchema";

const categoryOptions = [
  { value: "digital", label: "دیجیتال" },
  { value: "accessories", label: "جانبی" },
  { value: "gaming", label: "گیمینگ" },
  { value: "networking", label: "شبکه" },
  { value: "photography", label: "عکاسی" },
];

const ProductForm = ({ formSubmit, initialValue, title, isMutating }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onTouched", defaultValues: initialValue, resolver: zodResolver(productSchema) });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await formSubmit(data);
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-vazir_bold text-zinc-800 dark:text-zinc-100 pb-6 sm:pb-10 transition-colors duration-300 ease-linear">
        {title}
      </h2>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white dark:bg-zinc-800 shadow-md overflow-hidden rounded-lg p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 transition-all duration-300 ease-linear">

          <Input
            id={"name"}
            label={"عنوان محصول"}
            type="text"
            error={errors.name}
            {...register("name")}
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Input
              id={"price"}
              label={"قیمت (تومان)"}
              type="number"
              error={errors.price}
              {...register("price")}
            />

            <Input
              id={"stock"}
              label={"موجودی"}
              type="number"
              error={errors.stock}
              {...register("stock")}
            />
          </div>

          <Select
            id={"category"}
            label={"دسته بندی"}
            options={categoryOptions}
            error={errors.category}
            {...register("category")}
          />

          <div className="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-3 text-sm">
            <Button
              size={"md"}
              variant={"danger"}
              type="button"
              className="w-full sm:w-auto"
              onClick={() => navigate("/dashboard/products")}
            >
              لغو
            </Button>
            <Button
              size={"md"}
              variant={"success"}
              type="submit"
              className="w-full sm:w-auto"
              disabled={!isValid || !isDirty || isMutating}
            >
              {isMutating ? "در حال ثبت.." : "ثبت محصول"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
