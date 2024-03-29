import React from "react";

import classNames from "classnames";
import { motion } from "framer-motion/dist/framer-motion";

const ProgressBar = ({ progress }) => (
  <div className="relative h-5 w-full overflow-hidden rounded-full bg-gray-200">
    <motion.div
      animate={{ width: `${progress}%` }}
      className="text-2xs flex h-5 animate-pulse items-center justify-center rounded-full bg-indigo-500 font-medium leading-none"
      initial={{ width: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <span
        className={classNames("flex items-center justify-center", {
          "left-1 absolute": progress <= 8,
        })}
      >
        {progress}%
      </span>
    </motion.div>
  </div>
);

export default ProgressBar;
