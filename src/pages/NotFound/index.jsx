import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-light p-6 text-center">
      <div className="rounded-full bg-gray-dark2 text-navy p-4 mb-6">
        <Home className="w-8 h-8" />
      </div>
      <h1 className="heading-2 mb-2">Halaman tidak ditemukan</h1>
      <p className="text-gray-dark mb-6">
        URL yang Anda buka tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        to="/admin/dashboard"
        className="inline-flex items-center rounded-md bg-navy px-6 py-3 text-white hover:bg-navy-hover"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
