import React from "react";

function getInitials(name = "") {
  const [first = "", second = ""] = name.trim().split(" ");
  if (!first && !second) return "";
  if (!second) return first.slice(0, 2).toUpperCase();
  return `${first[0]}${second[0]}`.toUpperCase();
}

export function AdminNavbar({
  title = "Dashboard",
  subtitle = "Selamat datang di sistem audit management",
  user = {
    name: "Admin User",
    role: "Administrator",
  },
}) {
  const initials = user.initials ?? getInitials(user.name);

  return (
    <header className="border-b  border-l border-navy bg-white ml-8">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex flex-col">
          <h1 className="heading-4 text-navy">{title}</h1>
          {subtitle && (
            <p className="text-gray-dark text-sm">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
            {initials}
          </div>
          <div className="flex flex-col text-right">
            <span className="text-navy text-sm font-medium">
              {user.name}
            </span>
            <span className="text-gray-dark text-xs">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
