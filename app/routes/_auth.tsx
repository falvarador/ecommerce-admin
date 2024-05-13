import { Outlet } from "@remix-run/react";

// import { PanelBackgroundImage } from "~/shared/components/panel-background-image";

import "~/styles/_auth.css";

export default function AccountIndex() {
  return (
    <main className="container__auth">
      <Outlet />
      <div className="base-grid" />
    </main>
  );
}
