import React from "react";

import { IIcon } from "@/interfaces/icon.interface";

const ClearIcon: React.FC<IIcon> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Icon/Outline/x-circle">
          <path
            id="Icon"
            d="M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="#555B6D"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default ClearIcon;
