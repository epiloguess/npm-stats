"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import {
  getChartOpt,
  monthList,
  getDatasets,
  getRandomRGB,
} from "../_libs/func";

export default function App({ data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    parsing: {
      xAxisKey: "day",
      yAxisKey: "downloads",
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "关闭较大比重的标签以放大密集区域",
      },
      tooltip: {
        mode: "nearest",
        intersect: false, // 如果为 true，则仅当鼠标位置与元素相交时才应用工具提示模式。如果为 false，则将始终应用该模式。
        displayColors: true,
        multiKeyBackground: "transparent",
        // xPadding: 10,
        // yPadding: 10,
        // titleMarginBottom: 10,
        // bodySpacing: 10,
      },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
  };

  let Color = getRandomRGB();

  const mydata = {
    datasets: [
      {
        data: data.downloads,
        label: data.package,
        fill: false,
        borderWidth: 3, // 设置线的宽度
        borderColor: Color,
        backgroundColor: Color,
        cubicInterpolationMode: "monotone", // 启用平滑曲线
        tension: 0.1, // 线的贝塞尔曲线张力。设置为 0 以绘制直线。如果使用单调三次插值，则忽略此选项。

        // pointRadius: 4, // 设置点的大小
        // pointHoverRadius: 4,
        // pointBorderWidth: 1,
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: getRandomRGB(), // 悬停时点背景颜色。
        // pointHoverBorderColor: "#ffffff",
      },
    ],
  };

  return <Line options={options} data={mydata} />;
}
