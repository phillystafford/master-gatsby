import React from 'react';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
  return (
    <div>
      <p>Currently slicing</p>
    </div>
  );
}

function HotSlices() {
  return (
    <div>
      <p>Hot slices</p>
    </div>
  );
}

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();
  console.log(
    '🚀 ~ file: index.jsx ~ line 21 ~ HomePage ~ hotSlices',
    hotSlices
  );
  console.log(
    '🚀 ~ file: index.jsx ~ line 21 ~ HomePage ~ slicemasters',
    slicemasters
  );
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Day</p>
      <div>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}
