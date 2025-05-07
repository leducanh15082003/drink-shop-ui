/* eslint-disable @next/next/no-img-element */
"use client";

import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import ProductOptions from "../components/ProductOptions";
import Menu from "@/components/Menu";
import { htcService } from "@/utils/services/htcService";
import { formatCurrency } from "@/utils/format/formatCurrency";

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
  const [youMightLike, setYouMightLike] = useState<ProductDTO[]>([]);

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

      const fetchTopSold = async () => {
        try {
          const res = await htcService.api.getTopSoldProducts();
          setYouMightLike(res.data as ProductDTO[]);
        } catch (e) {
          console.error("Error fetching top sold products:", e);
        }
      };
      fetchTopSold();
    }
  }, [productId]);

  return (
    <div className="bg-white p-12">
      <Breadcrumb
        separator=">"
        items={[
          { title: "Menu", href: "/menu" },
          { title: product?.name || "Product Name" },
        ]}
      />

      <div className="mx-16 my-5 space-y-10 font-poppins text-black">
        {/* Top */}
        <div className="flex gap-16 justify-between ">
          {/* Product Image */}
          <div className="flex w-2/3 gap-3">
            <img
              className="w-full rounded-xl"
              src={product?.image}
              alt={product?.name}
            />
          </div>

          {/* Product Action */}
          <div className="w-1/3">
            <p className="font-semibold text-[32px]">{product?.name}</p>
            <p className="font-normal text-[16px] px-2 border-l-[1px] border-[#CFD1C9]">
              {/* You can display sold count if available */}
            </p>
            <div className="flex items-center gap-6">
              <p className="font-semibold text-[32px]">
                {formatCurrency(product?.price || 0)}
              </p>
              <p className="font-normal text-[16px] text-[#B6B6B6] line-through">
                {product?.price ? formatCurrency(product.price * 1.2) : ""}
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
              .map((ing, idx) => <li key={idx}>{ing.trim()}</li>)}
          </ul>
        </div>
      </div>

      <div className="my-5 space-y-10 font-poppins text-black">
        <h2 className="text-[40px] font-normal text-center">
          You might also like
        </h2>
        <div className="flex flex-wrap gap-6 justify-center items-center">
          {youMightLike.map((item) => (
            <Menu
              key={item.id}
              id={item.id}
              imagePath={item.image}
              name={item.name}
              des={item.description}
              price={item.price}
              category={item.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
