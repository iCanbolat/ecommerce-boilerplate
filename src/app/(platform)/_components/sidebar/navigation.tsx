'use client';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import NavigationLink from './navigation-link';

import {
  Home,
  LayoutDashboard,
  LineChart,
  LogOut,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
  Notebook,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProjectLink from './project-link';
import ProjectNavigation from './project-navigation';
import { Separator } from '@/components/ui/separator';
import { cn } from '../../../../lib/utils';
import { usePathname } from 'next/navigation';

const containerVariants = {
  close: {
    width: '5rem',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: '16rem',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
};

const avatarVariants = {
  close: {
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    margin: 'auto',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
};

//const svgVariants = {
//  close: {
//    rotate: 360,
//  },
//  open: {
//    rotate: 180,
//  },
//};

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      containerControls.start('open');
      svgControls.start('open');
    } else {
      containerControls.start('close');
      svgControls.start('close');
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    setSelectedProject(null);
  };

  return (
    <div
      onMouseEnter={() => handleOpenClose()}
      onMouseLeave={() => handleOpenClose()}
      className=''
    >
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial='close'
        className='bg-slate-900 hidden lg:flex flex-col gap-20 p-5 absolute top-0 left-0 h-full shadow shadow-neutral-600 z-50'
      >
        <div className='flex flex-row w-full justify-between place-items-center'>
          <motion.div
            className='h-4'
            animate={containerControls}
            variants={avatarVariants}
          >
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
        <div className='flex flex-col gap-4'>
          <Separator />
          {navLinks.map((item, idx) => (
            <NavigationLink href={item.href} name={item.name} key={idx}>
              <item.icon
                className={cn(
                  ' min-w-8 w-8 p-0.5 h-full stroke-[1.70]',
                  item.href === pathname && 'bg-white rounded-md text-black'
                )}
              />
            </NavigationLink>
          ))}
        </div>
        {/*<div className='flex flex-col gap-3'>
          <ProjectLink
            name='Virtual Reality'
            setSelectedProject={setSelectedProject}
          >
            <div className='min-w-4 mx-2 border-pink-600 border rounded-full aspect-square bg-pink-700' />
          </ProjectLink>
          <ProjectLink
            name='Apple Vision Pro'
            setSelectedProject={setSelectedProject}
          >
            <div className='min-w-4 mx-2 border-indigo-600 border rounded-full aspect-square bg-indigo-700' />
          </ProjectLink>
          <ProjectLink name='Porsche' setSelectedProject={setSelectedProject}>
            <div className='min-w-4 mx-2 border-cyan-600 border rounded-full aspect-square bg-cyan-700' />
          </ProjectLink>
          <ProjectLink
            name='Secret Project'
            setSelectedProject={setSelectedProject}
          >
            <div className='min-w-4 mx-2 border-yellow-600 border rounded-full aspect-square bg-yellow-700' />
          </ProjectLink>
        </div>*/}
      </motion.nav>
      {/*<AnimatePresence>
        {selectedProject && (
          <ProjectNavigation
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>*/}
    </div>
  );
};

export default Navigation;
