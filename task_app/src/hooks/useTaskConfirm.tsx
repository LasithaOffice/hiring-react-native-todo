import { useCallback } from "react"
import { Alert } from "react-native";
import { Task } from "../types/Task";
import { addTask, getTaskSlice, removeTask, setCurrentEdit, updateTask } from "../redux/slices/Tasks";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";


const useTaskConfirm = (text: string) => {

  const appDispatch = useAppDispatch();
  const taskSlice = useSelector(getTaskSlice);

  return useCallback(() => {
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
        appDispatch(removeTask(taskSlice.currentEdit))
      }
    }
    appDispatch(setCurrentEdit(undefined))
  }, [text, taskSlice])
}

export default useTaskConfirm;