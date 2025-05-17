import React, { Suspense } from "react";
import { Outlet } from "react-router";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Loader from "../loader/Loader";

export default function Layout() {
  return (
    <React.Fragment>
      <header className="h-20 md:h-20 ">
        <Header />
      </header>

      <main className="container mx-auto min-h-[calc(100vh-11.4rem)]">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>

      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}
