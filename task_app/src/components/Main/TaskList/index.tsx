import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { Task } from '../../../types/Task'
import CheckItem from '../../ui/CheckItem'
import Typography from '../../ui/Typography'
import { useSelector } from 'react-redux'
import { getTaskSlice } from '../../../redux/slices/Tasks'


const TaskList = () => {

  const tasks = useSelector(getTaskSlice).tasks;
  const currentEdit = useSelector(getTaskSlice).currentEdit;

  const styles = useMemo(() => StyleSheet.create({
    list: {
      marginTop: 20,
    }
  }), [])

  const sortedTasks = useMemo(() => [...tasks].sort((t1, t2) => t2.id - t1.id), [tasks])
  const Row = useCallback(({ index, item }: { index: number, item: Task }) => <CheckItem key={item.id} data={item} />, [currentEdit])

  return (
    <>
      {
        (tasks.length == 0) ?
          <Typography text='Create your first task...' color='DISABLED_TEXT' marginLeft={24} marginTop={16} />
          :
          <></>
      }
      <FlatList
        style={styles.list}
        data={sortedTasks}
        renderItem={Row}
      />
    </>
  )
}

export default TaskList