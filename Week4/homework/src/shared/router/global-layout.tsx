import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router";

export default function GlobalLayout() {
  return (
    <>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <ScrollRestoration />
    </>
  );
}
