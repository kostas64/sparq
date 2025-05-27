import { Dimensions, Platform } from "react-native";

export const isIOS = Platform.OS === "ios";
export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("screen").height;

// Accessibility
export const GENERIC_MAX_MULTIPLIER = isIOS ? 1.7 : 1.3;
export const MEDIUM_MAX_MULTIPLIER = isIOS ? 1.5 : 1.2;
export const SMALL_MAX_MULTIPLIER = isIOS ? 1.3 : 1.1;
export const XS_MAX_MULTIPLIER = isIOS ? 1.15 : 1.05;

// Picker Example
export const VISIBLE_CARS = 5;
export const CAR_HEIGHT = 75;
export const HEADER_HEIGHT = 42;

export const CARS = [
  {
    image: require("../assets/images/cars/image_11.png"),
    name: "Mercedes GLS",
    miles: "30.429 miles",
  },
  {
    image: require("../assets/images/cars/image_6.png"),
    name: "Lamborghini Aventador",
    miles: "3.283 miles",
  },
  {
    image: require("../assets/images/cars/image_7.png"),
    name: "Golf GTI Performance",
    miles: "72.313 miles",
  },
  {
    image: require("../assets/images/cars/image_3.png"),
    name: "Nissan Frontier",
    miles: "7.278 miles",
  },
  {
    image: require("../assets/images/cars/image_2.png"),
    name: "Honda Accorrd",
    miles: "23 miles",
  },
  {
    image: require("../assets/images/cars/image_1.png"),
    name: "Dodge Chrysler",
    miles: "23 miles",
  },
  {
    image: require("../assets/images/cars/image_13.png"),
    name: "Ford Explorer",
    miles: "23 miles",
  },
  {
    image: require("../assets/images/cars/image_5.png"),
    name: "Mustang GT",
    miles: "23 miles",
  },
];

export const EXTRA_PICKER_CARS = [
  {
    image: require("../assets/images/cars/image_5.png"),
    name: "Mustang GT",
    miles: "23 miles",
  },
  {
    image: require("../assets/images/cars/image_5.png"),
    name: "Mustang GT",
    miles: "23 miles",
  },
  {
    image: require("../assets/images/cars/image_5.png"),
    name: "Mustang GT",
    miles: "23 miles",
  },
  {
    image: require("../assets/images/cars/image_5.png"),
    name: "Mustang GT",
    miles: "23 miles",
  },
  {
    image: require("../assets/images/cars/image_5.png"),
    name: "Mustang GT",
    miles: "23 miles",
  },
  {
    image: require("../assets/images/cars/image_5.png"),
    name: "Mustang GT",
    miles: "23 miles",
  },
];

// Spring Config
export const SPRING_ANIM_CONFIG = {
  damping: 20,
  stiffness: 90,
  mass: 1,
};

// Slice To Add
export const SLIDER_W = WIDTH - 52;
export const SLIDER_FINAL_W = 76;
export const SLIDER_H = 76;

// Shared Transition Layout
export const CAR_W = 368;
export const CAR_H = 138;

// Notifications
export const NOTIFICATION_INTERVAL = 1500;
export const NOTIFICATION_HEIGHT = 59;

export const NOTIFICATIONS = [
  {
    id: 1,
    title: "Driver License Reminder",
    description: "Your license is expiring in 30 days",
  },
  {
    id: 2,
    title: "New Receipt Added",
    description: "Checkout the details",
  },
  {
    id: 3,
    title: "Fuel level low",
    description: "Fill up some gas",
  },
  {
    id: 4,
    title: "Engine Oil Low",
    description: "Your engine oil is low",
  },
  {
    id: 5,
    title: "Air Filter Replaced",
    description: "Your air filter is replaced",
  },
  {
    id: 6,
    title: "Tire Pressure Low",
    description: "Your tire pressure is low",
  },
];
