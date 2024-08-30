import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  id?: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const chartModalState = create<ModalState>((set) => ({
  isOpen: false,
  id: undefined,
  onOpen: (id) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
