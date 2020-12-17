import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

function CurrentlySlicing({ slicemasters }) {
  console.log(
    '🚀 ~ file: index.jsx ~ line 7 ~ CurrentlySlicing ~ slicemasters',
    slicemasters
  );
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!slicemasters && <LoadingGrid count={4}></LoadingGrid>}
      {slicemasters && !slicemasters?.length && <p>No one working</p>}
      {slicemasters?.length && (
        <ItemGrid key="slicemasters" items={slicemasters} />
      )}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  console.log(
    '🚀 ~ file: index.jsx ~ line 22 ~ HotSlices ~ hotSlices',
    hotSlices
  );
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4}></LoadingGrid>}{' '}
      {hotSlices && !hotSlices?.length && <p>Nothing in the cabinet</p>}
      {hotSlices?.length && <ItemGrid key="hotslices" items={hotSlices} />}
    </div>
  );
}

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
