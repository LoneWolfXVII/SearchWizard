import { Outlet } from "react-router-dom";
import { Sidebar } from "../features/sidebar/sidebar.component";

export function GlobalLayout({ children }) {
  return (
    <>
      <Sidebar />
      <section className="overflow-x-hidden ml-[200px]">
        {children || <Outlet />}
      </section>
    </>
  );
}
