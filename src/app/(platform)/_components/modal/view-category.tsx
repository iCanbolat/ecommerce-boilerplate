'use client';
import React from 'react';
import { useCategoryModalStore } from '@/store/modal-state';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Category } from '@prisma/client';
import { OptimisticUpdateTypes } from '../../../../utils/types';

type ViewCategoryProps = {
  setOptimisticItem: (action: {
    action: OptimisticUpdateTypes;
    newCategory: Category;
  }) => void;
};

const ViewCategory = ({ setOptimisticItem }: ViewCategoryProps) => {
  const isOpen = useCategoryModalStore((state) => state.isOpen);
  const selectedItem = useCategoryModalStore((state) => state.selectedItem);
  const closeModal = useCategoryModalStore((state) => state.closeModal);

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedItem?.name}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCategory;
