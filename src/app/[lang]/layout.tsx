import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';

import { languages, type Language } from '@/config/languages';
import Header from '@/components/header/header';
import Provider from '@/components/provider';
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

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="text-primary bg-primary relative mx-auto mb-20 flex w-full max-w-screen-xl flex-col px-[10vw] md:px-[5vw]">
        <Provider>
          <Header />
          <main>{children}</main>
          <div className="fixed bottom-12 right-10">
            <ScrollUpButton />
          </div>
        </Provider>
      </body>
    </html>
  );
} 