import React from "react";
import { useCurrency } from "../../store/CurrencyContext";

const ProductPrice = ({ amount }) => {
  const { convertPrice, getSymbol } = useCurrency();

  return (
    <p>
      {getSymbol()} {convertPrice(amount)}
    </p>
  );
};

export default ProductPrice;