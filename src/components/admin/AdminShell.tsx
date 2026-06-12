import AdminSidebar from "./AdminSidebar";
import AdminMobileNav from "./AdminMobileNav";

type AdminShellProps = {
  children: React.ReactNode;
};

export default function AdminShell({
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#071018] text-white lg:flex">
      <AdminSidebar />

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071018]/80 px-4 py-5 backdrop-blur-xl sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-medium text-green-400">
              Admin Panel
            </p>

            <h2 className="text-2xl font-bold text-white">
              MyEco Management
            </h2>
          </div>
        </header>

        <div className="p-4 pb-28 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      <AdminMobileNav />
    </div>
  );
}