/* eslint-disable @next/next/no-img-element */
"use client";

interface ProductProps {
  imagePath: string;
  name: string;
  category: string;
  price: string;
}

const Product: React.FC<ProductProps> = ({
  imagePath,
  name,
  category,
  price,
}) => {
  return (
    <div className="flex flex-col gap-2 font-poppins group">
      <div className="relative overflow-hidden bg-[#F4F4F4] rounded-xl py-4 transition-transform duration-300">
        <img
          src={imagePath}
          alt=""
          className="object-contain w-[240px] h-[240px] transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[
            [
              "M12 20.25C12 20.25 2.625 15 2.625 8.62501C2.625 7.49803 3.01546 6.40585 3.72996 5.53431C4.44445 4.66277 5.43884 4.0657 6.54393 3.84468C7.64903 3.62366 8.79657 3.79235 9.79131 4.32204C10.7861 4.85174 11.5665 5.70972 12 6.75001C12.4335 5.70972 13.2139 4.85174 14.2087 4.32204C15.2034 3.79235 16.351 3.62366 17.4561 3.84468C18.5612 4.0657 19.5555 4.66277 20.27 5.53431C20.9845 6.40585 21.375 7.49803 21.375 8.62501C21.375 15 12 20.25 12 20.25Z",
            ],
            [
              "M8 20.25C8 20.6642 7.66421 21 7.25 21C6.83579 21 6.5 20.6642 6.5 20.25C6.5 19.8358 6.83579 19.5 7.25 19.5C7.66421 19.5 8 19.8358 8 20.25Z",
              "M17 20.25C17 20.6642 16.6642 21 16.25 21C15.8358 21 15.5 20.6642 15.5 20.25C15.5 19.8358 15.8358 19.5 16.25 19.5C16.6642 19.5 17 19.8358 17 20.25Z",
              "M3.96562 6.75H20.7844L18.3094 15.4125C18.2211 15.7269 18.032 16.0036 17.7711 16.2C17.5103 16.3965 17.1922 16.5019 16.8656 16.5H7.88437C7.55783 16.5019 7.2397 16.3965 6.97886 16.2C6.71803 16.0036 6.52893 15.7269 6.44062 15.4125L3.04688 3.54375C3.00203 3.38696 2.9073 3.24905 2.77704 3.15093C2.64677 3.05282 2.48808 2.99983 2.325 3H0.75",
            ],
            [
              "M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z",
              "M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z",
            ],
          ].map((paths, index) => (
            <button
              key={index}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FA8232] group/button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                {paths.map((d, i) => (
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
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{name}</span>
          <span className="font-medium text-xs">Category: {category}</span>
        </div>
        <div className="px-4 mb-4 rounded-3xl border-[1px] flex items-center">
          <span className="text-[13px]">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
