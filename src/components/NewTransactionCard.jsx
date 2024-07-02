import { useState } from "react";
import { transaction_Categories } from "../constants";
import InputField from "./fragments/InputField.jsx";

function NewTransactionCard() {
  const [formData, setformData] = useState({
    amount: "",
    isExpense: false,
    category: "",
    description: "",
    datetime: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  }

  return (
    <div className=" bg-white text-white rounded-xl h-fit box_shadow font-semibold">
      <p
        className={` text-4xl mb-6 ${
          formData.isExpense ? " bg-red " : " bg-green "
        }w-full py-6 px-4 rounded-tr-xl rounded-tl-xl`}
      >
        New Transaction
      </p>
      <form
        action="/"
        className="pb-6 px-4 lg:px-10"
        method="post"
        id="Transaction_Form"
      >
        <InputField
          value={formData.amount}
          handleChange={handleChange}
          name="amount"
          label="Amount"
          type="number"
          msg="Max Amount $9999999"
          placeholder="Ex: 15.30 | 100 | 1000.50"
        />

        <div className=" text-lg inline-flex gap-5 items-center justify-center mt-4 w-full">
          <TypeBtn
            text="Income"
            onclick={() => setformData({ ...formData, isExpense: false })}
          />

          <input
            type="checkbox"
            className="sr-only cursor-pointer peer"
            checked={formData.isExpense}
            onChange={handleChange}
          />
          <div
            onClick={() =>
              setformData({ ...formData, isExpense: !formData.isExpense })
            }
            className="cursor-pointer relative w-32 h-10 rounded-full peer bg-green peer-checked:after:translate-x-[4.5rem] rtl:peer-checked:after:-translate-x-full peer-checked:after:border-secondary-dark after:content-[''] after:absolute after:top-1 after:start-[4px] after:bg-white after:border after:rounded-full after:h-8 after:w-12 after:transition-all peer-checked:bg-red"
          ></div>

          <TypeBtn
            text="Expense"
            onclick={() => setformData({ ...formData, isExpense: true })}
          />
        </div>

        <label htmlFor="Category" className=" text-lg ms-2">
          Category
          <select
            onChange={handleChange}
            name="category"
            id="category"
            className=" rounded-2xl w-full p-2 text-base"
          >
            <option value="PlaceHolder">Select a Category</option>
            {transaction_Categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <InputField
          value={formData.description}
          handleChange={handleChange}
          name="description"
          label="Description"
          type="text"
          msg="Max Length is 80 Characters"
          maxLength={80}
          placeholder="Transaction's Description"
        />
        <InputField
          value={formData.date}
          handleChange={handleChange}
          label="Date & Time"
          name="datetime"
          type="datetime-local"
          max={new Date().toISOString().slice(0, 16)}
          msg="Cannot be in the future"
        />
        <div className="flex justify-end mt-10 lg:mt-6">
          <button
            type="submit"
            className=" w-full text-white lg:w-fit bg-primary-normal px-10 py-3 rounded-lg transition-all hover:scale-105 lg:hover:scale-110 hover:bg-primary-dark"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

function TypeBtn({ text, onclick }) {
  return (
    <button className="btn cursor-pointer " type="button" onClick={onclick}>
      {text}
    </button>
  );
}

export default NewTransactionCard;
