import React from "react";

import { IIcon } from "@/interfaces/icon.interface";

const RightIcon: React.FC<IIcon> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Icon/chevron-double-right">
          <g id="Icon">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.11677 6.28285C3.96056 6.12664 3.96056 5.87337 4.11677 5.71716L5.83392 4.00001L4.11677 2.28285C3.96056 2.12664 3.96056 1.87337 4.11677 1.71716C4.27298 1.56095 4.52624 1.56095 4.68245 1.71716L6.68245 3.71716C6.83866 3.87337 6.83866 4.12664 6.68245 4.28285L4.68245 6.28285C4.52624 6.43906 4.27298 6.43906 4.11677 6.28285Z"
              fill="#495057"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.71677 6.28285C1.56056 6.12664 1.56056 5.87337 1.71677 5.71716L3.43392 4.00001L1.71677 2.28285C1.56056 2.12664 1.56056 1.87337 1.71677 1.71716C1.87298 1.56095 2.12624 1.56095 2.28245 1.71716L4.28245 3.71716C4.43866 3.87337 4.43866 4.12664 4.28245 4.28285L2.28245 6.28285C2.12624 6.43906 1.87298 6.43906 1.71677 6.28285Z"
              fill="#495057"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default RightIcon;
