import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {isEmpty} from "lodash";

import {selectAPIStatus} from "api/apiStatus";

const APIsStatus = props => {
  const loadingStatus = useSelector(selectAPIStatus);
  const hideStatus = isEmpty(loadingStatus);
  const loaded = Object.values(loadingStatus).every(e => !!e);
  const status = loaded ? "Done" : "Loading...";

  return hideStatus ? null : (
    <div {...props}>Status: {status}</div>
  );
};

export default APIsStatus;
