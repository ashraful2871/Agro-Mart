"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface CurrencyContextType {
  currency: string;
  setCurrency: (c: string) => void;
  convertPrice: (amount: number) => string;
  getSymbol: () => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  convertPrice: () => "0.00",
  getSymbol: () => "$",
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const saved = localStorage.getItem("currency") || "USD";
    setCurrency(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const rates: Record<string, number> = { USD: 1, EUR: 0.9, BDT: 110 };
  const symbols: Record<string, string> = { USD: "$", EUR: "€", BDT: "৳" };

  const convertPrice = (amount: number) => {
    if (typeof amount !== "number" || isNaN(amount)) return "0.00";
    const rate = rates[currency] || 1;
    return (amount * rate).toFixed(2);
  };

  const getSymbol = () => symbols[currency] || "$";

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, getSymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};
