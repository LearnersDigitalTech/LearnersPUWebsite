import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import GoogleTranslate from '../components/GoogleTranslate';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';
import MathClubPopup from '../components/MathClubPopup';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Learners PU College | Excellence in Education',
  description: 'Empowering students with mind-map based learning, expert career guidance, and a strong mathematical foundation to build confident, future-ready achievers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground">
        <LanguageProvider>
          <GoogleTranslate />
          <Navbar />
          <MathClubPopup />
          <FloatingContact />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
