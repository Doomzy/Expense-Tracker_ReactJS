import { Close_Icon } from "../assets";
import { useModalStore } from "../hooks";
import { NewTransactionCard, TransactionDetails } from "./";

function Modal({ display_type = "hidden" }) {
  const isOpen = useModalStore((state) => state.isOpen);
  const contentType = useModalStore((state) => state.contentType);
  const handleClose = useModalStore((state) => state.handleClose);

  document.body.style.overflowY = isOpen ? "hidden" : "scroll";

  return (
    <div
      className={`lg:${
        display_type == "hidden" && isOpen ? "block" : display_type
      } block absolute start-0`}
    >
      {isOpen && (
        <div className="modal">
          <div className="modal-bg" onClick={handleClose}></div>
          <div className="w-[95%] md:w-4/5 lg:w-2/4">
            <button
              className="top-3 right-3 relative float-end z-50 rounded-full bg-primary-normal bg-opacity-30"
              onClick={handleClose}
            >
              <Close_Icon width={45} height={45} />
            </button>

            {contentType == "transactionDetails" ? (
              <TransactionDetails />
            ) : (
              <NewTransactionCard />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
