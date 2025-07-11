import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pl from './locales/pl.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import de from './locales/de.json';
import pt from './locales/pt.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';
import ar from './locales/ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pl: { translation: pl },
      es: { translation: es },
      fr: { translation: fr },
      it: { translation: it },
      de: { translation: de },
      pt: { translation: pt },
      ru: { translation: ru },
      zh: { translation: zh },
      ar: { translation: ar }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n; 