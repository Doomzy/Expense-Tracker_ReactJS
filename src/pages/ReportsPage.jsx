import { TotalBalance, SectionTitle, DoughnutChart } from "../components";

function ReportsPage() {
  const data = [
    { label: "1", value: "23" },
    { label: "2", value: "145" },
    { label: "3", value: "68" },
    { label: "4", value: "200" },
    { label: "5", value: "56" },
    { label: "6", value: "12" },
    { label: "7", value: "34" },
  ];

  return (
    <div className="w-[90%] 2xl:w-3/4 m-auto mt-24">
      <TotalBalance />
      <SectionTitle text="Reports" link_to={""} />
      <div className="bg-white rounded-xl grid md:grid-flow-col divide-y-[1rem] md:divide-y-0 md:divide-x-[1rem] divide-primary-normal">
        <DoughnutChart dataProps={data} title={"Income"} titleColor={"green"} />
        <DoughnutChart dataProps={data} title={"Expense"} titleColor={"red"} />
      </div>
    </div>
  );
}

export default ReportsPage;
