import React from "react";

import { IIcon } from "@/interfaces/icon.interface";

const FaceBookIcon: React.FC<IIcon> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="ant-design:facebook-filled">
          <path
            id="Vector"
            d="M11.1719 1.42188H1.82812C1.60342 1.42188 1.42188 1.60342 1.42188 1.82812V11.1719C1.42188 11.3966 1.60342 11.5781 1.82812 11.5781H11.1719C11.3966 11.5781 11.5781 11.3966 11.5781 11.1719V1.82812C11.5781 1.60342 11.3966 1.42188 11.1719 1.42188ZM9.99883 4.38623H9.1876C8.55156 4.38623 8.42842 4.68838 8.42842 5.13271V6.11152H9.94678L9.74873 7.64385H8.42842V11.5781H6.84531V7.64512H5.52119V6.11152H6.84531V4.98164C6.84531 3.67021 7.64639 2.95547 8.81689 2.95547C9.37803 2.95547 9.85918 2.99736 10.0001 3.01641V4.38623H9.99883Z"
            fill="#555B6D"
          />
        </g>
      </svg>
    </div>
  );
};

export default FaceBookIcon;
