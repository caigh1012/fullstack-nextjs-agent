import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const interHeading = Inter({ subsets: ['latin'], variable: '--font-heading' });

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI Agent Chat',
  description: 'A chat application with AI agent',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn('h-full', 'antialiased', geistSans.variable, geistMono.variable, 'font-sans', notoSans.variable, interHeading.variable)}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
