import type { Metadata } from 'next';
import { cn, fetchGithubCount } from '@repo/utils';
import { Nunito_Sans as nunitoSans } from 'next/font/google';
import { Header, Footer, Container } from '@repo/ui';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Providers } from './providers';

import '@docsearch/css';
import './globals.css';
import '@repo/ui/styles.css';

const fontSans = nunitoSans({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://storybook.js.org/integrations'),
  title: 'Integrations | Storybook',
  description:
    'Integrations enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community.',
  openGraph: {
    url: 'https://storybook.js.org/integrations',
    siteName: 'Storybook',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { number: githubCount } = await fetchGithubCount();

  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-white font-sans antialiased dark:bg-slate-950',
          fontSans.variable,
        )}
      >
        <Header
          algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!}
          githubCount={githubCount}
        />
        <Providers>
          <Container>{children}</Container>
        </Providers>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-MN8NJ34M7T" />
    </html>
  );
}
