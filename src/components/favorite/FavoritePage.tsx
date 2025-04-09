"use client";
import { ProductDTO } from "@/utils/services/Api";
import { htcService } from "@/utils/services/htcService";
import React, { useEffect, useState } from "react";
import Menu from "../Menu";

const FavoritePage = () => {
  const [favorite, setFavorite] = useState<ProductDTO[]>([]);

  useEffect(() => {
    htcService.api.getFavoriteProducts().then((res) => {
      setFavorite(res.data);
    });
  }, []);

  return (
    <div className="bg-white py-10 flex justify-center flex-col">
      <span className="font-playfair mb-8 font-normal text-[60px] text-[#2C2F24] text-center">
        My Favourite
      </span>
      <div className="flex flex-wrap gap-6 justify-center align-center">
        {favorite.map((item, index) => (
          <Menu
            id={index + 1}
            key={index}
            imagePath={item.image || ""}
            name={item.name || ""}
            des={item.description || ""}
            price={item.price || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
