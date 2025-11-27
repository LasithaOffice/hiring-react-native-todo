import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useMemo, useState } from 'react'
import Header from '../../components/ui/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import CheckItem from '../../components/ui';
import { Task } from '../../types/Task';
import FloatingButton from '../../components/ui/FloatingButton';

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
    list: {
      marginTop: 16,
    }
  }), [insets])

  const [tasks, setTasks] = useState<Task[]>([])

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        style={styles.list}
        data={tasks}
        renderItem={
          ({ index, item }) => <CheckItem key={item.id} text={item.name} />
        }
      />
      <FloatingButton />
    </View>
  )
}

export default Main