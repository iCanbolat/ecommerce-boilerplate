'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DataTable } from '../../_components/table/data-table';
import { columns } from '../../_components/table/columns/product-cols';
import { IProduct, ProductStatus } from '../../../../utils/types';

function Products() {
  const products: IProduct[] = [
    {
      id: 1,
      createdAt: new Date(),
      image: 'https://github.com/shadcn.png',
      title: 'testtest test testtest',
      status: ProductStatus.ACTIVE,
      price: 500,
      totalSale: 50,
    },
  ];
  return (
    <div className='flex min-h-screen w-full flex-col '>
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
            <div className='flex items-center'></div>
            <Card x-chunk='dashboard-06-chunk-0'>
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={products} />
              </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
export default Products;
