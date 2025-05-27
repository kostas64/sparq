import React from "react";
import Text from "../ui/Text";

const AddVehicleCarName = () => {
  return (
    <>
      <Text className="self-center mt-6 font-medium text-3xl">Mazda</Text>
      <Text
        allowFontScaling={false}
        className="self-center mt-3 font-heavy text-5xl opacity-40"
      >
        CX-5 Crossover
      </Text>
    </>
  );
};

export default AddVehicleCarName;
