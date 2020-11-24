import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if it's a number and convert
    let { value } = e.target;
    value = value === 'number' ? parseInt(value) : value;

    setValues({
      // copy the existing value into state
      ...values,
      // update the new value that changed
      [e.target.name]: e.target.value,
    });
  }

  return { values, updateValue };
}
