import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Item {
  label: string;
  icon: React.ReactElement;
  to: string;
}

interface SidebarGroupProps {
  label: string;
  icon: React.ReactElement;
  items: Item[];
}

const SidebarGroup = ({ label, icon, items }: SidebarGroupProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center gap-x-2 w-full px-4 py-2 cursor-pointer font-vazir_regular text-lg">
        {icon}
        {label}
        <HiChevronLeft
          size={13}
          className={`mr-auto transition-transform duration-300 ${open ? "-rotate-90" : ""}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col justify-center gap-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `${isActive ? "bg-zinc-700 dark:bg-zinc-600" : "hover:bg-zinc-700 dark:hover:bg-zinc-600"} mr-4 flex items-center gap-2 font-vazir_regular text-sm px-4 py-2 rounded-md transition-all duration-300 ease-linear`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarGroup;
