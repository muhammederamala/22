import React from "react";

import MyNavbar from "../Components/Navbar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <MyNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
