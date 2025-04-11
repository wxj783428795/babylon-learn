import { Outlet } from "react-router";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider
      className=" w-full h-full"
      style={{
        //@ts-ignore
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <AppSidebar />
      <main className=" w-full h-full relative">
        <SidebarTrigger className=" absolute" />
        <main className="flex-1 p-8 bg-gray-100 overflow-auto w-full h-full">
          <Outlet />
        </main>
      </main>
    </SidebarProvider>
  );
}
