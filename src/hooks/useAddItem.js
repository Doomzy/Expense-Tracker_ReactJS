import { db } from "../firebase/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";

function useAddItem() {
  const transactionsRef = collection(db, "transactions");
  const { user } = useUser();

  const addItem = async ({
    title,
    description,
    amount,
    isExpense,
    category,
    datetime,
  }) => {
    await addDoc(transactionsRef, {
      uid: user.id,
      title,
      description,
      amount,
      isExpense,
      category,
      datetime,
      createdAt: serverTimestamp(),
    });
  };

  return { addItem };
}

export default useAddItem;
