import { CarType } from "@/types";

export const moveToFront = (arr: CarType[], selectedCar: CarType) => {
  const selectedItem = arr.find((item) => item.name === selectedCar.name);
  if (!selectedItem) return arr; // if item not found, return original

  return [
    selectedItem,
    ...arr.filter((item) => item.name !== selectedCar.name),
  ];
};
