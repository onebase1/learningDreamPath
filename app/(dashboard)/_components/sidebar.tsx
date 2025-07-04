import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      {/* Grey Separator */}
      <div className="h-px bg-gray-200 w-full"></div>
      {/* Scrollable content area */}
      <div className="flex-1 flex flex-col min-h-0 py-4">
        <SidebarRoutes />
      </div>
    </div>
  );
};