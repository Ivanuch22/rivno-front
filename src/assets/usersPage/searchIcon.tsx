import React from "react";

import { IIcon } from "@/interfaces/icon.interface";

const SearchIcon: React.FC<IIcon> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        width="11"
        height="10"
        viewBox="0 0 9 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Icon/Outline/search">
          <path
            id="Icon"
            d="M7.5 7.00012L5.5 5.00012M6.16667 3.33346C6.16667 4.62212 5.122 5.66679 3.83333 5.66679C2.54467 5.66679 1.5 4.62212 1.5 3.33346C1.5 2.04479 2.54467 1.00012 3.83333 1.00012C5.122 1.00012 6.16667 2.04479 6.16667 3.33346Z"
            stroke="#555B6D"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default SearchIcon;
