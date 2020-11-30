import React from "react";

import APIsStatusDisplay from "components/APIsStatusDisplay";
import {DatamuseRhymeInfoPanel, DatamuseSynonymInfoPanel} from "info/DatamuseInfoPanel";

const SidePanel = () => (
  <div className="min-h-screen">
    <APIsStatusDisplay className="ml-2 mb-8" />
    <div className="min-h-vh grid grid-rows-6">
      <DatamuseRhymeInfoPanel className="ml-2 mb-8" />
      <DatamuseSynonymInfoPanel className="ml-2 mb-8" />
    </div>
  </div>
);

export default SidePanel;
