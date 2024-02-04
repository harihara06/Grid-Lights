import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";

function Cell({ filled, onClick, isDisabled, label }) {
  return (
    <button
      aria-label={label}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={filled ? "cell cell-activated" : "cell"}
    />
  );
}
function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  const deactivateCells = () => {
    setIsDeactivating(true);
    console.log("deactivating...");
    const newOrder = order.slice();
    newOrder.pop();
    console.log(newOrder);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return newOrder;
      });
    }, 300);
  };
  const activatedCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    console.log(newOrder);
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      // setOrder([]);
      deactivateCells();
    }
  };
  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length}, 1fr)` }}
      >
        {config
          .flat(1)
          .map((value, index) =>
            value ? (
              <Cell
                key={index}
                label={`Cell ${index}`}
                filled={order.includes(index)}
                onClick={() => activatedCells(index)}
                isDisabled={order.includes(index) || isDeactivating}
              />
            ) : (
              <span />
            )
          )}
      </div>
    </div>
  );
}

export default App;
