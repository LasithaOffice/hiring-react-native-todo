import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/ui/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';

//This is more like a main component rather than a screen.
const Main = () => {

  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top + 40,
      paddingBottom: insets.bottom,
      backgroundColor: COLORS.WHITE
    }
  })

  return (
    <View style={styles.container}>
      <Header />
    </View>
  )
}

export default Main