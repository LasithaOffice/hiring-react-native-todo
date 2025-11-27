import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useMemo, useState } from 'react'
import Header from '../../components/ui/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import CheckItem from '../../components/ui/CheckItem';
import { Task } from '../../types/Task';
import FloatingButton from '../../components/ui/FloatingButton';
import TaskList from '../../components/Main/TaskList';
import useTaskCreater from '../../hooks/useTaskCreater';

//This is more like a main component rather than a screen.
const Main = () => {

  const insets = useSafeAreaInsets();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top + 40,
      paddingBottom: insets.bottom,
      backgroundColor: COLORS.WHITE
    },
  }), [insets])

  const traksCreater = useTaskCreater()

  return (
    <View style={styles.container}>
      <Header />
      <TaskList />
      <FloatingButton onPress={traksCreater} />
    </View>
  )
}

export default Main