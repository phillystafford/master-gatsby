import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. get template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  // 2. query all the pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. loop over each pizza and create a page for that pizzas
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. get template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.jsx');

  // 2. query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  console.log('turnToppingsIntoPages -> data', data);

  // 3. loop over each topping and create a page for that pizzas
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO: regex for topping
      },
    });
  });
}

export async function createPages(params) {
  // create pages dynamically
  // 1. Pizzas
  // build both pages at the same time
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
}
