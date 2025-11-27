import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { Task } from '../../../types/Task'
import CheckItem from '../../ui/CheckItem'
import Typography from '../../ui/Typography'
import { useSelector } from 'react-redux'
import { getTaskSlice } from '../../../redux/slices/Tasks'


const TaskList = () => {

  const taskSlice = useSelector(getTaskSlice);

  const styles = useMemo(() => StyleSheet.create({
    list: {
      marginTop: 16,
    }
  }), [])

  const sortedTasks = useMemo(() => [...taskSlice.tasks].sort((t1, t2) => t2.id - t1.id), [taskSlice])

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
        renderItem={
          ({ index, item }) => <CheckItem key={item.id} data={item} />
        }
      />
    </>
  )
}

export default TaskList