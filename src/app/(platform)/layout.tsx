import React from 'react';
import Navigation from './_components/sidebar/navigation';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '../../lib/providers/theme-provider';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { Home, LineChart, Package, Package2, PanelLeft, ShoppingCart, Users2 } from 'lucide-react';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-[100vh] sm:w-full h-screen overflow-hidden flex flex-row relative'>
      <Navigation />
      <section className='flex flex-col p-10 sm:ml-20 w-full bg-muted/40'>
        <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden m-auto">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs max-w-80">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        {children}
      </section>
      <Toaster />
    </main>
  );
};

export default PlatformLayout;
