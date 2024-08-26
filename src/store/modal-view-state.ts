import { create } from 'zustand';

type ModalViewState = {
  isVariantView: boolean;
  toggleisVariantView: () => void;
  setisVariantView: (state: boolean) => void;
};

export const useSearchParamStore = create<ModalViewState>((set) => ({
  isVariantView: false,
  toggleisVariantView: () =>
    set((state) => ({ isVariantView: !state.isVariantView })),
  setisVariantView: (state: boolean) => set({ isVariantView: state }),
}));
