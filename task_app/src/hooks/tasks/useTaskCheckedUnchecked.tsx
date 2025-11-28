import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { getTaskSlice, updateTask } from "../../redux/slices/Tasks";
import { Task } from "../../types/Task";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const useTaskCheckedUnchecked = (task: Task) => {

  const appDispatch = useAppDispatch();
  const taskSlice = useSelector(getTaskSlice);

  const lineWidth = useSharedValue(0);

  const taskChckedUnChecked = useCallback(() => {
    const updatedTask: Task = {
      ...task, ...{
        completed: !task.completed
      }
    }
    console.log("tttt", task)
    appDispatch(updateTask(updatedTask));
  }, [taskSlice])

  const lineStyle = useAnimatedStyle(() => {
    return {
      width: `${lineWidth.value}%`
    };
  });

  useEffect(() => {
    if (task.completed) {
      lineWidth.value = withTiming(100, { duration: 200 });
    } else {
      lineWidth.value = withTiming(0, { duration: 200 });
    }
  }, [task])

  return {
    lineStyle,
    taskChckedUnChecked
  }
}

export default useTaskCheckedUnchecked;