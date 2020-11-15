import React, {useEffect} from "react";
import {useSelector} from "react-redux";

const APIsStatus = () => {
  let apiLoading = useSelector(state => state.apiStatus);

  return (
    <div className="apiHeading">
      Status:
      {apiLoading.rhymeLoaded && apiLoading.synonymLoaded
        ? " Done"
        : " Loading..."}
    </div>
  );
};

export default APIsStatus;
