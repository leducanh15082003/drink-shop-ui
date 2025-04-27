"use client";
import React, { useEffect, useState } from "react";
import MenuFilter from "./MenuFilter";
import Menu from "@/components/Menu";
import { htcService } from "@/utils/services/htcService";
import { ProductDTO } from "@/utils/services/Api";

export interface MenuFilterType {
  type: string;
  search: string;
  minPrice: number;
  maxPrice: number;
}

interface CategoryDTO {
  id: number;
  name: string;
}

interface Params {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

const MenuList = () => {
  const [filter, setFilter] = useState<MenuFilterType>({
    type: "all",
    search: "",
    minPrice: 30000,
    maxPrice: 300000,
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
        const params: Params = {
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
          search: filter.search,
        };

        if (filter.type !== "all") {
          const selectedCategory = categories.find(
            (c) => c.name === filter.type
          );
          if (!selectedCategory) return;
          params.categoryId = selectedCategory.id;
        }

        const response = await htcService.api.getAllProducts(params);
        setMenuItems(response.data as ProductDTO[]);
        console.log("Fetched menu items:", response.data);
      } catch (error) {
        console.error("Error while fetching:", error);
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
            id={item.id as number}
            key={index}
            imagePath={item.image as string}
            name={item.name as string}
            des={item.description as string}
            price={item.price as number}
            category={item.category as string}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
