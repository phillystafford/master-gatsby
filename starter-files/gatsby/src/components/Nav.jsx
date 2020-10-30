import React from 'react';
import { Link } from 'gatsby';

// * import navigate from gatsby
// import { Link, navigate } from 'gatsby';
// * example function to programmatically navigating to link
// function gotToSliceMasters() {
//   setTimeout(() => {
//     console.log('Go to slicers');
//     navigate('/sliceMasters', { replace: true });
//   }, 2000);
// }
// * example to programmatically navigating to link
// <li>
//   <button onClick={gotToSliceMasters}>2 second route</button>
// </li>;

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <Link to="/sliceMasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/orders">Order Ahead!</Link>
        </li>
      </ul>
    </nav>
  );
}
