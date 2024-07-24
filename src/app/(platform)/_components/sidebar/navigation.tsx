'use client';
import NavigationLink from './navigation-link';
import { Home, LogOut, Package, ShoppingCart, Notebook } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '../../../../lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Categories',
    href: '/dashboard/category',
    icon: Notebook,
  },
  {
    name: 'Products',
    href: '/dashboard/product',
    icon: Package,
  },
  {
    name: 'Orders',
    href: '/dashboard/order',
    icon: ShoppingCart,
  },
  {
    name: 'Logout',
    icon: LogOut,
  },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className='bg-slate-900 hidden lg:flex flex-col gap-20 p-5 absolute top-0 left-0 h-full w-20 transition-all duration-300 hover:w-52 shadow ease-out shadow-neutral-600 z-50 group'>
        <div className='flex flex-row w-full justify-between place-items-center'>
          <div className='h-4 m-auto'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Separator />
          {navLinks.map((item, idx) => (
            <NavigationLink href={item.href} name={item.name} key={idx}>
              <item.icon
                className={cn(
                  'min-w-8 w-8 p-0.5 h-full stroke-[1.70]',
                  item.href === pathname && 'bg-white rounded-md text-black'
                )}
              />
            </NavigationLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
