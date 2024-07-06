import { Link } from "react-router-dom";

function LatestEarnings({ data }) {
  return (
    <div>
      <div className="flex justify-between my-5 font-semibold text-md text-secondary-normal">
        <p className=" text-white text-4xl font-semibold md:mt-1">
          Latest Earnings
        </p>
        <button className="border border-secondary-dark px-3 py-2 h-fit rounded-xl hover:scale-105 transition-all">
          See More
        </button>
      </div>

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
