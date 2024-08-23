import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
