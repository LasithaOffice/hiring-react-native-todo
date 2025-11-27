import { useCallback } from "react"
import { Alert } from "react-native";
import { Task } from "../types/Task";
import { addTask, getTaskSlice, setCurrentEdit } from "../redux/slices/Tasks";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";


const useTaskCreater = () => {

  const appDispatch = useAppDispatch();

  return useCallback(() => {
    const id: number = new Date().getTime()
    const task: Task = {
      id: id,
      name: "",
      completed: false
    };
    appDispatch(setCurrentEdit(task))
    appDispatch(addTask(task))
  }, [])
}

export default useTaskCreater;