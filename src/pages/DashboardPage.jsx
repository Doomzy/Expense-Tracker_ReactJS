import { CustomTable, TotalBalance, SectionTitle } from "../components";
import { fake_transactions } from "../constants";

function DashboardPage() {
  return (
    <div className="w-[90%] 2xl:w-3/4 m-auto mt-24">
      <TotalBalance />
      <SectionTitle text="My Transactions" link_to={""} />
      <CustomTable data={fake_transactions} class_name=" md:w-full w-max" />
    </div>
  );
}

export default DashboardPage;
