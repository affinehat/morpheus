import React from "react";
import APIWrapper from 'api/APIWrapper';

export default function RhymeInput(props) {
  return (
    <div>
      <h1>Search for rhymes</h1>
      <input id="search-box" type="text" />
      <button id="myButton" type="submit">
        Go
      </button>
      <div id="results"></div>
    </div>
  );
}
