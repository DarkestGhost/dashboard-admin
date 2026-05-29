import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import Button from "../../components/ui/Button";
import { ProductContext } from "../../context/ProductProvider";

const ProductsPage = () => {
  const { products, loading, fetchProducts, removeProduct } =
    useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleRemoveProduct = async (id) => {
    removeProduct(id);
  };

  if (loading) return <p>در حال دریافت محصولات ...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-vazir_bold text-slate-800">
          مدیریت محصولات
        </h2>
        <Link to={"/dashboard/products/addNewProduct"}>
          <Button size={"md"} variant={"outline"}>
            افزودن محصول جدید
          </Button>
        </Link>
      </div>

      <div className="bg-white overflow-hidden rounded-lg shadow-md">
        <table className="w-full text-right">
          <thead>
            <tr className="bg-slate-200 font-vazir_medium">
              <th className="text-slate-800 p-4">نام محصول</th>
              <th className="text-slate-800 p-4">دسته بندی</th>
              <th className="text-slate-800 p-4">قیمت</th>
              <th className="text-slate-800 p-4">موجودی</th>
              <th className="text-slate-800 p-4">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-200">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-slate-100 font-vazir_regular"
              >
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">
                  {product.price.toLocaleString("fa-IR")} تومان
                </td>
                <td className={"p-4"}>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${product.stock > 0 ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}
                  >
                    {product.stock > 0 ? `${product.stock} عدد` : "ناموجود"}
                  </span>
                </td>
                <td className="p-4 flex items-center gap-x-2">
                  <Link to={`/dashboard/products/editProduct/${product.id}`}>
                    <Button size={"sm"} variant={"primary"}>
                      ویرایش
                    </Button>
                  </Link>
                  <Button
                    size={"sm"}
                    variant={"danger"}
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    حذف
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
