import { Language } from '@/config/languages';
import { getDictionary } from '@/dictionaries';
import { Metadata } from 'next';

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
      <p className="mt-4">{dict.contact.description}</p>
    </div>
  );
} 