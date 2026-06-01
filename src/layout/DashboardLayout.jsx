import Button from "@/components/ui/Button";
import { AuthContext } from "@/features/auth/context/AuthProvider";
import { useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-slate-800 text-white p-4">
        <h2 className="text-3xl font-vazir_bold mb-10">پنل ادمین</h2>
        <nav className="flex flex-col justify-center gap-y-2">
          <NavLink
            to={"/dashboard"}
            end
            className={({ isActive }) =>
              `${isActive ? "bg-slate-700" : "hover:bg-slate-700"} block font-vazir_regular text-lg px-4 py-2 rounded-md transition-all duration-300`
            }
          >
            داشبورد
          </NavLink>
          <NavLink
            to={"/dashboard/products"}
            className={({ isActive }) =>
              `${isActive ? "bg-slate-700" : "hover:bg-slate-700"} block font-vazir_regular text-lg px-4 py-2 rounded-md transition-all duration-300`
            }
          >
            محصولات
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
          <h1 className="text-xl font-vazir_bold">علی عزیز خوش آمدید</h1>
          <Button size={"md"} variant={"danger"} onClick={handleLogout}>خروج</Button>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
