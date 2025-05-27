import { ImageSourcePropType, StyleProp, TextStyle } from "react-native";
import {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  LayoutAnimationFunction,
  SharedValue,
} from "react-native-reanimated";
import { ReanimatedKeyframe } from "react-native-reanimated/lib/typescript/layoutReanimation/animationBuilder/Keyframe";

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

export type AnimatedTypingProps = {
  text: string[];
  textStyle?: StyleProp<TextStyle>;
  cursorStyle?: StyleProp<TextStyle>;
  cursorInterval?: number;
  onComplete?: () => void;
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

export type NotificationListItemType = {
  id: number;
  title: string;
  description: string;
};

export type EnteringExitingAnimationType =
  | BaseAnimationBuilder
  | typeof BaseAnimationBuilder
  | EntryExitAnimationFunction
  | ReanimatedKeyframe;

export type LayoutAnimationType =
  | BaseAnimationBuilder
  | typeof BaseAnimationBuilder
  | LayoutAnimationFunction
  | undefined;
