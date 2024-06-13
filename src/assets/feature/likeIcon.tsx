import React from "react";

import { IIcon } from "@/interfaces/icon.interface";

const LikeIcon: React.FC<IIcon> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Icon/thumb-up" clip-path="url(#clip0_574_443)">
          <g id="Icon">
            <path
              d="M0.799805 4.1998C0.799805 3.86843 1.06843 3.5998 1.3998 3.5998C1.73118 3.5998 1.9998 3.86843 1.9998 4.1998V6.5998C1.9998 6.93118 1.73118 7.1998 1.3998 7.1998C1.06843 7.1998 0.799805 6.93118 0.799805 6.5998V4.1998Z"
              fill="white"
            />
            <path
              d="M2.3998 4.13314V6.30538C2.3998 6.60839 2.57101 6.88541 2.84203 7.02092L2.86197 7.03089C3.08414 7.14197 3.32912 7.1998 3.57751 7.1998H5.74396C6.12531 7.1998 6.45364 6.93064 6.52843 6.5567L7.00843 4.1567C7.10743 3.66166 6.7288 3.1998 6.22396 3.1998H4.7998V1.5998C4.7998 1.15798 4.44163 0.799805 3.9998 0.799805C3.77889 0.799805 3.5998 0.978891 3.5998 1.1998V1.46647C3.5998 1.81266 3.48752 2.14952 3.2798 2.42647L2.7198 3.17314C2.51209 3.45009 2.3998 3.78695 2.3998 4.13314Z"
              fill="white"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_574_443">
            <rect width="8" height="8" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default LikeIcon;
