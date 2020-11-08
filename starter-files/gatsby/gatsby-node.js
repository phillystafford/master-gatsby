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
  console.log(
    'turnPizzasIntoPages -> data',
    JSON.stringify(data, undefined, 2)
  );

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

export async function createPages(params) {
  // create pages dynamically
  // 1. Pizzas
  await turnPizzasIntoPages(params);
}
