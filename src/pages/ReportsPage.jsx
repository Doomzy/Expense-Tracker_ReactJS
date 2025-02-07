import {
  TotalBalance,
  SectionTitle,
  DoughnutChart,
  InputField,
} from "../components";
import { useEffect, useState } from "react";
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUser } from "@clerk/clerk-react";

function ReportsPage() {
  const [groupedIncome, setGroupedIncome] = useState({ total: 0, items: {} });
  const [groupedExpense, setGroupedExpense] = useState({ total: 0, items: {} });

  const uid = useUser().user.id;
  const transactionsRef = collection(db, "transactions");

  const maxDate = new Date();

  const [reportRange, setReportRange] = useState({
    start: maxDate,
    end: maxDate,
  });

  useEffect(() => {
    handleSubmit();
  }, []);

  async function handleSubmit() {
    let incomes = { total: 0, items: {} },
      expenses = { total: 0, items: {} };

    const tbQuery = query(
      transactionsRef,
      where("uid", "==", uid),
      where("datetime", ">=", reportRange.start),
      where("datetime", "<=", reportRange.end)
    );

    const snapshot = await getDocs(tbQuery);
    snapshot.docs.forEach((transaction) => {
      const transactionData = transaction.data();
      if (transactionData.type == "income") {
        incomes.total += transactionData.amount;
        !incomes[transactionData.category]
          ? (incomes.items[transactionData.category] = transactionData.amount)
          : (incomes.items[transactionData.category] += transactionData.amount);
      } else {
        expenses.total += transactionData.amount;
        !expenses[transactionData.category]
          ? (expenses.items[transactionData.category] = transactionData.amount)
          : (expenses.items[transactionData.category] +=
              transactionData.amount);
      }
    });

    setGroupedIncome(incomes);
    setGroupedExpense(expenses);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (value) {
      const date = new Date(value);
      date.setUTCHours(0);
      setReportRange({
        ...reportRange,
        [name]: date,
      });
    }
  }

  return (
    <div className="w-[90%] 2xl:w-3/4 m-auto mt-16">
      <TotalBalance />
      <SectionTitle text="Report Range:" link_to={""} />
      <div className="bg-white md:w-fit w-full gap-4 md:flex justify-between p-3 mb-4 rounded-xl items-center">
        <div id="Report_Range" className=" block md:flex gap-5 pe-3">
          <InputField
            required
            name="start"
            label="From: "
            type="date"
            handleChange={handleChange}
            value={reportRange.start.toISOString().split("T")[0]}
            max={reportRange.end.toISOString().split("T")[0]}
          />
          <InputField
            required
            name="end"
            label="To: "
            type="date"
            handleChange={handleChange}
            value={reportRange.end.toISOString().split("T")[0]}
            max={maxDate.toISOString().split("T")[0]}
            min={reportRange.start.toISOString().split("T")[0]}
          />
        </div>

        <button
          className="md:w-fit w-full self-end rounded-xl h-fit me-3 py-4 mt-3 md:mt-0 md:px-7 text-secondary-normal font-bold hover:scale-105 transition-all bg-primary-normal"
          onClick={() => handleSubmit()}
        >
          Find
        </button>
      </div>
      <div className="bg-white rounded-xl grid md:grid-flow-col divide-y-[1rem] md:divide-y-0 md:divide-x-[1rem] divide-primary-normal">
        <DoughnutChart
          dataProps={groupedIncome}
          title={"Income"}
          titleColor={"green"}
        />
        <DoughnutChart
          dataProps={groupedExpense}
          title={"Expense"}
          titleColor={"red"}
        />
      </div>
    </div>
  );
}

export default ReportsPage;
