import "./globals.css";
import { Inter } from 'next/font/google';
import localFont from 'next/font/local'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const inter = Inter({
  weight: ['100', '200', '300','500'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const candyBeans = localFont({
  src: './fonts/Candy Beans.otf',
  variable: '--candy-beans',
  weight: '500'
})

export const metadata = {
  title: "AquaWise",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`antialiased
                      ${inter.variable} font-inter
                      ${candyBeans.variable}`}>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
