import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  contentType: null,
  contentDetails: null,
  setContentDetails: (details) => set({ contentDetails: details }),
  handleOpen: (contentType) => set({ isOpen: true, contentType: contentType }),
  handleClose: () => set({ isOpen: false, contentDetails: null }),
}));

export default useModalStore;
