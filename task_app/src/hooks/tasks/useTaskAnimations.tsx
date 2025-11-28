import { useCallback, useEffect } from "react";
import { Task } from "../../types/Task";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import { Dimension } from "../../constants/dimentions";
import { Alert } from "react-native";
import { scheduleOnRN } from "react-native-worklets";
import useTaskManager from "./useTaskManager";

const useTaskAnimations = (task: Task) => {

  const SWIPE_THRESHOLD = Dimension.windowWidth * 0.2;
  const spawningDelay = 400;
  const lineWidth = useSharedValue(0);
  const slideValue = useSharedValue(0);
  const bottomValue = useSharedValue(-50);

  const { removeTask } = useTaskManager("", task);

  const lineStyle = useAnimatedStyle(() => {
    return {
      width: `${lineWidth.value}%`
    };
  });

  const slideAnim = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: slideValue.value,
        },
      ],
    }),
    [],
  );

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

  useEffect(() => {
    if (task.completed) {
      lineWidth.value = withTiming(100, { duration: 200 });
    } else {
      lineWidth.value = withTiming(0, { duration: 200 });
    }
  }, [task])

  const showRemoveAlert = useCallback(() => Alert.alert("Remove", "Do you want to remove this task?", [
    {
      text: "Cancel",
    },
    {
      text: "Remove",
      onPress: () => {
        removeTask()
      }
    }
  ]), [])

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onStart(e => { })
    .onUpdate(event => {
      const pX = event.translationX;
      if (pX < 0 && pX >= -SWIPE_THRESHOLD) {
        slideValue.value = withTiming(pX, {
          duration: 1,
        });
      }
    })
    .onTouchesUp(() => { })
    .onEnd(() => {
      if (slideValue.value < (-SWIPE_THRESHOLD * 0.7)) {
        scheduleOnRN(showRemoveAlert)
      }
      slideValue.value = withTiming(0);
    });

  return {
    lineStyle,
    panGesture,
    slideAnim,
    spawningStyle,
    spawningDelay
  }
}

export default useTaskAnimations;