import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

const categoryOptions = [
  { value: "digital", label: "دیجیتال" },
  { value: "accessories", label: "جانبی" },
];

const ProductForm = ({ formSubmit, initialValue, title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({ mode: "onTouched", defaultValues: initialValue });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await formSubmit(data);
    navigate("/dashboard/products");
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
            {...register("name", {
              required: "نام محصول الزامی است.",
            })}
          />
          <div className="flex items-center justify-center gap-x-4">
            <Input
              id={"price"}
              label={"قیمت (تومان)"}
              type="number"
              error={errors.price}
              {...register("price", {
                required: "قیمت الزامی است.",
                valueAsNumber: true,
                min: { value: 0, message: "قیمت نمیتواند منفی باشد." },
              })}
            />

            <Input
              id={"stock"}
              label={"موجودی"}
              type="number"
              error={errors.stock}
              {...register("stock", {
                required: "موجودی الزامی است.",
                valueAsNumber: true,
                min: { value: 0, message: "موجودی نمیتواند منفی باشد." },
              })}
            />
          </div>

          <Select
            id={"category"}
            label={"دسته بندی"}
            options={categoryOptions}
            error={errors.category}
            {...register("category", { required: "دسته بندی الزامی است." })}
          />

          <p className="flex justify-end items-center gap-x-2 text-sm">
            <Button
              size={"md"}
              variant={"danger"}
              onClick={() => navigate("/dashboard/products")}
            >
              لغو
            </Button>
            <Button
              size={"md"}
              variant={"success"}
              disabled={!isValid || !isDirty}
            >
              {isSubmitting ? "در حال ثبت.." : "ثبت محصول"}
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
