import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Tasked from '../../../assets/images/svgs/Tasked.svg'

const Header = () => {
  return (
    <View style={styles.container}>
      <Tasked />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 27
  },
})