import { Language } from '@/config/languages';
import { getDictionary } from '@/dictionaries';
import { Metadata } from 'next';
import Image from 'next/image'
import ensiLogo from '@/assets/ensi_logo.svg'
import solaceLogo from '@/assets/solace_logo.svg'

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Language };
}): Promise<Metadata> {
  const dict = await getDictionary(lang);
  
  return {
    title: dict.about.title,
    description: dict.about.description,
  };
}

export default async function AboutPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="mt-12 text-center">
      <h1 className="text-3xl font-bold">{dict.about.title}</h1>
      <p className="mt-4">{dict.about.description}</p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
        <a 
          href="https://www.solace.com.tr" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Image
            src={solaceLogo}
            alt="Solace Logo"
            width={200}
            height={46}
            className="hover:opacity-80 transition-opacity"
          />
        </a>
        
        <a 
          href="https://www.ensihome.solace.com.tr" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Image
            src={ensiLogo}
            alt="Ensi Logo"
            width={180}
            height={42}
            className="hover:opacity-80 transition-opacity mt-5"
          />
        </a>
      </div>
    </div>
  );
} 