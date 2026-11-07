import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import { useAuthStore } from "../features/auth/store";
import HomePage from "../pages/HomePage";
import OrdersPage from "../pages/OrdersPage";
import MapPage from "../pages/MapPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import MobileHome from "../mobile/pages/MobileHome";
import MobileOrders from "../mobile/pages/MobileOrders";
import MobileMap from "../mobile/pages/MobileMap";
import RequireStation from "./RequireStation";
import Responsive from "./Responsive";
import Shell from "./Shell";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: true } },
});

export default function App() {
  const init = useAuthStore((s) => s.init);
  useEffect(() => {
    void init();
  }, [init]);

  // Drop cached station data when the user signs out.
  useEffect(
    () =>
      useAuthStore.subscribe((state, prev) => {
        if (prev.user && !state.user) queryClient.clear();
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireStation />}>
            <Route element={<Shell />}>
              <Route index element={<Responsive desktop={<HomePage />} mobile={<MobileHome />} />} />
              <Route path="orders" element={<Responsive desktop={<OrdersPage />} mobile={<MobileOrders />} />} />
              <Route path="map" element={<Responsive desktop={<MapPage />} mobile={<MobileMap />} />} />
              <Route path="analytics" element={<Responsive desktop={<AnalyticsPage />} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
