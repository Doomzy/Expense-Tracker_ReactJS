function MenuBtn({ onClick, children }) {
  return (
    <button onClick={onClick} className="items-center p-2 md:hidden">
      {children}
    </button>
  );
}

export default MenuBtn;
