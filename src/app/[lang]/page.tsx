import { Language } from '@/config/languages';
import { getDictionary } from '@/dictionaries';

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="mt-12 text-center">
      <h1 className="text-3xl font-bold">{dict.home.title}</h1>
      <p className="mt-4">{dict.home.description}</p>
    </div>
  );
} 