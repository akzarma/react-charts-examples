import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const MAX_DATA_POINTS = 50;


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TradeGraph(props) {
  const { trades } = props;

  const tradeArray = React.useRef([]);

  React.useEffect(() => {
    tradeArray.current = trades.reduce((acc, trade) => {
      const [price, volume, time] = trade;
      const newTrade = {
        price,
        volume,
        time,
      };
      return [...acc, newTrade];
    }, [...tradeArray.current]);
    if (tradeArray.current.length > MAX_DATA_POINTS) {
      tradeArray.current.shift();
    }
  }, [trades]);
  console.log(tradeArray.current);
  const data = {
    labels: tradeArray.current.map(trade => {
      const d = new Date(0);
      d.setUTCSeconds(trade.time);
      return d.toLocaleString();
    }),
    datasets: [
      {
        label: 'BTC',
        data: tradeArray.current.map(trade => trade.price),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line data={data} />;
}
