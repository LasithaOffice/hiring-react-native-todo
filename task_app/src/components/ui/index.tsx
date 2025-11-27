import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/colors'
import Typography from './Typography'

type Props = {
  text: string
}

const CheckItem = (p: Props) => {
  return (
    <View style={
      {
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignContent: 'center',
      }
    }>
      <View style={
        {
          width: 24,
          height: 24,
          borderRadius: 6,
          marginRight: 16,
          backgroundColor: COLORS.SECONDARY
        }
      }></View>
      <Typography text={p.text} />
    </View>
  )
}

export default CheckItem