import React from "react";

import { Info } from "neetoicons";
import TooltipWrapper from "tooltipwrapper";

import { getTooltipString } from "../utils";

const ScheduleIndicator = ({ scheduleInfo }) => (
  <TooltipWrapper
    disabled
    content={getTooltipString(scheduleInfo)}
    position="right"
  >
    <Info />
  </TooltipWrapper>
);

export default ScheduleIndicator;
