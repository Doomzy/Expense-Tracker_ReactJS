import { db } from "../firebase/firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";

function useAddItem() {
  const transactionsRef = collection(db, "transactions");
  const { user } = useUser();

  const addItem = async ({
    title,
    description,
    amount,
    type,
    category,
    datetime,
  }) => {
    await addDoc(transactionsRef, {
      uid: user.id,
      title,
      description,
      amount,
      type,
      category,
      datetime: Timestamp.fromDate(new Date(datetime)),
      createdAt: serverTimestamp(),
    });
  };

  return { addItem };
}

export default useAddItem;
