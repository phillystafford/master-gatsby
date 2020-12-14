import { useState, useEffect } from 'react';

export default function useLatestData() {
  // slicemasters
  const [slicemasters, setSlicemasters] = useState('one');
  // hot slices
  const [hotSlices, setHotSlices] = useState('two');

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
        query: `
        query {
  StoreSettings(id: "downtown") {
    name
    slicemasters {
      name
    }
    hotSlices {
      name
    }
  }
}`,
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
      });
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
}
