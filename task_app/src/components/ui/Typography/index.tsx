import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { COLORS } from '../../../constants/colors'
import { FONT_REGULAR, FONT_SIZE_REGULAR, FONT_SIZE_TITLE, FONT_TITLE } from '../../../constants/fonts'

type Props = {
  color?: keyof typeof COLORS,
  text: string,
  marginTop?: number,
  marginLeft?: number,
}

const Typography = ({ color = 'TEXT', marginTop = 0, marginLeft = 0, ...p }: Props) => {

  const style = useMemo(() => StyleSheet.create({
    text: {
      fontFamily: FONT_REGULAR,
      fontSize: FONT_SIZE_REGULAR,
      color: COLORS[color],
      marginTop,
      marginLeft
      // fontWeight: (p.isTitle) ? '700' : '400'
    }
  }), [p])

  return (
    <Text style={style.text}>{p.text}</Text>
  )
}



export default Typography