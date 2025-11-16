
import { useAdminLayout } from "@/layouts/admin/AdminLayoutContext";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Outlet } from "react-router-dom";
export default function SoA(){
    const {setHeader} = useAdminLayout();
    const baseTab = "body-medium p-4 rounded-t-[4px] transition-all duration-200";
    const inactive = "text-navy hover:bg-state";
    const active = "bg-state text-navy shadow border-b-[3px] border-navy";

    useEffect(() => {
        setHeader({
            title: "Statement of Applicability",
            subtitle: "Kelola dokumen, kategori, dan pertanyaan SoA",
            user: {
                name: "Admin User",
                role: "Administrator",
                urlDetail: '/admin/profile'
            }
        })
    }, [])
    return(
        <div>
            <div className="flex gap-4" id="soa-sub-navbar">
                <NavLink to="/admin/soa/dokumen" className={({ isActive }) => clsx(baseTab, isActive ? active : inactive)}> Dokumen SoA </NavLink>
                <NavLink to="/admin/soa/kategori" className={({ isActive }) => clsx(baseTab, isActive ? active : inactive)}> Kategori SoA </NavLink>
                <NavLink to="/admin/soa/pertanyaan" className={({ isActive }) => clsx(baseTab, isActive ? active : inactive)}> Pertanyaan SoA `</NavLink>
            </div>
        
        <div className="mt-6">
            <Outlet />
        </div>

        </div>
    )
}