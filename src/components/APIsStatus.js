import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const APIsStatus = (props) => {
  const cumulativeStatesJSON = useSelector(state => state);
  const [apiStatus, setApiStatus] = useState("");

  useEffect(() => {
    const cumulativeStatesArr = Object.entries(cumulativeStatesJSON);
    const cumulativeAPIsArr = cumulativeStatesArr.filter(element => element[0]!="editor");
    const cumulativeAPIsArrReducer = cumulativeAPIsArr.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue[1]?1:0)
    }, 0);
    setApiStatus((cumulativeAPIsArrReducer == cumulativeAPIsArr.length) ? "Done" : "Loading...");
  }, [useSelector(state => state)]);

  return (
    <div {...props}>
      Status: {apiStatus}
    </div>
  );
};

export default APIsStatus;
