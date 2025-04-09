/* eslint-disable @next/next/no-img-element */
"use client";

import { htcService } from "@/utils/services/htcService";
import { useCartStore } from "@/utils/store/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface MenuProps {
  id: number;
  imagePath: string;
  name: string;
  des: string;
  price: number;
}

const Menu: React.FC<MenuProps> = ({ imagePath, name, des, price, id }) => {
  const route = useRouter();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({
      ice: "100%",
      id: id,
      image: imagePath,
      name: name,
      price: price,
      quantity: 1,
      size: "M",
      sugar: "100%",
    });
    toast.success("Add to cart successfully!");
  };

  const handleAddToFavourite = async () => {
    try {
      const response = await htcService.api.addProductToFavorite(id);
      if (response.status == 204) {
        toast.success("Add to favourite successfully!");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Add to favourite failed!");
    }
  };

  const buttonData = [
    {
      label: "Yêu thích",
      paths: [
        "M12 20.25C12 20.25 2.625 15 2.625 8.62501C2.625 7.49803 3.01546 6.40585 3.72996 5.53431C4.44445 4.66277 5.43884 4.0657 6.54393 3.84468C7.64903 3.62366 8.79657 3.79235 9.79131 4.32204C10.7861 4.85174 11.5665 5.70972 12 6.75001C12.4335 5.70972 13.2139 4.85174 14.2087 4.32204C15.2034 3.79235 16.351 3.62366 17.4561 3.84468C18.5612 4.0657 19.5555 4.66277 20.27 5.53431C20.9845 6.40585 21.375 7.49803 21.375 8.62501C21.375 15 12 20.25 12 20.25Z",
      ],
      onClick: () => handleAddToFavourite(),
    },
    {
      label: "Thêm vào giỏ hàng",
      paths: [
        "M8 20.25C8 20.6642 7.66421 21 7.25 21C6.83579 21 6.5 20.6642 6.5 20.25C6.5 19.8358 6.83579 19.5 7.25 19.5C7.66421 19.5 8 19.8358 8 20.25Z",
        "M17 20.25C17 20.6642 16.6642 21 16.25 21C15.8358 21 15.5 20.6642 15.5 20.25C15.5 19.8358 15.8358 19.5 16.25 19.5C16.6642 19.5 17 19.8358 17 20.25Z",
        "M3.96562 6.75H20.7844L18.3094 15.4125C18.2211 15.7269 18.032 16.0036 17.7711 16.2C17.5103 16.3965 17.1922 16.5019 16.8656 16.5H7.88437C7.55783 16.5019 7.2397 16.3965 6.97886 16.2C6.71803 16.0036 6.52893 15.7269 6.44062 15.4125L3.04688 3.54375C3.00203 3.38696 2.9073 3.24905 2.77704 3.15093C2.64677 3.05282 2.48808 2.99983 2.325 3H0.75",
      ],
      onClick: () => handleAddToCart(),
    },
    {
      label: "Xem chi tiết",
      paths: [
        "M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z",
        "M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z",
      ],
      onClick: () => route.push(`/menu/product-detail/${id}`),
    },
  ];
  return (
    <div className="w-[300px] border-[2px] rounded-lg border-[#DBDFD0] overflow-hidden flex flex-col items-center group">
      <div className="relative bg-[#F4F4F4] rounded-xl transition-transform duration-300">
        <img
          src={imagePath}
          alt=""
          className="transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {buttonData.map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#AD343E] group/button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                {btn.paths.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover/button:stroke-white"
                  />
                ))}
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center font-sans max-w-60 py-7 gap-4">
        <span className="font-bold text-[#AD343E] text-2xl ">$ {price}</span>
        <span className="font-bold text-xl text-[#2C2F24]">{name}</span>
        <span className="font-normal text-base text-center text-[#2C2F24]">
          {des}
        </span>
      </div>
    </div>
  );
};

export default Menu;
