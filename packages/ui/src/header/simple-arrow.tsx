'use client';

import type { FC } from 'react';

type SimpleArrowProps = React.SVGProps<SVGSVGElement>;

export const SimpleArrow: FC = (props: SimpleArrowProps) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.93083 5.25261L4.00226 9.18118C3.86279 9.32065 3.63666 9.32065 3.49718 9.18118C3.35771 9.04171 3.35771 8.81558 3.49718 8.6761L7.17322 5.00007L3.49718 1.32404C3.35771 1.18456 3.35771 0.958433 3.49718 0.81896C3.63666 0.679487 3.86279 0.679487 4.00226 0.81896L7.93083 4.74753C8.0703 4.887 8.0703 5.11313 7.93083 5.25261Z"
      fill="white"
    />
  </svg>
);
