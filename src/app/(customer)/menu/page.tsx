import React from "react";
import MenuList from "./components/MenuList";

const page = () => {
  return (
    <div className="bg-white py-10 flex justify-center flex-col">
      <span className="font-playfair font-normal text-[60px] text-[#2C2F24] text-center">
        Our Menu
      </span>
      <span className="text-center pt-5 w-full max-w-lg block mx-auto font-sans text-base font-normal text-[#495460]">
        We consider all the drivers of change gives you the components you need
        to change to create a truly happens.
      </span>
      <MenuList />
    </div>
  );
};

export default page;
