import { Money_Icon } from "../../assets";
import { useEffect } from "react";
import { useTotalBalanceStore } from "../../hooks";
import { useUser } from "@clerk/clerk-react";

function TotalBalance() {
  const totalBalance = useTotalBalanceStore((state) => state.totalBalance);
  const fetchTotalBalance = useTotalBalanceStore(
    (state) => state.fetchTotalBalance
  );
  const setPeriod = useTotalBalanceStore((state) => state.setPeriod);
  const period = useTotalBalanceStore((state) => state.period);

  const uid = useUser().user.id;
  useEffect(() => {
    fetchTotalBalance(uid);
  }, [period]);

  function handlePeriodChange(e) {
    setPeriod(e.target.value);
  }

  return (
    <div className="flex gap-7 box_shadow justify-center bg-white w-full lg:w-fit min-w-80 px-14 py-8 rounded-xl m-auto font-semibold text-primary-dark">
      <div className="content-center">
        <Money_Icon width={100} height={100} />
      </div>
      <div>
        <span className=" text-lg">This</span>
        <select
          onChange={handlePeriodChange}
          name="tbPeriod"
          id="tbPeriod"
          className=" text-lg"
          value={period.value}
        >
          <option value="Year">Year</option>
          <option value="Quarter">Quarter</option>
          <option value="Month">Month</option>
        </select>
        <p className=" text-2xl">Total Balance</p>

        <span className="text-6xl text-green">${totalBalance}</span>
      </div>
    </div>
  );
}

export default TotalBalance;
