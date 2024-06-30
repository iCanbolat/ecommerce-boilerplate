'use client';
import React from 'react';
import { useProductModalStore } from '@/store/modal-state';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Category } from '@prisma/client';

type ViewProductProps = {
  addOptimisticItem: (newItem: Category) => void;
};

const ViewProduct = ({ addOptimisticItem }: ViewProductProps) => {
  const isOpen = useProductModalStore((state) => state.isOpen);
  const selectedItem = useProductModalStore((state) => state.selectedItem);
  const closeModal = useProductModalStore((state) => state.closeModal);

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

export default ViewProduct;
