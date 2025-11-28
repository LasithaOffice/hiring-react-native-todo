import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { Task } from '../../../types/Task'
import CheckItem from '../../ui/CheckItem'
import Typography from '../../ui/Typography'
import { useSelector } from 'react-redux'
import { getTaskSlice } from '../../../redux/slices/Tasks'


const TaskList = () => {

  const taskSlice = useSelector(getTaskSlice);

  const styles = useMemo(() => StyleSheet.create({
    list: {
      marginTop: 20,
    }
  }), [])

  const sortedTasks = useMemo(() => [...taskSlice.tasks].sort((t1, t2) => t2.id - t1.id), [taskSlice])
  const Row = useCallback(({ index, item }: { index: number, item: Task }) => <CheckItem key={item.id} data={item} />, [])

  return (
    <>
      {
        (taskSlice.tasks.length == 0) ?
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