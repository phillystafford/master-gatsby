import { useState, useEffect } from 'react';

// syntax highlighting trick
const gql = String.raw;

const deets = `
  name
  _id
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;
export default function useLatestData() {
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();
  // hot slices
  const [hotSlices, setHotSlices] = useState();

  console.log(
    '🚀 ~ file: useLatestData.js ~ line 14 ~ process.env.GATSBY_GRAPHQL_ENDPOINT',
    process.env.GATSBY_GRAPHQL_ENDPOINT
  );

  // use a side effect to fetch the latest data from the graphql endpoint
  useEffect(function () {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemasters {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => {
        console.log('res.data -> ', res);
        return res.json();
      })
      .then((res) => {
        // TODO: check for errors and
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemasters);
      })
      .catch((err) => {
        console.log('Error -> ');
        console.log(err);
      });
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
}
