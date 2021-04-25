import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [salesTax, setSalesTax] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post('http://localhost:4001/salesTax', {
      city,
      state,
    });

    setSalesTax(res.data);
  };

  return (
    <div className="mt-8 container w-full max-w-xs">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            forHtml="city"
          >
            City
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            forHtml="state"
          >
            State
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {salesTax !== '' && (
        <p>{`The sales tax in ${city}, ${state} is ${salesTax}`}</p>
      )}
    </div>
  );
};

export default App;
