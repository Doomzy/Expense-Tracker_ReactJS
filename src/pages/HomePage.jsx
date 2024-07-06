import { Money_Icon } from "../assets";
import { NewTransactionCard, LatestEarnings } from "../components";
import { latest_transaction } from "../constants";

function HomePage() {
  return (
    <div className="w-[90%] 2xl:w-4/5 m-auto mt-24">
      <div className="flex gap-4 box_shadow justify-center bg-white w-full lg:w-fit min-w-80 px-5 py-8 rounded-xl m-auto font-semibold text-primary-dark">
        <div className="content-center">
          <Money_Icon width={90} height={90} />
        </div>
        <div>
          <p className=" text-xl">Total Balance</p>
          <span className="text-6xl text-green">${1000000}</span>
        </div>
      </div>
      <div className=" lg:grid grid-cols-3 gap-12 2xl:gap-22 mt-14">
        <NewTransactionCard />
        <div className=" col-span-2">
          <LatestEarnings data={latest_transaction} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
