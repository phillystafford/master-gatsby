import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // 1. loop over each item in the order list
  return order.reduce((runningTotal, singleOrder) => {
    // 2. calc the total for that pizza
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    // 3. add that total to the running total
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
}
