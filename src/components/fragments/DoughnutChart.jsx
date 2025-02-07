import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { Legend } from "chart.js";

function DoughnutChart({ dataProps = {}, title, titleColor }) {
  Chart.register(Legend);

  const colors = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#ffa600",
  ];
  const data = {
    labels: Object.keys(dataProps.items),
    datasets: [
      {
        data: Object.values(dataProps.items),
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    aspectRatio: 1,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        labels: {
          boxWidth: 20,
          font: {
            size: 15,
          },
        },
      },
    },
  };

  return (
    <div className="pt-4 pb-12 divide-y-2 divide-opacity-55">
      <div className="flex justify-between p-6">
        <p
          className={` text-2xl uppercase font-bold text-${titleColor} text- pb-2`}
        >
          {title}
        </p>

        <p
          className={` text-3xl border-2 p-3 rounded-lg text-${titleColor} border-${titleColor}`}
        >
          {dataProps.total}$
        </p>
      </div>

      <div className="h-[20rem] flex justify-center">
        {JSON.stringify(dataProps.items) !== "{}" ? (
          <Doughnut data={data} options={options} />
        ) : (
          <p className="text-primary-dark font-semibold text-xl h-[20rem] w-[320px] text-center content-center">
            There is No Data in this Range
          </p>
        )}
      </div>
    </div>
  );
}

export default DoughnutChart;
