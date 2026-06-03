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
    <div className="p-6">
      <h2 className="text-xl font-vazir_bold text-slate-800 pb-10">
        {title}
      </h2>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-2/5 bg-white shadow-md overflow-hidden rounded-lg p-8 space-y-8"
        >
          <Input
            id={"name"}
            label={"عنوان محصول"}
            type="text"
            error={errors.name}
            {...register("name")}
          />
          <div className="flex items-center justify-center gap-x-4">
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

          <p className="flex justify-end items-center gap-x-2 text-sm">
            <Button
              size={"md"}
              variant={"danger"}
              type="button"
              onClick={() => navigate("/dashboard/products")}
            >
              لغو
            </Button>
            <Button
              size={"md"}
              variant={"success"}
              type="submit"
              disabled={!isValid || !isDirty || isMutating}
            >
              {isMutating ? "در حال ثبت.." : "ثبت محصول"}
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
