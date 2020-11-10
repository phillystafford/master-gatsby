import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function SingleToppingPage({ data }) {
  console.log('SingleToppingPage -> data', data);
  console.log(data);
  return (
    <div>Test topping</div>
    // <PizzaGrid>
    //   <Img fluid={data.pizza.image.asset.fluid} alt={data.pizza.name}></Img>
    //   <div>
    //     <h2 className="mark">{data.pizza.name}</h2>
    //     <ul>
    //       {data.pizza.toppings.map((topping) => (
    //         <li key={topping.id}>{topping.name}</li>
    //       ))}
    //     </ul>
    //   </div>
    // </PizzaGrid>
  );
}

// this needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($name: String!) {
    topping: sanityTopping(name: { eq: $name }) {
      name
      id
    }
  }
`;
