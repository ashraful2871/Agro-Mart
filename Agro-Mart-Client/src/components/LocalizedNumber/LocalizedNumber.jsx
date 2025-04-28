import { useTranslation } from "react-i18next";

const LocalizedNumber = ({ number }) => {
  const { i18n } = useTranslation();

  // Automatically format the number according to the current language
  const localizedNumber = number.toLocaleString(i18n.language);

  return <span>{localizedNumber}</span>;
};

export default LocalizedNumber;
