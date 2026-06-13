import { useMemo, useState, useRef, useContext } from "react";
import DataTable from "@/components/list/DataTable";
import EmptyListState from "@/components/list/EmptyListState";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Input from "@/components/ui/Input";
import Loading from "@/components/ui/Loading";
import Pagination from "@/components/ui/Pagination";
import { useClientPagination } from "@/hooks/useClientPagination";
import { editOrder, fetchOrders } from "@/services/ordersApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "@/components/ui/Select";
import { sortByDate, sortByName } from "@/utils/sortItems";
import { formatPrice } from "@/utils/formatNumber";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";
import { sortOrdersOptions, statusOrderOptions } from "@/constants/options";
import { AuthContext } from "../auth/context/AuthProvider";

const columns = [
    { key: "orderId", header: "شماره سفارش" },
    { key: "name", header: "مشتری", },
    { key: "totalPrice", header: "مبلغ", render: (row) => formatPrice(row.totalPrice) },
    {
        key: "status", header: "وضعیت", render: (row) => {
            const status = statusOrderOptions.find((s) => s.slug === row.status);
            return (
                <span className={`px-2 py-1 rounded-full text-sm transition-colors duration-300 ease-linear ${status?.color || "bg-gray-500"}`}>
                    {status?.name || "نامشخص"}
                </span>
            );
        },
    },
    { key: "createdAt", header: "تاریخ", render: (row) => new Date(row.createdAt).toLocaleDateString("fa-IR") }
];

const OrdersPage = () => {
    const { user } = useContext(AuthContext);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const selectStatusRef = useRef();
    const queryClient = useQueryClient();

    const { data: orders = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
    });

    const { mutate } = useMutation({
        mutationFn: editOrder,
        onMutate: async (data) => {
            await queryClient.cancelQueries({ queryKey: ["orders"] });
            const previousData = queryClient.getQueryData(["orders"]);
            queryClient.setQueryData(["orders"], (old = []) => old.map(order => order.id === data.id ? {
                ...order,
                status: data.status,
            } : order));
            return { previousData }
        },
        onError: (error, data, context) => {
            toast.error(error.message);
            queryClient.setQueryData(["orders"], context.previousData);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("وضعیت سفارش با موفقیت بروزرسانی شد.");
        },
    })

    const handleOpenDialog = (order) => {
        setIsOpenDialog(true);
        setSelectedOrder(order);
    };

    const handleCloseDialog = () => {
        setSelectedOrder(null);
        setIsOpenDialog(false);
    };

    const handleConfirmDialog = () => {
        const newStatus = selectStatusRef.current.value;
        mutate({ id: selectedOrder?.id, status: newStatus });
        handleCloseDialog();
    };

    const filteredCategories = useMemo(() => {
        let results = [...orders];

        if (search) {
            results = results.filter(
                (order) =>
                    order.name.toLowerCase().includes(search.toLowerCase()) ||
                    order.status.toLowerCase().includes(search.toLowerCase()),
            );
        }

        switch (sortBy) {
            case "newest":
                sortByDate(results, "desc");
                break;
            case "oldest":
                sortByDate(results, "asc");
                break;
            case "mostExpensive":
                results.sort((a, b) => b.totalPrice - a.totalPrice);
                break;
            case "cheapest":
                results.sort((a, b) => a.totalPrice - b.totalPrice);
                break;
            case "nameAsc":
                sortByName(results, "asc");
                break;
            case "nameDesc":
                sortByName(results, "desc");
                break;
        }

        return results;
    }, [orders, search, sortBy]);

    const { paginated, currentPage, totalPages, setCurrentPage, resetPage } =
        useClientPagination(filteredCategories);

    if (isLoading) return <Loading message="در حال دریافت سفارشات..." />;

    if (isError) return <ErrorMessage message={error.message} onRetry={refetch} />;

    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-xl font-vazir_bold text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear">
                مدیریت دسته‌بندی‌ها
            </h2>
            <div className="w-full my-6 flex flex-col xl:flex-row items-center justify-center gap-3">
                <Input
                    id="search"
                    type="text"
                    placeholder="جستجوی مشتری و وضعیت..."
                    className="flex-1"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        resetPage();
                    }}
                />

                <Select
                    id="sort"
                    options={sortOrdersOptions}
                    placeholder="مرتب‌سازی..."
                    className="sm:w-50"
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        resetPage();
                    }}
                />
            </div>

            {paginated.length > 0 ? (
                <>
                    <DataTable
                        columns={columns}
                        data={paginated}
                        renderActions={(order) => (
                            <Button size={"sm"} variant={"primary"} onClick={() => handleOpenDialog(order)}>مشاهده</Button>
                        )}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <EmptyListState
                    title="دسته‌بندی‌ای برای نمایش وجود ندارد ..."
                    description="می‌توانید با زدن دکمه افزودن دسته‌بندی جدید، دسته‌بندی‌ای به لیستتان اضافه کنید."
                />
            )}
            <ConfirmDialog title={"اطلاعات محصولات سفارش"} isOpen={isOpenDialog} onClose={handleCloseDialog}
                onConfirm={user.role === "admin" ? handleConfirmDialog : undefined} confirmText={user.role === "admin" ? "ذخیره" : undefined} cancelText="باشه">
                {selectedOrder && (
                    <div className="text-base font-vazir_regular flex flex-col justify-center gap-y-4">
                        <span>شماره سفارش: {selectedOrder.orderId}</span>
                        <span>مشتری: {selectedOrder.name}</span>
                        <span>تاریخ: {new Date(selectedOrder.createdAt).toLocaleDateString("fa-IR")}</span>
                        <p className="flex items-center gap-x-2">
                            <span>وضعیت: </span>
                            {user.role === "admin" ? <Select id={"status"} ref={selectStatusRef} defaultValue={selectedOrder.status} options={statusOrderOptions} /> : (
                                statusOrderOptions.find((s) => s.slug === selectedOrder.status).name
                            )}
                        </p>
                        <span>محصولات سفارش: </span>
                        {(selectedOrder.items?.items || selectedOrder.items || []).map(item => (
                            <div className="mr-6 flex items-center gap-x-2">
                                <span>نام محصول : {item.name}</span>
                                <span>تعداد : {item.quantity}</span>
                            </div>
                        ))}

                        <span>مبلغ کل سفارش: {formatPrice(selectedOrder.totalPrice)}</span>
                    </div>
                )}
            </ConfirmDialog>
        </div>
    )
};

export default OrdersPage;
