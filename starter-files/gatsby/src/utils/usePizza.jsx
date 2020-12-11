import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import formatMoney from '../utils/formatMoney';
import attachNamesAndPrices from '../utils/attachNamesAndPrices';

export default function usePizza({ pizzas, values }) {
  // 1. create some state to hols order
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  // this is run when someone submits the form
  async function submitOrder(event) {
    event.preventDefault();
    console.log(
      '🚀 ~ file: usePizza.jsx ~ line 28 ~ submitOrder ~ event',
      event
    );
    setIsLoading(true);
    setError(null);
    setMessage(null);

    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      address: values.address,
    };

    console.log('🚀 ~ file: usePizza.jsx ~ line 35 ~ submitOrder ~ body', body);
    // 4. Send this data to a serverless function when they check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const text = JSON.parse(await res.text());

    if (res.status >= 400 && res.status < 600) {
      setIsLoading(false);
      setError(text.message);
    } else {
      setIsLoading(false);
      setMessage('Success! Come down for your order');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    isLoading,
    message,
  };
}
