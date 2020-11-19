import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

import {selectAPIStatus} from "api/apiStatus";

const APIsStatus = props => {
  const loadingStatus = useSelector(selectAPIStatus);
  const [loaded, setLoaded] = useState("");

  useEffect(() => {
    const cumAPIArr = Object.entries(loadingStatus);
    const cumAPIsArrReducer = cumAPIArr.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue[1] ? 1 : 0);
    }, 0);
    setLoaded(cumAPIArr.length == cumAPIsArrReducer ? "Done" : "Loading...");
  }, [useSelector(selectAPIStatus)]);

  return <div {...props}>Status: {loaded}</div>;
};

export default APIsStatus;
