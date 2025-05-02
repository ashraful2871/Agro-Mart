import React, { createContext, useState, useContext, useEffect } from "react";

// Currency context তৈরি
const CurrencyContext = createContext();

// Custom hook ব্যবহার করে context নেওয়া
export const useCurrency = () => useContext(CurrencyContext);

// CurrencyProvider component
export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    // প্রথমে localStorage থেকে currency পড়ি, না পেলে USD রাখি
    return localStorage.getItem("currency") || "USD";
  });

  // Currency পরিবর্তন হলে localStorage-এ সেট করি
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const rates = { USD: 1, EUR: 0.9, BDT: 110 };
  const symbols = { USD: "$", EUR: "€", BDT: "৳" };

  // convertPrice ফাংশনে সেফগার্ড
  const convertPrice = (amount) => {
    if (typeof amount !== "number" || isNaN(amount)) {
      return "0.00";
    }
    const rate = rates[currency] || 1;
    return (amount * rate).toFixed(2);
  };

  const getSymbol = () => symbols[currency] || "$";

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, convertPrice, getSymbol }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
