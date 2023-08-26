import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={22}
    height={23}
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M31 15.2375C31.0057 17.4483 30.4917 19.6292 29.5 21.6025C28.324 23.9672 26.5162 25.9561 24.279 27.3465C22.0419 28.737 19.4637 29.474 16.8333 29.475C14.6335 29.4808 12.4635 28.9642 10.5 27.9675L1 31.15L4.16666 21.6025C3.17488 19.6292 2.66093 17.4483 2.66666 15.2375C2.66768 12.594 3.40102 10.0029 4.78453 7.75456C6.16804 5.50621 8.14708 3.68937 10.5 2.50755C12.4635 1.51081 14.6335 0.994284 16.8333 1.00005H17.6666C21.1405 1.19266 24.4217 2.66627 26.8819 5.13873C29.342 7.61119 30.8083 10.9087 31 14.4V15.2375Z"
      fill="white"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
