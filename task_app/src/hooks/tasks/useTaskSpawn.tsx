import { useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const useTaskSpawn = () => {
  const spawningDelay = 400;
  const bottomValue = useSharedValue(-50);

  const spawningStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: bottomValue.value
        }
      ]
    };
  });

  useEffect(() => {
    bottomValue.value = withTiming(0, { duration: spawningDelay });
  }, [])

  return {
    spawningDelay,
    spawningStyle
  }
}

export default useTaskSpawn;