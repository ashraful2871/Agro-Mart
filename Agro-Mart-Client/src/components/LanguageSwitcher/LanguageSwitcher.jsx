import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-4 p-2">
      <button onClick={() => changeLanguage('english')} className="px-3 py-1 bg-blue-500 text-white rounded">English</button>
      <button onClick={() => changeLanguage('bangla')} className="px-3 py-1 bg-green-500 text-white rounded">বাংলা</button>
    </div>
  );
};

export default LanguageSwitcher;
