import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { fetchTransactions } from "./";

function useGetItems(itemsPerPage = 11) {
  const [transactions, setTransactions] = useState([]);

  const [sortingQuery, setSortingQuery] = useState(null);
  const [pagination, setpagination] = useState({
    currentPage: 1,
    direction: "next",
    firstVisible: null,
    lastVisible: null,
    isLast: false,
  });

  const { user } = useUser();

  const getItems = async () => {
    try {
      const snapshot = await fetchTransactions({
        uid: user.id,
        sortingQuery: sortingQuery,
        pagination: pagination,
        itemsPerPage: itemsPerPage,
      });

      let cleanedData = [];

      snapshot.forEach((document) => {
        cleanedData.push({ id: document.id, ...document.data() });
      });

      setTransactions(cleanedData.slice(0, itemsPerPage - 1));
      setpagination({
        ...pagination,
        firstVisible: snapshot.docs[0],
        lastVisible: snapshot.docs[snapshot.docs.length - 2],
        isLast: snapshot.docs.length < itemsPerPage,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleTableControls = (pageNumber, direction, sortQuery) => {
    setpagination({
      ...pagination,
      currentPage: pageNumber,
      direction: direction,
    });

    if (sortQuery) {
      setSortingQuery(sortQuery.type ? sortQuery : null);
    }
  };

  useEffect(() => {
    getItems();
  }, [pagination.currentPage, pagination.direction, sortingQuery]);

  return {
    transactions,
    handleTableControls,
    currentPage: pagination.currentPage,
    isLast: pagination.isLast,
  };
}

export default useGetItems;
