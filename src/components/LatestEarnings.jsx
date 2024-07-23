import { Link } from "react-router-dom";
import { SectionTitle } from "./";
import { fetchTransactions } from "../hooks";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

function LatestEarnings() {
  const { user } = useUser();
  const [latestEarning, setLatestEarning] = useState([]);

  useEffect(() => {
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
    };
    getEarnings();
  }, []);

  return (
    <div>
      <SectionTitle text="Latest Income" link_to="/" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-7 text-primary-normal">
        {latestEarning.map((transaction) => (
          <Link
            to=""
            key={transaction.id}
            className="bg-green py-10 content-center text-center rounded-2xl grid hover:scale-105"
          >
            <span className="font-bold text-sm">
              {new Date(transaction.datetime).toDateString()}
            </span>
            <span className="font-bold text-2xl">{transaction.category}</span>
            <span className="text-4xl text-white font-semibold">
              ${transaction.amount}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LatestEarnings;
