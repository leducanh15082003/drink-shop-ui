"use client";
import React, { useEffect, useState } from "react";
import MenuFilter from "./MenuFilter";
import Menu from "@/components/Menu";
import { htcService } from "@/utils/services/htcService";

export interface MenuFilterType {
  type: string;
  search: string;
  minPrice: number;
  maxPrice: number;
}

interface ProductDTO {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
}

interface CategoryDTO {
  id: number;
  name: string;
}

const MenuList = () => {
  const [filter, setFilter] = useState<MenuFilterType>({
    type: "all",
    search: "",
    minPrice: 0,
    maxPrice: 1000,
  });

  const [menuItems, setMenuItems] = useState<ProductDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await htcService.api.getAllCategories();
        setCategories([
          { id: 0, name: "all" },
          ...(response.data as CategoryDTO[]),
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        if (filter.type === "all") {
          const response = await htcService.api.getAllProducts();
          setMenuItems(response.data as ProductDTO[]);
          console.log(response.data);
        } else {
          const selectedCategory = categories.find(
            (c) => c.name === filter.type
          );
          if (selectedCategory) {
            const response = await htcService.api.getProductsByCategory(
              selectedCategory.id
            );
            setMenuItems(response.data as ProductDTO[]);
          }
        }
      } catch (error) {
        console.error("Error while fetching!: ", error);
      }
    };
    if (categories.length > 0) {
      fetchMenuItems();
    }
  }, [filter, categories]);
  return (
    <div className="flex flex-col justify-center items-center">
      <MenuFilter filter={filter} setFilter={setFilter} />
      <div className="flex flex-wrap gap-6 justify-center align-center">
        {menuItems.map((item, index) => (
          <Menu
            id={index + 1}
            key={index}
            imagePath={item.image}
            name={item.name}
            des={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
