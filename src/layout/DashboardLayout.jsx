import { useContext, useState } from "react";
import { AuthContext } from "@/features/auth/context/AuthProvider";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { HiBars3, HiArrowRightOnRectangle } from "react-icons/hi2";
import { ThemeContext } from "@/context/theme/ThemeProvider";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-zinc-900 transition-all duration-300 ease-linear">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside className={`fixed top-0 right-0 h-full w-64 bg-zinc-800 dark:bg-zinc-900 text-zinc-100 border-l border-zinc-700 p-4 z-30 transform transition-all duration-300 ease-linear not-last-of-type: ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} md:static md:translate-x-0`}>
        <h2 className="text-3xl font-vazir_bold mb-10">پنل ادمین</h2>
        <nav className="flex flex-col justify-center gap-y-2">
          <NavLink
            to={"/dashboard"}
            end
            className={({ isActive }) =>
              `${isActive ? "bg-zinc-700 dark:bg-zinc-600" : "hover:bg-zinc-700 dark:hover:bg-zinc-600"} block font-vazir_regular text-lg px-4 py-2 rounded-md transition-all duration-300 ease-linear`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            داشبورد
          </NavLink>
          <NavLink
            to={"/dashboard/products"}
            className={({ isActive }) =>
              `${isActive ? "bg-zinc-700 dark:bg-zinc-600" : "hover:bg-zinc-700 dark:hover:bg-zinc-600"} block font-vazir_regular text-lg px-4 py-2 rounded-md transition-all duration-300 ease-linear`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            محصولات
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto transition-colors duration-300 ease-linear">
        <header className="h-16 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 shadow-md flex items-center justify-between px-6 transition-all duration-300 ease-linear">
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer text-zinc-700 hover:text-zinc-800 transition-colors duration-300 ease-linear"
            onClick={() => setIsSidebarOpen(true)}
          >
            <HiBars3 className="w-8 h-8 text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors" />
          </button>
          <h1 className="max-w-[200px] sm:max-w-full truncate text-sm sm:text-base lg:text-xl font-vazir_bold text-zinc-800 dark:text-zinc-100 transition-colors duration-300 ease-linear">{user.name} عزیز خوش آمدید</h1>
          <div className="flex items-center justify-center gap-x-2">
            <button onClick={toggleTheme} className="cursor-pointer">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <Button size={"md"} variant={"danger"} onClick={handleLogout} className="flex items-center gap-1 group">
              <HiArrowRightOnRectangle className="w-4 h-4" />
              خروج
            </Button>
          </div>
        </header>
        <div className="p-4 sm:p-6 text-zinc-800 dark:text-zinc-100">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
