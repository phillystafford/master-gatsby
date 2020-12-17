import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';

function CurrentlySlicing({ slicemasters }) {
  console.log(
    '🚀 ~ file: index.jsx ~ line 7 ~ CurrentlySlicing ~ slicemasters',
    slicemasters
  );
  return (
    <div>
      {!slicemasters && <LoadingGrid count={40}></LoadingGrid>}
      {slicemasters && !slicemasters?.length && <p>No one working</p>}
    </div>
  );
}

function HotSlices({ hotslices }) {
  return (
    <div>
      {!hotslices && <LoadingGrid count={40}></LoadingGrid>}
      {hotslices && !hotslices?.length && <p>No one working</p>}
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
