import React from 'react';
import { DataTable } from '../../_components/table/data-table';
//import products from '../product/products.json'
import { columns } from '../../_components/table/columns/order-cols';
import { IOrder } from '../../../../utils/types';
import { OrderStatus } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {};

const OrderPage = (props: Props) => {
  const products: IOrder[] = [
    {
      id: 1,
      createdAt: new Date(),
      userName: 'Fatih',
      status: OrderStatus.PREPARING,
      amount: 500,
      isPaid: true,
      productTitle: 'Zort',
      shippingAddress: 'asd',
    },
  ];
  return (
    <div className='flex min-h-screen  flex-col'>
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <Card x-chunk='dashboard-06-chunk-0'>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable page='order' data={products} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderPage;
