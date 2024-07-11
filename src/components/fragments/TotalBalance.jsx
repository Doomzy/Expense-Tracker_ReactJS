import { Money_Icon } from "../../assets";

function TotalBalance() {
  return (
    <div className="flex gap-4 box_shadow justify-center bg-white w-full lg:w-fit min-w-80 px-5 py-8 rounded-xl m-auto font-semibold text-primary-dark">
      <div className="content-center">
        <Money_Icon width={90} height={90} />
      </div>
      <div>
        <p className=" text-xl">Total Balance</p>
        <span className="text-6xl text-green">${1000000}</span>
      </div>
    </div>
  );
}

export default TotalBalance;
