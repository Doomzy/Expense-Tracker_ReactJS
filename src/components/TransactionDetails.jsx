import { useModalStore } from "../hooks";

function TransactionDetails() {
  const contentDetails = useModalStore((state) => state.contentDetails);
  const timedate = new Date(
    contentDetails.datetime.seconds * 1000 +
      contentDetails.datetime.nanoseconds / 1000000
  );

  return (
    <div className=" sticky top-[4rem] bg-white text-white rounded-xl h-fit box_shadow font-semibold">
      <p
        className={` text-4xl mb-6 bg-secondary-dark w-full px-4 py-6 rounded-tr-xl rounded-tl-xl`}
      >
        {contentDetails.title}
      </p>
      <div className=" px-4 pb-6 pt-2">
        <p
          className={` float-end text-4xl border-2 ${
            contentDetails.type == "income"
              ? "border-green text-green"
              : "border-red text-red"
          } p-3 rounded-lg`}
        >
          {contentDetails.amount}$
        </p>
        <div className="flex gap-2">
          <DetailsText header="Date" info={timedate.toDateString()} />
          <DetailsText header="Time" info={timedate.toLocaleTimeString()} />
        </div>

        <div className="flex gap-4">
          <DetailsText header="Type" info={contentDetails.type} />
          <DetailsText header="Category" info={contentDetails.category} />
        </div>

        <DetailsText
          header="Description"
          info={
            contentDetails.description == ""
              ? "No description"
              : contentDetails.description
          }
        />
      </div>
    </div>
  );
}

function DetailsText({ header, info }) {
  return (
    <p className="text-base mb-3 text-primary-dark">
      {header}
      <p className=" text-xl border bg-gray-300 w-fit p-2 rounded-lg">{info}</p>
    </p>
  );
}

export default TransactionDetails;
