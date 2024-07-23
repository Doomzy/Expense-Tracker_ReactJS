import { CustomTable, TotalBalance, SectionTitle, Modal } from "../components";

function DashboardPage() {
  return (
    <div className="w-[90%] 2xl:w-3/4 m-auto mt-24">
      <TotalBalance />
      <SectionTitle text="My Transactions" link_to={""} />
      <CustomTable
        class_name=" md:w-full w-max"
        itemsPerPage={11}
        enableControls={true}
      />
      <Modal display_type="block" />
    </div>
  );
}

export default DashboardPage;
