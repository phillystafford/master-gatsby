import { useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. create some state to hols order
  // redundant
  // const [order, setOrder] = useState([]);
  // new way with context
  const [order, setOrder] = useContext(OrderContext);

  // 2. Make a function to add things to the orders
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  // 3. Make a function to remove things to the orders
  function removeFromOrder(index) {
    setOrder([
      //everything before the item to remove
      ...order.slice(0, index),
      //everything after the item to remove
      ...order.slice(index + 1),
    ]);
  }

  // 4. Send this data to a serverless function when they check out
  // TODO:

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
