"use client";
import { useTranslation } from "react-i18next";

const LocalizedNumber = ({ number }: { number: number }) => {
  const { i18n } = useTranslation();
  const localizedNumber = number.toLocaleString(i18n.language);
  return <span>{localizedNumber}</span>;
};

export default LocalizedNumber;
