import { db } from "../firebase/firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  documentId,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import { useTransactionsStore, useTotalBalanceStore } from "../hooks";

function useDeleteItem() {
  const transactionsRef = collection(db, "transactions");
  const { user } = useUser();
  const fetchTotalBalance = useTotalBalanceStore(
    (state) => state.fetchTotalBalance
  );
  const { getLastCreated, handleTableControls } = useTransactionsStore(
    (state) => ({
      getLastCreated: state.getLastCreated,
      handleTableControls: state.handleTableControls,
    })
  );

  const deleteItem = async (transactionId) => {
    try {
      const searchQuery = query(
        transactionsRef,
        where("uid", "==", user.id),
        where(documentId(), "==", transactionId)
      );
      const snapshot = await getDocs(searchQuery);

      const docRef = snapshot.docs[0].ref;
      await deleteDoc(docRef);
      fetchTotalBalance(user.id);
      handleTableControls(null, "refresh");
      getLastCreated(user.id);
    } catch (err) {
      console.log(err);
    }
  };

  return { deleteItem };
}

export default useDeleteItem;
