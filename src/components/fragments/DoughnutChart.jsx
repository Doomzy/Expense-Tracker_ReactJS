import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { Tooltip, Legend } from "chart.js";

function DoughnutChart({ dataProps = {}, title, titleColor }) {
  Chart.register(Tooltip, Legend);

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
    labels: Object.keys(dataProps),
    datasets: [
      {
        data: Object.values(dataProps),
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
    options: {
      plugins: {
        responsive: true,
      },
    },
  };

  return (
    <div className="p-6">
      <p
        className={` font-mono text-3xl uppercase font-semibold text-${titleColor} text- pb-8`}
      >
        {title}
      </p>
      <div className="max-h-[30.5rem] flex justify-center">
        <Doughnut data={data} />
      </div>
    </div>
  );
}

export default DoughnutChart;
