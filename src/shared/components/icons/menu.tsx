import { SVGProps } from "react";

export const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="50"
    height="25"
    viewBox="0 0 50 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 7.5H47"
      stroke="white"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M4 16.5H47"
      stroke="white"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
);
