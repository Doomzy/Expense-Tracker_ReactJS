import {
  NewTransactionCard,
  LatestEarnings,
  CustomTable,
  SectionTitle,
  ModalOpenBtn,
  Modal,
  TotalBalance,
} from "../components";

function HomePage() {
  return (
    <div className="w-[90%] 2xl:w-4/5 m-auto mt-24">
      <TotalBalance />
      <div className=" lg:grid grid-cols-3 gap-12 2xl:gap-22 mt-14">
        <NewTransactionCard extra_classes="lg:block hidden" />
        <div className=" col-span-2">
          <LatestEarnings />
          <SectionTitle text="Latest Transactions" link_to="/dashboard" />
          <CustomTable class_name="table" />
        </div>
      </div>
      <Modal />
      <ModalOpenBtn display_classes="block lg:hidden" />
    </div>
  );
}

export default HomePage;
