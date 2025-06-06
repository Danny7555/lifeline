import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

// Get the HTML lang attribute value
export function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  return {
    title: 'Lifeline',
    description: 'Your healthcare companion'
  };
}

// Generate static params for each locale
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'it' }];
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  const isValidLocale = ['en', 'es', 'it'].includes(locale);
  if (!isValidLocale) notFound();

  // The messages are now handled by i18n.ts
  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}