import { useState, useEffect } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
  limitToLast,
  endAt,
} from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { useUser } from "@clerk/clerk-react";

function useGetItems(itemsPerPage = 11) {
  const [transactions, setTransactions] = useState([]);

  const defaultSort = {
    column: "datetime",
    type: "desc",
  };
  const [sortingQuery, setSortingQuery] = useState(defaultSort);
  const [pagination, setpagination] = useState({
    currentPage: 1,
    direction: "next",
    firstVisible: null,
    lastVisible: null,
    isLast: false,
  });

  const transactionsRef = collection(db, "transactions");
  const { user } = useUser();

  const getItems = async () => {
    const directionQuery =
      pagination.firstVisible && pagination.currentPage !== 1
        ? pagination.direction == "next"
          ? [startAfter(pagination.lastVisible), limit(itemsPerPage)]
          : [endAt(pagination.firstVisible), limitToLast(itemsPerPage)]
        : [limit(itemsPerPage)];

    try {
      const myQuery = query(
        transactionsRef,
        where("uid", "==", user.id),
        orderBy(sortingQuery.column, sortingQuery.type),
        ...directionQuery
      );
      const snapshot = await getDocs(myQuery);

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
      setSortingQuery(sortQuery.type ? sortQuery : defaultSort);
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
