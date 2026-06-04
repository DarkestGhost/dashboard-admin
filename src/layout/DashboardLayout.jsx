import { useContext, useState } from "react";
import { AuthContext } from "@/features/auth/context/AuthProvider";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { HiBars3, HiArrowRightOnRectangle } from "react-icons/hi2";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside className={`fixed top-0 right-0 h-full w-64 bg-slate-800 text-white p-4 z-30 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} md:static md:translate-x-0`}>
        <h2 className="text-3xl font-vazir_bold mb-10">پنل ادمین</h2>
        <nav className="flex flex-col justify-center gap-y-2">
          <NavLink
            to={"/dashboard"}
            end
            className={({ isActive }) =>
              `${isActive ? "bg-slate-700" : "hover:bg-slate-700"} block font-vazir_regular text-lg px-4 py-2 rounded-md transition-all duration-300`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            داشبورد
          </NavLink>
          <NavLink
            to={"/dashboard/products"}
            className={({ isActive }) =>
              `${isActive ? "bg-slate-700" : "hover:bg-slate-700"} block font-vazir_regular text-lg px-4 py-2 rounded-md transition-all duration-300`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            محصولات
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer text-slate-700 hover:text-slate-800"
            onClick={() => setIsSidebarOpen(true)}
          >
            <HiBars3 className="w-8 h-8 text-slate-700 hover:text-slate-900 transition-colors" />
          </button>
          <h1 className="max-w-[200px] sm:max-w-full truncate text-sm sm:text-base lg:text-xl font-vazir_bold">{user.name} عزیز خوش آمدید</h1>
          <Button size={"md"} variant={"danger"} onClick={handleLogout} className="flex items-center gap-1 group">
            <HiArrowRightOnRectangle className="w-4 h-4 text-red-600 group-hover:text-red-700 transition-colors" />
            خروج
          </Button>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
