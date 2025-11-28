import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { addTasksList, getTaskSlice } from "../../redux/slices/Tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../redux/store";
import { LocalTasks } from "../../types/LocalTasks";

const useLocalStorage = () => {

  const tasks = useSelector(getTaskSlice).tasks;
  const appDispatch = useAppDispatch();

  const fetchedTasks = useRef(false);
  useEffect(() => {
    AsyncStorage.getItem("tasks").then(jsonTasks => {
      console.log("aaa", jsonTasks)
      if (jsonTasks) {
        const localTasks: LocalTasks = JSON.parse(jsonTasks);
        appDispatch(addTasksList(localTasks.tasks))
      }
      fetchedTasks.current = true;
    });
  }, [])

  useEffect(() => {
    if (fetchedTasks.current) {
      const localTasks: LocalTasks = {
        tasks: tasks
      }
      const jsonTasks = JSON.stringify(localTasks);
      AsyncStorage.setItem("tasks", jsonTasks);
    }
  }, [tasks])
}

export default useLocalStorage;