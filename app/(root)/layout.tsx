import { roboto } from '@/components/fonts';
import { NavBar } from '@/components/shared/navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`${roboto.className} min-h-screen flex flex-col`}>
      <NavBar />

      <main className="flex-1 flex">{children}</main>
    </section>
  );
}
