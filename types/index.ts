import { ImageSourcePropType } from "react-native";
import { SharedValue } from "react-native-reanimated";

export type AnimatedGaragePickerProps = {
  ref: React.RefObject<any>;
  selectedCar: CarType;
  pickerWidth: SharedValue<number>;
  progressSelection: SharedValue<number>;
  progressArrow: SharedValue<number>;
  onSelectCar: (car: CarType) => void;
  revertPicker: () => void;
  externalOpenPicker: () => void;
};

export type GaragePickerMethods = {
  openPicker: () => void;
  onDismissPicker: () => void;
};

export type CarType = {
  image: ImageSourcePropType;
  name: string;
  miles: string;
};
