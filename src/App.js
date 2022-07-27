import { useEffect, useState, useRef } from 'react';
import './App.css';
import TradeGraph from './TradeGraph';


function App() {
  const [tradeData, setTradeData] = useState([]);
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket('wss://ws.kraken.com');
    ws.current.onopen = () => {
      console.log('connected');
      // subscribe for latest price of bitcoin
      ws.current.send(JSON.stringify({
        event: "subscribe",
        pair: [
          "BTC/USD",
        ],
        subscription: {
          name: "trade"
        }
      }));
    }
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data[2] === 'trade') {
        setTradeData(data[1]);
      }
    }
  
    ws.current.onclose = () => {
      console.log('disconnected')
    }
  }, []);
  return (
    <div className="App">
      <TradeGraph trades={tradeData} />
    </div>
  );
}

export default App;
