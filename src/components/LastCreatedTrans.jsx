import { SectionTitle } from "./";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useTransactionsStore, useModalStore } from "../hooks";

function LastCreatedTrans() {
  const { user } = useUser();

  const handleOpen = useModalStore((state) => state.handleOpen);
  const setContentDetails = useModalStore((state) => state.setContentDetails);

  const { lastCreated, getLastCreated } = useTransactionsStore((state) => ({
    lastCreated: state.lastCreated,
    getLastCreated: state.getLastCreated,
  }));

  useEffect(() => {
    if (user) {
      getLastCreated(user.id);
    }
  }, [user, getLastCreated]);

  return (
    <div>
      <SectionTitle text="Last Created" />
      {lastCreated.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7 text-primary-normal">
          {lastCreated.map((transaction) => (
            <div
              onClick={() => {
                setContentDetails(transaction);
                handleOpen("transactionDetails");
              }}
              key={transaction.id}
              className={
                (transaction.type == "income" ? "bg-green" : "bg-red") +
                " py-10 content-center text-center rounded-2xl grid hover:scale-105 cursor-pointer"
              }
            >
              <span className="font-bold text-sm">
                {new Date(
                  transaction.datetime.seconds * 1000 +
                    transaction.datetime.nanoseconds / 1000000
                ).toDateString()}
              </span>
              <span className="font-bold text-2xl">{transaction.category}</span>
              <span className="text-4xl text-white font-semibold">
                ${transaction.amount}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="my-4 bg-secondary-dark py-10 content-center text-center rounded-2xl">
          <span className="text-4xl text-white font-semibold">
            No Transactions
          </span>
        </div>
      )}
    </div>
  );
}

export default LastCreatedTrans;
