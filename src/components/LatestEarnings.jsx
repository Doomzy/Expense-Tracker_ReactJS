import { Link } from "react-router-dom";
import { SectionTitle } from "./";

function LatestEarnings({ data }) {
  return (
    <div>
      <SectionTitle text="Latest Income" link_to="/" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-7 text-primary-normal">
        {data.map((transaction) => (
          <Link
            to=""
            key={transaction.id}
            className="bg-green py-10 content-center text-center rounded-2xl grid hover:scale-105"
          >
            <span className="font-bold text-sm">{transaction.date}</span>
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
