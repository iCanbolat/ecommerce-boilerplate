import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../lib/providers/theme-provider';
import AuthProvider from '../context/AuthContext';
import { headers } from 'next/headers';
 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
//  const createUserFolder = (username: string) => {
//    const folderPath = path.join(process.cwd(), 'src/app/(site)/_clients', username);

//    if (!fs.existsSync(folderPath)) {
//      fs.mkdirSync(folderPath);
//    }

//    return folderPath;
//  };
//  const userFolderPath = createUserFolder('fatih');

//  // index.tsx dosyasını oluşturma işlemi
//  fs.writeFileSync(
//    path.join(userFolderPath, 'index.tsx'),
//    `
//  import React from 'react';

//  const UserIndexPage = () => {
//    return (
//      <div>
//        <h1>User Home Page</h1>
//      </div>
//    );
//  };

//  export default UserIndexPage;
//`
//  );

  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute='class' defaultTheme='dark'>
            {children}  
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
