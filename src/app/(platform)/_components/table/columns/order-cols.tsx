'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { labels, priorities, productstatus, statuses } from '../data';
//import { Task } from '../../../../../lib/table-schemas/task-schema'
import { DataTableRowActions } from '../data-table-row-actions';
import { DataTableColumnHeader } from '../data-table-column-header';
import { IOrder, IProduct } from '../../../../../utils/types';
import Image from 'next/image';

export const columns: ColumnDef<IOrder>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'userName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Customer Name' />
    ),
    cell: ({ row }) => <div className='w-full'>{row.getValue('userName')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'productTitle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Product' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('productTitle')}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'isPaid',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = productstatus.find(
        (status) => status.value === row.getValue('isPaid')
      );

      if (!status) {
        return null;
      }

      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <span>{row.getValue('amount')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'shippingAddress',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Shipping Address' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <span>{row.getValue('shippingAddress')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <span>{row.original.createdAt.toLocaleDateString()}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
