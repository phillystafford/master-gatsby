import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

export default function SlicemasterPage({ data, pageContext }) {
  console.log('SlicemasterPage -> data', data);
  console.log('data -> ', pageContext);
  return (
    <>
      <SEO title={`Slicemaster ${data.slicemaster.name}`} />
      <div className="center">
        <Img
          fluid={data.slicemaster.image.asset.fluid}
          alt={data.slicemaster.name}
        ></Img>
        <div>
          <h2 className="mark">{data.slicemaster.name}</h2>
        </div>
        <p>{data.slicemaster.description}</p>
      </div>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
