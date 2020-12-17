import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

export default function ItemGrid({ items }) {
  console.log('🚀 ~ file: ItemGrid.jsx ~ line 5 ~ ItemGrid ~ items', items);
  return (
    <ItemsGrid>
      {items.map((item) => (
        <ItemStyles key={item.id}>
          <p>
            <span className="mark">{item.name}</span>
          </p>
          <img
            width="500"
            height="400"
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            alt={item.name}
            style={{
              background: `url(${item.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}