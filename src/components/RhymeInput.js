import React from "react";
import show from "api/APIWrapper"

const RhymeInput = props => {
  show();
  const { onChange :onChangeProp, ...otherProps } = props;

  const handleChange = e => {
    const newValue = e.target.value;
    onChangeProp(newValue);
  }

  return (
    <div>
      <h1>Search for rhymes</h1>
      <input {...otherProps} onChange={handleChange} id="search-box" type="text" />
      <button id="myButton" type="submit">
        Go
      </button>
      <div id="results"></div>
    </div>
  );
}

export default RhymeInput;
