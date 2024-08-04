import { SectionTitle, LoadingIcon } from "./";
import { fetchTransactions, useModalStore } from "../hooks";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

function LatestEarnings() {
  const { user } = useUser();
  const [latestEarning, setLatestEarning] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const handleOpen = useModalStore((state) => state.handleOpen);
  const setContentDetails = useModalStore((state) => state.setContentDetails);

  useEffect(() => {
    setisLoading(true);
    const getEarnings = async () => {
      const snapshot = await fetchTransactions({
        uid: user.id,
        itemsPerPage: 4,
        filteringQuery: { column: "type", type: "income" },
      });

      setLatestEarning(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setisLoading(false);
    };
    getEarnings();
  }, []);

  return (
    <div>
      <SectionTitle text="Latest Income" link_to="/" />
      {isLoading ? (
        <div className="pb-5">
          <LoadingIcon />
        </div>
      ) : latestEarning.length != 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7 text-primary-normal">
          {latestEarning.map((transaction) => (
            <div
              onClick={() => {
                setContentDetails(transaction);
                handleOpen("transactionDetails");
              }}
              key={transaction.id}
              className="bg-green py-10 content-center text-center rounded-2xl grid hover:scale-105 cursor-pointer"
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
        <div className="my-4 bg-green py-10 content-center text-center rounded-2xl">
          <span className="text-4xl text-white font-semibold">
            No Transactions
          </span>
        </div>
      )}
    </div>
  );
}

export default LatestEarnings;
