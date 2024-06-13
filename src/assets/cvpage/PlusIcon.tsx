import React from "react";

import { IIcon } from "@/interfaces/icon.interface";

const PlusIcon: React.FC<IIcon> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Icon/plus-sm">
          <path
            id="Icon"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 2C4.22091 2 4.4 2.17909 4.4 2.4V3.6L5.6 3.6C5.82091 3.6 6 3.77909 6 4C6 4.22091 5.82091 4.4 5.6 4.4H4.4V5.6C4.4 5.82091 4.22091 6 4 6C3.77909 6 3.6 5.82091 3.6 5.6V4.4H2.4C2.17909 4.4 2 4.22091 2 4C2 3.77909 2.17909 3.6 2.4 3.6L3.6 3.6V2.4C3.6 2.17909 3.77909 2 4 2Z"
            fill="#e3e7fd"
          />
        </g>
      </svg>
    </div>
  );
};

export default PlusIcon;
