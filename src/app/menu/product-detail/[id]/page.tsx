/* eslint-disable @next/next/no-img-element */
"use client";

import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import ProductOptions from "../components/ProductOptions";
import Menu from "@/components/Menu";
import { htcService } from "@/utils/services/htcService";

const menuItems = [
  {
    imagePath: "/images/menu/FriedEggs.png",
    name: "Fried Eggs",
    des: "Made with eggs, lettuce, salt, oil and other ingredients.",
    price: 9.99,
  },
  {
    imagePath: "/images/menu/FriedEggs.png",
    name: "Hawaiian Pizza",
    des: "Made with tomato sauce, cheese, ham, pineapple.",
    price: 15.99,
  },
  {
    imagePath: "/images/menu/FriedEggs.png",
    name: "Martinez Cocktail",
    des: "A classic gin-based cocktail with vermouth and bitters.",
    price: 7.25,
  },
  {
    imagePath: "/images/menu/FriedEggs.png",
    name: "Butterscotch Cake",
    des: "A rich and moist cake with caramelized sugar and butter flavor.",
    price: 20.99,
  },
];

interface ProductDTO {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  ingredients: string;
  category: string;
}

const ProductDetail = ({ params }: { params: Promise<{ id: number }> }) => {
  const [productId, setProductId] = useState<number | null>(null);
  const [product, setProduct] = useState<ProductDTO | null>(null);

  useEffect(() => {
    params.then(({ id }) => setProductId(Number(id)));
  }, [params]);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await htcService.api.getProductById(productId);
          setProduct(response.data as ProductDTO);
        } catch (e) {
          console.error("Error while fetching product: ", e);
        }
      };
      fetchProduct();
    }
  }, [productId]);
  return (
    <div className="bg-white p-12">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "Menu",
            href: "/menu",
          },
          {
            title: "Product Name",
          },
        ]}
      />
      <div className="mx-16 my-5 space-y-10 font-poppins text-black">
        {/* Top */}
        <div className="flex gap-16 justify-between ">
          {/* Product Image */}
          <div className="flex w-2/3 gap-3">
            <img
              className="w-2/3 rounded-xl"
              src={product?.image}
              alt={product?.name}
            />

            <div className="w-1/3 flex flex-col gap-3">
              <img
                className="rounded-xl"
                src={product?.image}
                alt={product?.name}
              />
              <img
                className="rounded-xl"
                src={product?.image}
                alt={product?.name}
              />
            </div>
          </div>

          {/* Product Action */}
          <div className="w-1/3">
            <p className="font-semibold text-[32px]">{product?.name}</p>
            <p className="font-normal text-[16px] px-2 border-l-[1px] border-[#CFD1C9]">
              5034 Sold
            </p>
            <div className="flex items-center gap-6">
              <p className="font-semibold text-[32px]">
                {product?.price.toFixed(2)}đ
              </p>
              <p className="font-normal text-[16px] text-[#B6B6B6] line-through">
                {product?.price ? (product.price * 1.2).toFixed(2) + "đ" : ""}
              </p>
            </div>
            <div className="h-[1px] bg-[#B6B6B6] w-[300px] my-5" />
            {product && (
              <ProductOptions
                productId={product.id}
                basePrice={product.price}
                category={product.category.toLowerCase()}
                productName={product.name}
                image={product.image}
              />
            )}
          </div>
        </div>
        {/* Product Detail */}
        <div>
          <h3 className="text-[30px] font-normal my-3">Descriptions</h3>
          <p>{product?.description}</p>

          <h3 className="text-[30px] font-normal my-3">Product Details</h3>
          <ul>
            {product?.ingredients
              .split(",")
              .map((ingredient, index) => (
                <li key={index}>{ingredient.trim()}</li>
              ))}
          </ul>
        </div>
      </div>
      <div className="my-5 space-y-10 font-poppins text-black">
        <h2 className="text-[40px] font-normal text-center">
          You might also like
        </h2>
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
    </div>
  );
};

export default ProductDetail;
