import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductProvider";

const categoryOptions = [
  { value: "digital", label: "دیجیتال" },
  { value: "accessories", label: "جانبی" },
];

const AddProductPage = () => {
  const { addNewProduct } = useContext(ProductContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onTouched" });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    addNewProduct(data);
    navigate("/dashboard/products");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-vazir_bold text-sl, resetate-800 pb-10">
        افزودن محصول جدید
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
            <Button size={"md"} variant={"success"} disabled={!isValid}>
              {isSubmitting ? "در حال ثبت.." : "ثبت محصول"}
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
