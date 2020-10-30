import React from 'react';

export default function HomePage(props) {
  return (
    <>
      <h1>Path:</h1>
      <pre>{JSON.stringify(props, undefined, 2)}</pre>
    </>
  );
}
