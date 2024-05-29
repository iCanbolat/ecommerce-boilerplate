'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { priorities, statuses, productstatus } from './data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { File, PlusCircle } from 'lucide-react';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter tasks...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />

        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={productstatus}
          />
        )}
        {/*{table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={statuses}
          />
        )}*/}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title='Priority'
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <div className='flex space-x-2'>

      <DataTableViewOptions table={table} />
      <Button size='sm' variant='outline' className='h-8 gap-1'>
        <File className='h-3.5 w-3.5' />
        <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
          Export
        </span>
      </Button>
      <Button size='sm' className='h-8 gap-1'>
        <PlusCircle className='h-3.5 w-3.5' />
        <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
          Add Product
        </span>
      </Button>
      </div>
    </div>
  );
}
