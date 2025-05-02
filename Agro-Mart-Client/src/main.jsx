import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "../src/store/i18n.js"
import { router } from "./route/Routs.jsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store/store.js";
import AuthObserver from "./auth/AuthObserver.jsx";
import { Toaster } from "react-hot-toast";
import { StyledEngineProvider } from "@mui/material";
import ThemeProvider from "./provider/ThemeProvider.jsx";
import OrderProvider from "./pages/Dashboard/overview/OrderProvider.jsx";
import { CurrencyProvider } from "./store/CurrencyContext.jsx";
// import emailjs from "@emailjs/browser";

const queryClient = new QueryClient();
// emailjs.init("61mSC3agsF3cMsWXG");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <OrderProvider>
      <CurrencyProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <StyledEngineProvider injectFirst>
            <RouterProvider router={router} />
          </StyledEngineProvider>
          <Toaster></Toaster>
          <AuthObserver></AuthObserver>
        </QueryClientProvider>
      </Provider>
      </CurrencyProvider>
      </OrderProvider>
    </ThemeProvider>
  </StrictMode>
);
