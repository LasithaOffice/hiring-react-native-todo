import { useCallback, useEffect } from "react"
import { Alert, Keyboard } from "react-native";
import { Task } from "../../types/Task";
import { addTask, getTaskSlice, removeTask as removeTask_, setCurrentEdit, updateTask } from "../../redux/slices/Tasks";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


const useTaskManager = (text: string, task?: Task) => {

  const appDispatch = useAppDispatch();
  const taskSlice = useSelector(getTaskSlice);

  const initTask = useCallback(() => {
    if (taskSlice.currentEdit) {
      appDispatch(removeTask_(taskSlice.currentEdit))
      appDispatch(setCurrentEdit(undefined))
    } else {
      const id: number = new Date().getTime()
      const task: Task = {
        id: id,
        name: "",
        completed: false
      };
      appDispatch(setCurrentEdit(task))
      appDispatch(addTask(task))
    }
  }, [taskSlice])

  const initUpdateTask = useCallback(() => {
    appDispatch(setCurrentEdit(task))
  }, [taskSlice])

  const confirmTask = useCallback(() => {
    console.log(taskSlice, text)
    if (!taskSlice.currentEdit) return;
    if (text) {
      appDispatch(updateTask({
        id: taskSlice.currentEdit.id,
        name: text,
        completed: false
      }))
    } else {
      if (!taskSlice.currentEdit.name) {
        appDispatch(removeTask_(taskSlice.currentEdit))
      }
    }
    appDispatch(setCurrentEdit(undefined))
  }, [text, taskSlice])

  const removeTask = useCallback(() => {
    console.log(taskSlice, text)
    if (task) {
      appDispatch(removeTask_(task))
    }
  }, [text, taskSlice])

  const taskCheckedUnChecked = useCallback(() => {
    if (task) {
      const updatedTask: Task = {
        ...task, ...{
          completed: !task.completed
        }
      }
      console.log("tttt", task)
      appDispatch(updateTask(updatedTask));
    }
  }, [task])

  return {
    initTask,
    initUpdateTask,
    removeTask,
    confirmTask,
    taskCheckedUnChecked
  }
}

export default useTaskManager;