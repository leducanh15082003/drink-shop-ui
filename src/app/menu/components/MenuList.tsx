"use client";
import React, { useState } from "react";
import MenuFilter from "./MenuFilter";
import Menu from "@/components/Menu";

export interface MenuFilterType {
  type: string;
  search: string;
  minPrice: number;
  maxPrice: number;
}

const menuItems = [
  {
    imagePath: "/images/menu/FriedEggs.png",
    name: "Fried Eggs",
    des: "Made with eggs, lettuce, salt, oil and other ingredients.",
    price: "9.99",
  },
  {
    imagePath: "/images/menu/FriedEggs.png",
    name: "Hawaiian Pizza",
    des: "Made with tomato sauce, cheese, ham, pineapple.",
    price: "15.99",
  },
  {
    imagePath: "/images/menu/FriedEggs.png",
    name: "Martinez Cocktail",
    des: "A classic gin-based cocktail with vermouth and bitters.",
    price: "7.25",
  },
  {
    imagePath: "/images/menu/FriedEggs.png",
    name: "Butterscotch Cake",
    des: "A rich and moist cake with caramelized sugar and butter flavor.",
    price: "20.99",
  },
  {
    imagePath: "/images/menu/FriedEggs.png",
    name: "Fried Eggs",
    des: "Made with eggs, lettuce, salt, oil and other ingredients.",
    price: "9.99",
  },
  {
    imagePath: "/images/menu/FriedEggs.png",
    name: "Hawaiian Pizza",
    des: "Made with tomato sauce, cheese, ham, pineapple.",
    price: "15.99",
  },
  {
    imagePath: "/images/menu/FriedEggs.png",
    name: "Martinez Cocktail",
    des: "A classic gin-based cocktail with vermouth and bitters.",
    price: "7.25",
  },
  {
    imagePath: "/images/menu/FriedEggs.png",
    name: "Butterscotch Cake",
    des: "A rich and moist cake with caramelized sugar and butter flavor.",
    price: "20.99",
  },
];

const MenuList = () => {
  const [filter, setFilter] = useState<MenuFilterType>({
    type: "all",
    search: "",
    minPrice: 0,
    maxPrice: 1000,
  });
  return (
    <div className="flex flex-col justify-center items-center">
      <MenuFilter filter={filter} setFilter={setFilter} />
      <div className="flex flex-wrap gap-6 justify-center align-center">
        {menuItems.map((item, index) => (
          <Menu
            id={index}
            key={index}
            imagePath={item.imagePath}
            name={item.name}
            des={item.des}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
