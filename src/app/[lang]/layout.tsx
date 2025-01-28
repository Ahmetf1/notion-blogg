import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';

import { Language } from '@/config/languages';
import Header from '@/components/header/header';
import ScrollUpButton from '@/components/scroll-up-button';
import '@/styles/globals.css';
import '@/styles/paginate.css';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: {
    default: 'Ahmet Furkan Akıncı',
    template: '%s | Ahmet Furkan Akıncı',
  },
};

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <div className="fixed bottom-12 right-10">
        <ScrollUpButton />
      </div>
    </>
  );
} 