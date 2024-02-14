import { Open_Sans, Poppins, Roboto } from 'next/font/google';

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

export const opensans = Open_Sans({ subsets: ['latin'] });

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});
