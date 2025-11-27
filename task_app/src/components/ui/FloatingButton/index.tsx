import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import Plus from '../../../assets/images/svgs/Plus.svg'
import { COLORS } from '../../../constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const FloatingButton = () => {

  const insets = useSafeAreaInsets();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      borderRadius: 100,
      width: 48,
      height: 48,
      backgroundColor: COLORS.PRIMARY,
      justifyContent: 'center',
      alignItems: 'center',
      right: 16,
      position: 'absolute',
      bottom: insets.bottom + 20
    }
  }), [insets])

  return (
    <TouchableOpacity style={styles.container}>
      <Plus color={'white'} width={40} height={40} />
    </TouchableOpacity>
  )
}

export default FloatingButton