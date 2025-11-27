import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TasksSlice } from '../../types/TasksSlice'
import { Task } from '../../types/Task'
import { RootState } from '../store'

const initialState: TasksSlice = {
  tasks: [],
  currentEdit: undefined
}

export const taskSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload]
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks.filter(task => task.id != action.payload.id), action.payload]
    },
    removeTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter(task => task.id != action.payload.id)
    },
    setCurrentEdit: (state, action: PayloadAction<Task | undefined>) => {
      state.currentEdit = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { addTask, updateTask, removeTask, setCurrentEdit } = taskSlice.actions
export const getTaskSlice = (root: RootState) => root.taskSlice;

export default taskSlice.reducer