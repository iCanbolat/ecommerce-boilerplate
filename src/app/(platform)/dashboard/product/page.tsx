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
import { IProduct } from '../../../../utils/types';
import { ProductStatus } from '@prisma/client';
import ImageSection from '../../_components/modal/create-product/image-section';
import prisma from '../../../../lib/prisma';

async function Products() {
  const productss = await prisma.product.findMany({
    include: {
      variants: {
        include: {
          variantValues: true,
        },
      },
      categories: true, // Include the categories associated with each product
    },
  });

  //console.log('sad',productss);
  

  const products: IProduct[] = [
    {
      id: '1',
      createdAt: new Date(),
      image: 'https://github.com/shadcn.png',
      title: 'testtest test testtest',
      status: ProductStatus.ACTIVE,
      price: 500,
      totalSale: 50,
    },
  ];
  return (
    <>
      <Card x-chunk='dashboard-06-chunk-0'>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
          {/*<div className='flex flex-row'>Breadcrumb</div>*/}
        </CardHeader>
        <CardContent>
          <DataTable page='product' columns={columns} data={products} />
        </CardContent>
      </Card>
    </>
  );
}
export default Products;
