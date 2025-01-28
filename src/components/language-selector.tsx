'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { languages, type Language } from '@/config/languages';

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState<Language>('en');

  useEffect(() => {
    if (!pathname) return;
    
    const pathLang = pathname.split('/')[1] as Language;
    if (pathLang && pathLang in languages) {
      setCurrentLang(pathLang);
    }
  }, [pathname]);

  const handleLanguageChange = (lang: Language) => {
    if (!pathname) return;
    
    const newPath = pathname.replace(/^\/[a-z]{2}/, '');
    router.push(`/${lang}${newPath}`);
  };

  return (
    <div className="flex space-x-2">
      {Object.entries(languages).map(([code, { name, flag }]) => (
        <button
          key={code}
          onClick={() => handleLanguageChange(code as Language)}
          className={`flex items-center space-x-1 rounded-md px-2 py-1 text-sm ${
            currentLang === code
              ? 'bg-red-500 text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <span>{flag}</span>
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
} 