import { useModalStore } from "../../hooks";
import { Plus_Icon } from "../../assets";

function ModalOpenBtn({ display_classes = "block" }) {
  const isOpen = useModalStore((state) => state.isOpen);
  const handleOpen = useModalStore((state) => state.handleOpen);

  return (
    !isOpen && (
      <div className={display_classes} onClick={handleOpen}>
        <button className="modal-open box_shadow">
          <Plus_Icon width={60} height={60} />
        </button>
      </div>
    )
  );
}

export default ModalOpenBtn;
