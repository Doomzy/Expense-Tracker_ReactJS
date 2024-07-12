import { useState } from "react";
import { NewTransactionCard } from "./";
import { Close_Icon, Plus_Icon } from "../assets";

function Modal({ display_type = "hidden" }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    document.body.style.overflowY = "hidden";
    setIsOpen(true);
  };
  const handleClose = () => {
    document.body.style.overflowY = "scroll";
    setIsOpen(false);
  };
  return (
    <div className={`lg:${display_type} block absolute start-0`}>
      {!isOpen && (
        <button className="modal-open box_shadow" onClick={handleOpen}>
          <Plus_Icon width={60} height={60} />
        </button>
      )}

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

            <NewTransactionCard />
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
