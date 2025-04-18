import React from "react";

const QuantityButton = ({
  value = 1,
  onChange,
  min = 1,
  max = 100, // Có thể giới hạn số lượng tối đa (nếu cần)
}: {
  value?: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
}) => {
  const handleChange = (newQuantity: number) => {
    if (newQuantity >= min && newQuantity <= max) {
      onChange(newQuantity); // Trả về giá trị mới cho component cha
    }
  };

  return (
    <div className="bg-gray-200 px-4 py-2 rounded-xl flex gap-3 w-fit">
      <button
        type="button"
        className="text-xl"
        onClick={() => handleChange(value - 1)}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-10 text-center bg-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        className="text-xl"
        onClick={() => handleChange(value + 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
