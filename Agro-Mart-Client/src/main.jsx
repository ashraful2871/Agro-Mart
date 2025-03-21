import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./route/Routs.jsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store/store.js";
import AuthObserver from "./auth/AuthObserver.jsx";
import { Toaster } from "react-hot-toast";
import { StyledEngineProvider } from "@mui/material";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <RouterProvider router={router} />
        </StyledEngineProvider>
        <Toaster></Toaster>
        <AuthObserver></AuthObserver>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
