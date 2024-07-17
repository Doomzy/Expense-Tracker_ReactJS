import { useState } from "react";
import { expense_Categories, income_Categories } from "../constants";
import InputField from "./fragments/InputField.jsx";
import { useAddItem } from "../hooks";

function NewTransactionCard({ extra_classes }) {
  const [errors, setErrors] = useState({});
  const [formData, setformData] = useState({
    amount: "",
    type: "income",
    category: "",
    title: "",
    description: "",
    datetime: "",
  });
  const { addItem } = useAddItem();

  function handleChange(e) {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  }

  function formValidation(data) {
    let errors = {};
    let floatamount = parseFloat(data.amount);
    if (data.amount == "" || floatamount > 1000000 || floatamount < 1) {
      errors.amount = "Invalid Amount";
    }
    if (data.category == "") {
      errors.category = "Please Choose a Category";
    }
    if (data.title == "" || data.title.length > 80) {
      errors.title = "Please Enter a valid Title";
    }
    if (data.title.length > 234) {
      errors.description = "Description cannot be greater than 234 characters";
    }
    if (
      data.datetime == "" ||
      data.datetime > new Date().toISOString().slice(0, 16)
    ) {
      errors.datetime = "Please Enter a valid Date/Time";
    }
    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = formValidation(formData);
    if (Object.keys(errors).length === 0) {
      addItem({
        ...formData,
        amount: ((formData.type == "expense" && -1) || 1) * formData.amount,
      });
      setformData({
        amount: "",
        type: "income",
        category: "",
        title: "",
        description: "",
        datetime: "",
      });
    } else {
      setErrors(errors);
    }
  }

  return (
    <div
      className={
        extra_classes +
        " sticky top-[4rem] bg-white text-white rounded-xl h-fit box_shadow font-semibold"
      }
    >
      <p
        className={` text-4xl mb-6 ${
          formData.type == "expense" ? " bg-red " : " bg-green "
        }w-full py-6 px-4 rounded-tr-xl rounded-tl-xl`}
      >
        New Transaction
      </p>
      <form
        action="/"
        className="pb-6 px-4 lg:px-10"
        method="post"
        id="Transaction_Form"
        onSubmit={handleSubmit}
      >
        <InputField
          value={formData.amount}
          handleChange={handleChange}
          name="amount"
          label="Amount"
          type="number"
          msg="Max Amount $1000000"
          error={errors.amount}
          placeholder="Ex: 15.30 | 100 | 1000.50"
        />

        <div className=" text-lg inline-flex gap-5 items-center justify-center mt-4 w-full">
          <TypeBtn
            text="Income"
            onclick={() =>
              setformData({ ...formData, type: "income", category: "" })
            }
          />

          <input
            type="checkbox"
            className="sr-only cursor-pointer peer"
            checked={formData.type == "expense"}
            onChange={handleChange}
          />
          <div
            onClick={() =>
              setformData({
                ...formData,
                category: "",
                type: (formData.type == "expense" && "income") || "expense",
              })
            }
            className="cursor-pointer relative w-32 h-10 rounded-full peer bg-green peer-checked:after:translate-x-[4.5rem] rtl:peer-checked:after:-translate-x-full peer-checked:after:border-secondary-dark after:content-[''] after:absolute after:top-1 after:start-[4px] after:bg-white after:border after:rounded-full after:h-8 after:w-12 after:transition-all peer-checked:bg-red"
          ></div>

          <TypeBtn
            text="Expense"
            onclick={() =>
              setformData({ ...formData, type: "expense", category: "" })
            }
          />
        </div>

        <label htmlFor="Category" className=" text-lg ms-2">
          Category
          <select
            onChange={handleChange}
            value={formData.category}
            name="category"
            id="category"
            className=" rounded-2xl w-full p-2 text-base"
          >
            <option value="PlaceHolder">Select a Category</option>
            {(
              (formData.type == "expense" && expense_Categories) ||
              income_Categories
            ).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className=" ms-3 mt-1 text-xs text-red font-normal">
              {errors.category}
            </p>
          )}
        </label>

        <InputField
          value={formData.title}
          handleChange={handleChange}
          name="title"
          label="Title"
          type="text"
          msg="Max Length is 80 Characters"
          error={errors.title}
          maxLength={80}
          placeholder="Transaction's Title"
        />

        <label className=" text-lg ms-2" htmlFor="description">
          Description
          <textarea
            value={formData.description}
            onChange={handleChange}
            name="description"
            id="description"
            placeholder="Transaction's Description"
            rows={4}
            maxLength={233}
          />
          {errors.description && (
            <p className=" ms-3 mt-1 text-xs text-red font-normal">
              {errors.description}
            </p>
          )}
        </label>

        <InputField
          value={formData.date}
          handleChange={handleChange}
          label="Date & Time"
          name="datetime"
          type="datetime-local"
          max={new Date().toISOString().slice(0, 16)}
          msg="Cannot be in the future"
          error={errors.datetime}
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
