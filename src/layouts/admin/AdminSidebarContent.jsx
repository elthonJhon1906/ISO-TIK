import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  ClipboardCheck,
  FileChartLine,
  FileText,
  Folder,
  FolderOpen,
  House,
  HouseIcon,
  LogOut,
  LogOutIcon,
  TriangleAlert,
} from "lucide-react";

function SidebarNavItem({
  item,
  isActive,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  const showHoverIcon = isActive || isHovered;
  const IconComponent = showHoverIcon ? item.hoverIcon : item.icon;

  const buttonClasses = "group/nav-item transition-all duration-200 rounded-lg";
  const activeClasses =
    "!bg-navy !text-gray-light hover:!bg-navy hover:!text-gray-light cursor-default";
  const inactiveClasses = "hover:bg-gray-dark2 hover:text-gray-light";

  const iconClasses = showHoverIcon
    ? `h-4 w-4 ${isActive ? "text-gray-light" : "text-navy scale-110"} transition-all duration-200`
    : "h-4 w-4 text-sidebar-foreground/70 transition-all duration-200";

  const textClasses = `${
    isActive
      ? "text-gray-light"
      : "text-gray-dark group-hover/nav-item:text-navy-hover"
  } body-medium transition-all duration-200`;

  return (
    <SidebarMenuItem className="px-8">
      <SidebarMenuButton
        asChild
        isActive={isActive}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`${buttonClasses} ${isActive ? activeClasses : inactiveClasses}`}
      >
        <a href={item.url} className="flex items-center gap-3 p-6">
          <IconComponent className={iconClasses} />
          <span className={textClasses}>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AdminSidebarContent() {
  const navigation = useMemo(
    () => [
      { title: "Dashboard", url: "/admin/dashboard", icon: House, hoverIcon: HouseIcon },
      { title: "Dokumen", url: "/admin/surveys", icon: Folder, hoverIcon: FolderOpen },
      { title: "SoA", url: "/admin/filetext", icon: FileText, hoverIcon: FileText },
      { title: "Audit", url: "/admin/reports", icon: ClipboardCheck, hoverIcon: ClipboardCheck },
      { title: "NCR", url: "/admin/settings", icon: TriangleAlert, hoverIcon: TriangleAlert },
      { title: "High Level Audit", url: "/admin/highlevelaudit", icon: FileChartLine, hoverIcon: FileChartLine },
    ],
    []
  );

  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const resolveActiveFromPath = useCallback(() => {
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const matched = navigation.find((item) => path.startsWith(item.url));
    return matched?.title ?? navigation[0]?.title ?? null;
  }, [navigation]);

  useEffect(() => {
    const updateActive = () => setActiveItem(resolveActiveFromPath());
    updateActive();
    window.addEventListener("popstate", updateActive);
    return () => window.removeEventListener("popstate", updateActive);
  }, [resolveActiveFromPath]);

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarNavItem
              key={item.title}
              item={item}
              isActive={activeItem === item.title}
              isHovered={hoveredItem === item.title && activeItem !== item.title}
              onClick={() => setActiveItem(item.title)}
              onMouseEnter={() => {
                if (activeItem !== item.title) {
                  setHoveredItem(item.title);
                }
              }}
              onMouseLeave={() => setHoveredItem(null)}
            />
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem className="px-8">
            <SidebarMenuButton
              asChild
              onMouseEnter={() => setHoveredItem("logout")}
              onMouseLeave={() => setHoveredItem(null)}
              className="group transition-all duration-200 hover:bg-red-50 hover:text-red-700"
            >
              <a href="/logout" className="flex items-center gap-3 p-6">
                {hoveredItem === "logout" ? (
                  <LogOutIcon className="h-4 w-4 text-red-700 scale-110 transition-all duration-200" />
                ) : (
                  <LogOut className="h-4 w-4 text-red-600 transition-all duration-200" />
                )}
                <span className="text-body-medium transition-all duration-200 group-hover:font-medium">
                  Keluar
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
