import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import SEO from '../components/SEO';
import PizzaOrder from '../components/PizzaOrder';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrdersPage({ data }) {
  const pizzas = data.pizzas.nodes;

  const { values, updateValue } = useForm({
    name: '',
    email: 'jd@dkzldjfnv.com',
    address: '',
  });

  const {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    message,
    isLoading,
  } = usePizza({
    pizzas,
    values,
  });

  return message ? (
    <p>{message}</p>
  ) : (
    <>
      <SEO title="Order A Pizza" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={isLoading}>
          <legend>Your Info</legend>
          <label htmlFor="name" id="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email" id="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={updateValue}
          />
          <input
            type="text"
            name="address"
            id="address"
            value={values.address}
            onChange={updateValue}
            className="address"
          />
        </fieldset>
        <fieldset disabled={isLoading} className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img width="50" height="50" fluid={pizza.image.asset.fluid} />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size, index) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset disabled={isLoading} className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            pizzas={pizzas}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset disabled={isLoading}>
          <h3>
            Your total order is{' '}
            {formatMoney(calculateOrderTotal(order, pizzas))} 😰
          </h3>

          {error && <p>Error: {error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
