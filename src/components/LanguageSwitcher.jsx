import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const flags = {
  en: '/img/british-flag.png', // Add this image to static/img/
  pl: '/img/polish-flag.png',  // Add this image to static/img/
  es: '/img/spanish-flag.png',  // Add this image to static/img/
  fr: '/img/french-flag.png',
  it: '/img/italian-flag.png',
  de: '/img/german-flag.png',
  pt: '/img/portuguese-flag.png',
  ru: '/img/russian-flag.png',
  zh: '/img/chinese-flag.png',
  ar: '/img/arabic-flag.png'
};

const languages = [
  { code: 'en', label: 'British', flag: flags.en },
  { code: 'pl', label: 'Polish', flag: flags.pl },
  { code: 'es', label: 'Spanish', flag: flags.es },
  { code: 'fr', label: 'French', flag: flags.fr },
  { code: 'it', label: 'Italian', flag: flags.it },
  { code: 'de', label: 'German', flag: flags.de },
  { code: 'pt', label: 'Portuguese', flag: flags.pt },
  { code: 'ru', label: 'Russian', flag: flags.ru },
  { code: 'zh', label: 'Chinese', flag: flags.zh },
  { code: 'ar', label: 'Arabic', flag: flags.ar }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <img src={current.flag} alt="flag" className="w-10 h-6 mr-1" />
        <span className="mr-1">▼</span>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-32 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow z-50">
          {languages.map(lang => (
            <div
              key={lang.code}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
            >
              <img src={lang.flag} alt={lang.label} className="w-5 h-5 mr-2" />
              <span>{lang.label}</span>
              {i18n.language === lang.code && <span className="ml-auto">✔</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 