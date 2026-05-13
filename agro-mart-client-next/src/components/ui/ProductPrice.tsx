"use client";
import React from "react";
import { useCurrency } from "@/providers/CurrencyProvider";

const ProductPrice = ({ amount }: { amount: number }) => {
  const { convertPrice, getSymbol } = useCurrency();

  return (
    <p>
      {getSymbol()} {convertPrice(amount)}
    </p>
  );
};

export default ProductPrice;
