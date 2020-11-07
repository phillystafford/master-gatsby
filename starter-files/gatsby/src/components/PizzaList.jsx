import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

function SinglePizza({ pizza }) {
  return (
    <>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
        <Img fixed={pizza.image.asset.fixed} alt={pizza.name}></Img>
      </Link>
    </>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <>
      {pizzas.map((pizza) => (
        <SinglePizza pizza={pizza} key={pizza.id} />
      ))}
    </>
  );
}
