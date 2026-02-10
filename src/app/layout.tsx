import type { Metadata } from 'next';
import './globals.css';
import { FilterProvider } from '@/context/FilterContext';
import DashboardShell from '@/components/layout/DashboardShell';

export const metadata: Metadata = {
  title: 'BW2 - Ecommerce',
  description: 'Dashboard de performance de anúncios',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <FilterProvider>
          <DashboardShell>{children}</DashboardShell>
        </FilterProvider>
      </body>
    </html>
  );
}
