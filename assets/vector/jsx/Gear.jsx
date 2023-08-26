import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={30}
    height={32}
    viewBox="0 0 30 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M29.5125 19.9972L27.2097 18.0284C27.3187 17.3605 27.375 16.6784 27.375 15.9964C27.375 15.3144 27.3187 14.6323 27.2097 13.9644L29.5125 11.9956C29.6861 11.8469 29.8105 11.6489 29.8689 11.4278C29.9273 11.2068 29.917 10.9732 29.8394 10.7581L29.8078 10.6667C29.1738 8.89492 28.2246 7.25245 27.0058 5.81865L26.9425 5.74482C26.7947 5.57098 26.5976 5.44602 26.3774 5.3864C26.1571 5.32678 25.9239 5.3353 25.7086 5.41084L22.8503 6.42686C21.7957 5.56201 20.6179 4.87998 19.3453 4.40186L18.7933 1.41357C18.7517 1.18872 18.6426 0.981864 18.4806 0.820481C18.3186 0.659097 18.1113 0.550828 17.8863 0.510059L17.7914 0.49248C15.9597 0.162012 14.0332 0.162012 12.2015 0.49248L12.1066 0.510059C11.8816 0.550828 11.6743 0.659097 11.5123 0.820481C11.3503 0.981864 11.2412 1.18872 11.1996 1.41357L10.6441 4.41592C9.3816 4.89414 8.2059 5.57581 7.16363 6.43389L4.28433 5.41084C4.06906 5.3347 3.83571 5.32587 3.61529 5.38553C3.39488 5.44518 3.19784 5.5705 3.05035 5.74482L2.98707 5.81865C1.76977 7.25346 0.820655 8.89566 0.185115 10.6667L0.153474 10.7581C-0.00472926 11.1976 0.125349 11.6897 0.480427 11.9956L2.81129 13.9855C2.7023 14.6464 2.64957 15.3214 2.64957 15.9929C2.64957 16.6679 2.7023 17.3429 2.81129 18.0003L0.480427 19.9901C0.30674 20.1388 0.18243 20.3369 0.124027 20.5579C0.0656238 20.779 0.0758945 21.0126 0.153474 21.2276L0.185115 21.319C0.821443 23.0909 1.76363 24.7257 2.98707 26.1671L3.05035 26.2409C3.1982 26.4148 3.39525 26.5397 3.61553 26.5993C3.83581 26.659 4.06899 26.6504 4.28433 26.5749L7.16363 25.5519C8.21129 26.4132 9.38199 27.0952 10.6441 27.5698L11.1996 30.5722C11.2412 30.797 11.3503 31.0039 11.5123 31.1653C11.6743 31.3267 11.8816 31.4349 12.1066 31.4757L12.2015 31.4933C14.05 31.8255 15.9429 31.8255 17.7914 31.4933L17.8863 31.4757C18.1113 31.4349 18.3186 31.3267 18.4806 31.1653C18.6426 31.0039 18.7517 30.797 18.7933 30.5722L19.3453 27.5839C20.6174 27.107 21.8018 26.4228 22.8503 25.5589L25.7086 26.5749C25.9238 26.651 26.1572 26.6599 26.3776 26.6002C26.598 26.5406 26.795 26.4152 26.9425 26.2409L27.0058 26.1671C28.2293 24.7222 29.1714 23.0909 29.8078 21.319L29.8394 21.2276C29.9976 20.7952 29.8675 20.303 29.5125 19.9972ZM24.7136 14.3792C24.8015 14.9101 24.8472 15.455 24.8472 15.9999C24.8472 16.5448 24.8015 17.0897 24.7136 17.6206L24.4816 19.0304L27.1078 21.2769C26.7097 22.194 26.2071 23.0623 25.6101 23.8644L22.3476 22.7077L21.2437 23.6147C20.4035 24.3038 19.4683 24.8452 18.4558 25.2249L17.1164 25.7276L16.4871 29.1378C15.4942 29.2503 14.4917 29.2503 13.4988 29.1378L12.8695 25.7206L11.5406 25.2108C10.5386 24.8312 9.60699 24.2897 8.77379 23.6042L7.66988 22.6937L4.38629 23.8608C3.78863 23.0558 3.28941 22.1874 2.88863 21.2733L5.54293 19.0058L5.31441 17.5995C5.23004 17.0757 5.18433 16.5343 5.18433 15.9999C5.18433 15.462 5.22652 14.9241 5.31441 14.4003L5.54293 12.994L2.88863 10.7265C3.2859 9.80889 3.78863 8.94404 4.38629 8.13897L7.66988 9.30615L8.77379 8.39561C9.60699 7.71006 10.5386 7.16865 11.5406 6.78897L12.873 6.28623L13.5023 2.86904C14.4902 2.75654 15.4992 2.75654 16.4906 2.86904L17.1199 6.2792L18.4593 6.78193C19.4683 7.16162 20.407 7.70303 21.2472 8.39209L22.3511 9.29912L25.6136 8.14248C26.2113 8.94756 26.7105 9.81592 27.1113 10.73L24.4851 12.9765L24.7136 14.3792ZM15 9.46084C11.5828 9.46084 8.81246 12.2312 8.81246 15.6483C8.81246 19.0655 11.5828 21.8358 15 21.8358C18.4171 21.8358 21.1875 19.0655 21.1875 15.6483C21.1875 12.2312 18.4171 9.46084 15 9.46084ZM17.7843 18.4327C17.4191 18.799 16.9851 19.0894 16.5073 19.2873C16.0294 19.4852 15.5172 19.5866 15 19.5858C13.9488 19.5858 12.9609 19.1745 12.2156 18.4327C11.8493 18.0675 11.5589 17.6335 11.361 17.1557C11.1631 16.6778 11.0617 16.1655 11.0625 15.6483C11.0625 14.5972 11.4738 13.6093 12.2156 12.864C12.9609 12.1187 13.9488 11.7108 15 11.7108C16.0511 11.7108 17.039 12.1187 17.7843 12.864C18.1506 13.2292 18.441 13.6632 18.6389 14.141C18.8368 14.6189 18.9383 15.1311 18.9375 15.6483C18.9375 16.6995 18.5261 17.6874 17.7843 18.4327Z"
      fill="white"
    />
  </Svg>
);
export default SVGComponent;