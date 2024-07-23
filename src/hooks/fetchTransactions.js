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
} from "firebase/firestore";
import { db } from "../firebase/firebase.js";

async function fetchTransactions({
  uid,
  sortingQuery,
  pagination,
  itemsPerPage,
}) {
  const transactionsRef = collection(db, "transactions");

  sortingQuery = sortingQuery ?? {
    column: "datetime",
    type: "desc",
  };
  const directionQuery =
    pagination.firstVisible && pagination.currentPage !== 1
      ? pagination.direction == "next"
        ? [startAfter(pagination.lastVisible), limit(itemsPerPage)]
        : [endAt(pagination.firstVisible), limitToLast(itemsPerPage)]
      : [limit(itemsPerPage)];

  try {
    const myQuery = query(
      transactionsRef,
      where("uid", "==", uid),
      orderBy(sortingQuery.column, sortingQuery.type),
      ...directionQuery
    );
    const snapshot = await getDocs(myQuery);
    return snapshot;
  } catch (err) {
    console.log(err);
  }
}

export default fetchTransactions;