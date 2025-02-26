import React, { useState } from "react";

const NavBar: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("Home");
  const buttons: string[] = ["Home", "About", "Menu", "Pages", "Contact"];

  return (
    <>
      {buttons.map((button) => (
        <button
          key={button}
          onClick={() => setActiveButton(button)}
          className={`px-4 py-[2px] rounded-xl cursor-pointer focus:outline-none transition-all duration-300 ease-in-out transform ${
            activeButton === button ? "bg-[#DBDFD0] scale-100" : ""
          }`}
        >
          {button}
        </button>
      ))}
    </>
  );
};

export default NavBar;
