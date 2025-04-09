import Link from "next/link";
import React from "react";

const FavoriteIconSvg = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cursor-pointer"
  >
    <path
      d="M13.1458 21.677C12.7916 21.802 12.2083 21.802 11.8541 21.677C8.83325 20.6458 2.08325 16.3437 2.08325 9.05204C2.08325 5.83329 4.677 3.22913 7.87492 3.22913C9.77075 3.22913 11.4478 4.14579 12.4999 5.56246C13.552 4.14579 15.2395 3.22913 17.1249 3.22913C20.3228 3.22913 22.9166 5.83329 22.9166 9.05204C22.9166 16.3437 16.1666 20.6458 13.1458 21.677Z"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FavoriteIcon = () => {
  return (
    <Link href="/favorite">
      <FavoriteIconSvg />
    </Link>
  );
};

export default FavoriteIcon;
