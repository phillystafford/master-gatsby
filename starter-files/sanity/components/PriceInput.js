import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
}).format;

export default function PriceInput({ type, value, onChange, inputComponent }) {
  console.log('value -> ', value);
  return (
    <>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : '€0.00'}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </>
  );
}

PriceInput.focus = function () {
  this._inputElement.focus();
};
