import { Dimensions } from "react-native";

const dWidth = Dimensions.get('window').width;
const dHeight = Dimensions.get('window').height;

const sWidth = Dimensions.get('screen').width;
const sHeight = Dimensions.get('screen').height;

export const Dimension = {
  windowWidth: dWidth,
  windowHeight: dHeight,
  screenWidth: sWidth,
  screenHeight: sHeight,
};