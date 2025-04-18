"use client";

import React, { useEffect, useState } from "react";
import { MenuFilterType } from "./MenuList";
import clsx from "clsx";
import { Slider } from "antd";
import SearchInput from "@/components/ui/SearchInput";
import { htcService } from "@/utils/services/htcService";

interface MenuFilterProps {
  filter: MenuFilterType;
  setFilter: React.Dispatch<React.SetStateAction<MenuFilterType>>;
}

interface CategoryDTO {
  id: number;
  name: string;
}

const MenuFilter = ({ filter, setFilter }: MenuFilterProps) => {
  const [isHomePage, setIsHomePage] = useState<boolean>(false);

  const [filterCategories, setFilterCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHomePage(window.location.pathname === "/");
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await htcService.api.getAllCategories();
        setFilterCategories([
          { id: 0, name: "all" },
          ...(response.data as CategoryDTO[]),
        ]);
      } catch (error) {
        console.log("Error while fetching: ", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="border-[1px] border-[#CFD1C9] rounded-3xl p-5 my-5 space-y-6 w-1/3">
      <div className="flex gap-3">
        {filterCategories.map((category) => (
          <button
            key={category.id}
            className={clsx(
              "rounded-3xl border-[1px] border-[#CFD1C9] flex-1 capitalize font-bold text-black bg-[#fffff] py-3",
              filter.type == category.name && "bg-[#AD343E] text-white"
            )}
            onClick={() => setFilter({ ...filter, type: category.name })}
          >
            {category.name}
          </button>
        ))}
      </div>
      {!isHomePage && (
        <>
          <SearchInput
            value={filter.search}
            onChange={(e) =>
              setFilter({ ...filter, search: e.target.value || "" })
            }
          />
          <div>
            <label className="block text-sm font-bold text-gray-900">
              Price
            </label>
            <Slider
              tooltip={{
                formatter: (value) => `${value?.toLocaleString()} đồng`,
              }}
              min={30000}
              max={300000}
              step={10000}
            />
            <div className="flex w-full justify-between">
              <span className="text-xs text-black font-medium font-poppins">
                Min: 30.000đ
              </span>
              <span className="text-xs text-black font-medium font-poppins">
                Max: 300.000đ
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MenuFilter;
