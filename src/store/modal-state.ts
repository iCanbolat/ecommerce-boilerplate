import { Category, Product } from '@prisma/client';
import { create } from 'zustand';

interface ModalState<T> {
  isOpen: boolean;
  selectedItem: T | null;
  openModal: (item: T) => void;
  closeModal: () => void;
}

const createModalStore = <T>() =>
  create<ModalState<T>>((set) => ({
    isOpen: false,
    selectedItem: null,
    openModal: (item: T) => set({ isOpen: true, selectedItem: item }),
    closeModal: () => set({ isOpen: false, selectedItem: null }),
  }));

export const useCategoryModalStore = createModalStore<Category>();
export const useProductModalStore = createModalStore<Product>();
