import { Outlet } from "@remix-run/react";

// import { PanelBackgroundImage } from "~/shared/components/panel-background-image";

export default function AccountIndex() {
  return (
    <main className="container">
      {/* <PanelBackgroundImage id="1" width="1000px" height="1000px" /> */}
      <Outlet />
    </main>
  );
}
