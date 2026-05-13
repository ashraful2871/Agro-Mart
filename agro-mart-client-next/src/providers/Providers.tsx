"use client";
import { ReactNode } from "react";
import ThemeProvider from "./ThemeProvider";
import OrderProvider from "./OrderProvider";
import { CurrencyProvider } from "./CurrencyProvider";
import ReduxProvider from "./ReduxProvider";
import AuthObserver from "./AuthObserver";
import { Toaster } from "react-hot-toast";
import { StyledEngineProvider } from "@mui/material";
import "@/lib/i18n";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <OrderProvider>
        <CurrencyProvider>
          <ReduxProvider>
            <StyledEngineProvider injectFirst>
              {children}
            </StyledEngineProvider>
            <Toaster />
            <AuthObserver />
          </ReduxProvider>
        </CurrencyProvider>
      </OrderProvider>
    </ThemeProvider>
  );
}
