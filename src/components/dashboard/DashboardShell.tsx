import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNav from "./MobileNav";

type DashboardShellProps = {
  children: React.ReactNode;
  username: string | null;
  avatarUrl: string | null;
  isAdmin: boolean;
};



export default function DashboardShell({
  children,
  username,
  avatarUrl,
  isAdmin,
  
}: DashboardShellProps) {
  
  return (
    
    <div className="min-h-screen bg-[#071018] flex">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <Topbar
          username={username}
          avatarUrl={avatarUrl}
          isAdmin={isAdmin}
        />
        

        <div className="p-4 pb-24 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}