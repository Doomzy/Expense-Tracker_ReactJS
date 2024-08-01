import { fetchTransactions } from ".";
import { create } from "zustand";

const useTransactionsStore = create((set, getState) => ({
  transactions: [],
  sortingQuery: null,
  filteringQuery: null,
  pagination: {
    currentPage: 1,
    direction: "next",
    firstVisible: null,
    lastVisible: null,
    isLast: false,
  },

  handleTableControls: (pageNumber, direction, sortQuery, filterQuery) => {
    set((state) => ({
      pagination: {
        ...state.pagination,
        currentPage: pageNumber ?? state.pagination.currentPage,
        direction: direction,
      },
    }));

    if (sortQuery) {
      set(() => ({
        sortingQuery: sortQuery?.type ? sortQuery : null,
      }));
    }

    if (filterQuery) {
      set(() => ({
        filteringQuery: filterQuery?.type ? filterQuery : null,
      }));
    }
  },

  getTransactions: async (itemsPerPage = 11, uid) => {
    try {
      const snapshot = await fetchTransactions({
        uid: uid,
        sortingQuery: getState().sortingQuery,
        pagination: getState().pagination,
        filteringQuery: getState().filteringQuery,
        itemsPerPage: itemsPerPage,
      });

      let cleanedData = [];

      snapshot.forEach((document) => {
        cleanedData.push({ id: document.id, ...document.data() });
      });

      set((state) => ({
        transactions: cleanedData.slice(0, itemsPerPage - 1),
        pagination: {
          ...state.pagination,
          firstVisible: snapshot.docs[0],
          lastVisible: snapshot.docs[snapshot.docs.length - 2],
          isLast: snapshot.docs.length < itemsPerPage,
        },
      }));
      console.log(snapshot);
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useTransactionsStore;
