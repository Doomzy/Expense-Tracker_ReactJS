import { Money_Icon } from "../../assets";
import { useEffect } from "react";
import { useTotalBalanceStore } from "../../hooks";
import { useUser } from "@clerk/clerk-react";

function TotalBalance() {
  const totalBalance = useTotalBalanceStore((state) => state.totalBalance);
  const totalIncome = useTotalBalanceStore((state) => state.totalIncome);
  const totalExpense = useTotalBalanceStore((state) => state.totalExpense);
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
    <div className="sm:flex block gap-7 box_shadow justify-center bg-white w-full lg:w-fit min-w-96 ms:px-14 px-5 py-3 rounded-xl m-auto font-semibold text-primary-dark">
      <div className="content-center sm:block hidden">
        <Money_Icon width={100} height={100} />
      </div>
      <div>
        <span className=" text-lg">This</span>
        <select
          onChange={handlePeriodChange}
          name="tbPeriod"
          id="tbPeriod"
          className=" text-lg text-primary-normal"
          value={period.value}
        >
          <option value="Year">Year</option>
          <option value="Quarter">Quarter</option>
          <option value="Month">Month</option>
        </select>
        <p className=" text-2xl">Total Balance</p>

        <span className="text-6xl">
          ${totalBalance.toLocaleString("en-US")}
        </span>
        <div className="flex justify-between gap-8 mt-2 font-bold text-base">
          <span className="text-green">
            ${totalIncome.toLocaleString("en-US")}
            &#8593;
          </span>
          <span className="text-red">
            ${totalExpense.toLocaleString("en-US")}
            &#8595;
          </span>
        </div>
      </div>
    </div>
  );
}

export default TotalBalance;
