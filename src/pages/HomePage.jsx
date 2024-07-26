import {
  NewTransactionCard,
  LatestEarnings,
  CustomTable,
  SectionTitle,
  ModalOpenBtn,
  Modal,
  TotalBalance,
} from "../components";
import { latest_transaction } from "../constants";

function HomePage() {
  return (
    <div className="w-[90%] 2xl:w-4/5 m-auto mt-24">
      <TotalBalance />
      <div className=" lg:grid grid-cols-3 gap-12 2xl:gap-22 mt-14">
        <NewTransactionCard extra_classes="lg:block hidden" />
        <div className=" col-span-2">
          <LatestEarnings data={latest_transaction} />
          <SectionTitle text="Latest Transactions" link_to="/dashboard" />
          <CustomTable class_name="table" />
        </div>
      </div>
      <Modal />
      <ModalOpenBtn />
    </div>
  );
}

export default HomePage;
