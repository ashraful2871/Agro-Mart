import React from "react";
import { useCurrency } from "../../store/CurrencyContext";

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="BDT">BDT</option>
    </select>
  );
};

export default CurrencySelector;
