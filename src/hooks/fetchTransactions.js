import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  limit,
  limitToLast,
  startAfter,
  endAt,
  startAt,
} from "firebase/firestore";
import { db } from "../firebase/firebase.js";

async function fetchTransactions({
  uid,
  sortingQuery,
  pagination,
  filteringQuery,
  itemsPerPage,
}) {
  const transactionsRef = collection(db, "transactions");

  filteringQuery = filteringQuery
    ? [where(filteringQuery.column, "==", filteringQuery.type)]
    : [];
  sortingQuery = sortingQuery ?? {
    column: "datetime",
    type: "desc",
  };

  let directionQuery = [limit(itemsPerPage)];
  if (pagination?.firstVisible && pagination?.currentPage !== 1) {
    switch (pagination.direction) {
      case "next":
        directionQuery = [
          startAfter(pagination.lastVisible),
          limit(itemsPerPage),
        ];
        break;
      case "previous":
        directionQuery = [
          endAt(pagination.firstVisible),
          limitToLast(itemsPerPage),
        ];
        break;
      case "refresh":
        directionQuery = [
          startAt(pagination.firstVisible),
          limit(itemsPerPage),
        ];
        break;
    }
  }

  try {
    const myQuery = query(
      transactionsRef,
      where("uid", "==", uid),
      orderBy(sortingQuery.column, sortingQuery.type),
      ...directionQuery,
      ...filteringQuery
    );
    const snapshot = await getDocs(myQuery);
    return snapshot;
  } catch (err) {
    console.log(err);
  }
}

export default fetchTransactions;
