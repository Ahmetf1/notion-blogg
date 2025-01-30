import { Language } from '@/config/languages';
import { getDictionary } from '@/dictionaries';
import { Metadata } from 'next';
import Image from 'next/image';
import LinkedInIcon from '@/assets/LinkedIn_icon.svg';
import InstagramIcon from '@/assets/Instagram_icon.svg';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Language };
}): Promise<Metadata> {
  const dict = await getDictionary(lang);
  
  return {
    title: dict.contact.title,
    description: dict.contact.description,
  };
}

export default async function ContactPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="mt-12 text-center">
      <h1 className="text-3xl font-bold">{dict.contact.title}</h1>
      <div className="mt-4">
        {dict.contact.description.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="flex items-center justify-center gap-8 mt-8">
        <a 
          href="https://www.linkedin.com/in/ahmet-furkan-akinci/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <Image
            src={LinkedInIcon}
            alt="LinkedIn"
            width={48}
            height={48}
          />
        </a>

        <a 
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <Image
            src={InstagramIcon}
            alt="Instagram"
            width={48}
            height={48}
          />
        </a>
      </div>
    </div>
  );
} 