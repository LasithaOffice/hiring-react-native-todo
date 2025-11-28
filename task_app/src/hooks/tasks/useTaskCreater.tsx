import { useCallback } from "react"
import { Alert, Keyboard } from "react-native";
import { Task } from "../../types/Task";
import { addTask, getTaskSlice, removeTask, setCurrentEdit } from "../../redux/slices/Tasks";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";


const useTaskCreater = () => {

  const appDispatch = useAppDispatch();
  const taskSlice = useSelector(getTaskSlice);

  return useCallback(() => {
    if (taskSlice.currentEdit) {
      appDispatch(removeTask(taskSlice.currentEdit))
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
}

export default useTaskCreater;