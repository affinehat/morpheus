import React from "react";

const WordInput = props => {
  const {setState, wordValue} = props;

  const handleChange = e => {
    const newValue = e.target.value;
    setState(newValue);
  };

  return (
    <div>
      <h1>Search for rhymes</h1>
      <input
        value={wordValue}
        onChange={handleChange}
        id="search-box"
        type="text"
      />
      <button id="myButton" type="submit">
        Go
      </button>
      <div id="results"></div>
    </div>
  );
};

export default WordInput;
