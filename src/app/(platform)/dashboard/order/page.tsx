import React from 'react';
import { DataTable } from '../../_components/table/data-table';
//import products from '../product/products.json'
import { columns } from '../../_components/table/columns/order-cols';
import { IOrder, OrderStatus, ProductStatus } from '../../../../utils/types';

type Props = {};

const OrderPage = (props: Props) => {
  const products: IOrder[] = [
    {
      id: 1,
      createdAt: new Date(),
      userName: 'Fatih',
      status: OrderStatus.fulfilled,
      amount: 500,
      isPaid: true,
      productTitle: 'Zort',
      shippingAddress: 'asd',
    },
  ];
  return (
    <div>
      <DataTable data={products} columns={columns} />
    </div>
  );
};

export default OrderPage;
