import { Chart as ChartJS, Title, Tooltip, Legend } from "chart.js";
import {
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarController, // Register the BarController
  CategoryScale,
  LinearScale,
  BarElement // Register the BarElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltips: {
      position: "nearest",
      mode: "index",
      intersect: false,
      yPadding: 10,
      xPadding: 10,
      caretSize: 8,
      backgroundColor: "rgba(72, 241, 12, 1)",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 4,
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset",
      data: labels.map(() => faker.datatype.number({ min: 100, max: 400 })),
      backgroundColor: "rgba(7, 5, 79, 0.8)",
      borderColor: "rgb(7, 5, 79)",
      borderWidth: 1,
    },
  ],
};

export default function StatisticsChart() {
  return <Bar options={options} data={data} />;
}
